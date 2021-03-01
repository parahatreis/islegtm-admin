import React, { useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { InputLabel } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import MenuItem from '@material-ui/core/MenuItem';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import axios from 'axios'
// 
import { createSubCategorie } from '../../actions/subcategoriesAction';
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

const sizeTypes = [
{
    value: 'numeric',
    label: 'Numeric (32,33,34)',
},
{
    value: 'alphabetical',
    label: 'Alphabetical (S,M,L)',
},
];



const AddSubCategorie = ({createSubCategorie}) => {
    
    const [formData,setFormData] = useState({
        subcategorie_name : '',
        categorie_id : '',
        hasSize : false,
        hasColor : false,
        sizeType : '',
    })
    const [imgUri,setImg] = useState({img : Placeholder})
    const [buffer,setBuffer] = useState(null)
    const [categories,setCategories] = useState(null)
    const classes = useStyles();
    const history = useHistory();


    // GET ALL Categories
    useEffect(() => {
        axios.get(`/api/categories`, {
            params: {
               getImage: 0
            }
         })
            .then((res) => {
                if (res.data) {
                    setCategories(res.data);
                }
            })
            .catch((err) => console.error('Categories: ',err))

    }, [])


    const onChange = (e) => setFormData({...formData, [e.target.name] : e.target.value});

    const changeCheckbox = (e) => setFormData({...formData, [e.target.name] : e.target.checked})

    const onFileUpload = (e) => {
        const file = e.target.files[0] 
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
        createSubCategorie(formData,fileData);
        return history.push('/subcategories')
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
                        label="SubCategorie Name" 
                        variant="outlined"
                        value={formData.subcategorie_name}
                        required
                        name="subcategorie_name"
                        onChange={(e) => onChange(e)}
                        /><br />
                        {/* Categorie Name */}
                        <TextField
                            className={classes.input}
                            id="outlined-select-currency"
                            select
                            label="Categorie Name"
                            value={formData.categorie_name}
                            onChange={(e) => onChange(e)}
                            variant="outlined"
                            name="categorie_id"
                        >
                            {
                                categories && 
                                categories.map((option,index) => (
                                    <MenuItem key={index} value={option.categorie_id}>
                                    {option.categorie_name}
                                    </MenuItem>
                                ))
                            }
                        </TextField>
                        {/* Has Color */}
                        <FormControlLabel
                            control={<Checkbox color="primary" value={formData.hasColor} checked={formData.hasColor} onChange={(e) => changeCheckbox(e)} name="hasColor" />}
                            label="Renk filteri"
                        /><br />
                        {/* Has Size  */}
                        <FormControlLabel
                            control={<Checkbox color="primary" value={formData.hasSize} checked={formData.hasSize} onChange={(e) => changeCheckbox(e)} name="hasSize" />}
                            label="Beden olcegi barmy"
                        />
                        {/* Size Type */}
                        {
                            formData.hasSize &&
                            <TextField
                                className={classes.input}
                                id="outlined-select-currency"
                                select
                                label="Size Type"
                                value={formData.sizeType}
                                onChange={(e) => onChange(e)}
                                variant="outlined"
                                name="sizeType"
                            >
                                {sizeTypes.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        }
                    {/* Add Image */}
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
                        Craete SubCategorie
                    </Button>
                </form>
            </div>
        </section>
    )
}

AddSubCategorie.propTypes = {
    createSubCategorie: PropTypes.func.isRequired,
}

export default connect(null, {
    createSubCategorie
  })(AddSubCategorie);
    
