import React, { useState} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { InputLabel } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
// 
import { createCategorie } from '../../actions/categoriesAction';
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

const AddCategorie = ({createCategorie}) => {
    
    const [formData,setFormData] = useState({
        categorie_name_tm : '',
        categorie_name_ru : '',
        categorie_name_en: '',
    })
    const [imgUri,setImg] = useState({img : Placeholder})
    const [buffer,setBuffer] = useState(null)
    const classes = useStyles();

    const onChange = (e) => setFormData({...formData, [e.target.name] : e.target.value})
    

    const onFileUpload = (e) => {
        const file = e.target.files[0];
        if(file.size < 1800000){
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
        }
        else{
            alert('2MB dan kan bolan surat yuklap bolmayar')
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
        createCategorie(formData,fileData);
    }

    return (
        <section className="add-product-section container">
            <Typography variant="h4" component="h2">
               Add Categorie
            </Typography>
            <div className="form-block"> 
                <form className={classes.root} noValidate autoComplete="off" onSubmit={(e) => onSubmit(e)}>
                    {/* Categorie Name (TURKMENÇE) */}
                    <TextField 
                        className={classes.input}
                        id="outlined-basic" 
                        label="Categorie Name (TURKMENÇE)" 
                        variant="outlined"
                        value={formData.categorie_name_tm}
                        required
                        name="categorie_name_tm"
                        onChange={(e) => onChange(e)}
                        /><br />
                    {/* Categorie Name */}
                    <TextField 
                        className={classes.input}
                        id="outlined-basic" 
                        label="Categorie Name (РУССКИЙ)" 
                        variant="outlined"
                        value={formData.categorie_name_ru}
                        required
                        name="categorie_name_ru"
                        onChange={(e) => onChange(e)}
                        /><br />
                    {/* Categorie Name */}
                    <TextField 
                        className={classes.input}
                        id="outlined-basic" 
                        label="Categorie Name (ENGLISH)" 
                        variant="outlined"
                        value={formData.categorie_name_en}
                        required
                        name="categorie_name_en"
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

AddCategorie.propTypes = {
    createCategorie: PropTypes.func.isRequired,
}

export default connect(null, {
      createCategorie
    })(AddCategorie);
    
