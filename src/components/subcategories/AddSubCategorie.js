import React, { useState} from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { InputLabel } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
// 
// import { createCategorie } from '../../actions/categoriesAction';
import Placeholder from '../../img/BG.svg';


const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            marginRight : '0',
            marginLeft : '0',
        },
    },
    input : {
        width : '100%'
    },
    inputNumber : {
        width : '30%'
    },
    grid : {
        display : 'flex'
    },
    image : {
        width : '100px',
        height : '100px'
      },
}));

const AddSubCategorie = () => {
    
    const [formData,setFormData] = useState({
        categorie_name : '',
    })
    const [imgUri,setImg] = useState({img : Placeholder})
    const [buffer,setBuffer] = useState(null)
    const classes = useStyles();
    const history = useHistory();

    const onChange = (e) => {
        setFormData({...formData, [e.target.name] : e.target.value})
        console.log(formData)

    }

    const onFileUpload = (e) => {
        const file = e.target.files[0] 
        setBuffer(file);

        const reader = new FileReader();
        reader.addEventListener("load", function () {
            // convert image file to base64 string
            if(reader.readyState === 2){
                setImg({img : reader.result})
            }
        }, false);

        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const onSubmit = (e) => {
        e.preventDefault();
        const fileData = new FormData(); 
     
        // Update the formData object 
        fileData.append( 
            "image", 
            buffer, 
        ); 
        // createCategorie(formData.categorie_name,fileData);
        return history.push('/categories')
    }

    return (
        <section className="add-product-section container">
            <Typography variant="h4" component="h2">
               Add SubCategorie
            </Typography>
            <div className="form-block"> 
                <form className={classes.root} noValidate autoComplete="off" onSubmit={(e) => onSubmit(e)}>
                    {/* Categorie Name */}
                    <TextField 
                        className={classes.input}
                        id="outlined-basic" 
                        label="Categorie Name" 
                        variant="outlined"
                        value={formData.categorie_name}
                        required
                        name="categorie_name"
                        onChange={(e) => onChange(e)}
                        /><br />
                    {/*  */}
                    <div className={classes.grid}>
                        <Avatar 
                            className={classes.image}
                            src={imgUri.img}
                            variant="square" 
                            />
                        <div style={{paddingLeft : '10px', width : '100%'}}>
                            <InputLabel children={`Categorie Image`} />
                            <br />
                            <TextField className={classes.inputNumber} id="outlined-basic" type="file" variant="outlined" 
                                onChange={(e) => onFileUpload(e)}
                            /><br />
                        </div>
                    </div>
                    <Button variant="contained" color="primary" type='submit'>
                        Craete Categorie
                    </Button>
                </form>
            </div>
        </section>
    )
}

// AddSubCategorie.propTypes = {
//     createCategorie: PropTypes.func.isRequired,
// }

export default AddSubCategorie
    
