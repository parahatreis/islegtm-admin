import React, { useState,useEffect, Fragment} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { InputLabel } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
// 
import { editCategorie,getCurrentCategorie } from '../../actions/categoriesAction';
import Spinner from '../layouts/Spinner'
import Placeholder from '../../img/BG.svg';
import apiPath from '../../utils/apiPath'


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

const EditCategorie = ({editCategorie, getCurrentCategorie, match, categories :  {current_categorie, loading} }) => {
    
    const [formData,setFormData] = useState({
        categorie_name_tm : '',
        categorie_name_ru : '',
        categorie_name_en: '',
    })
    const [buffer,setBuffer] = useState(null)
    const [image,setImage] = useState(Placeholder);

    const classes = useStyles();
    

    useEffect(() => {

        getCurrentCategorie(match.params.id);
        window.scrollTo(0, 0);

    }, [getCurrentCategorie,match.params.id]);

    useEffect(() => {
        setFormData(current_categorie)
        if(current_categorie.categorie_image){
            let img  = current_categorie.categorie_image;
            setImage(`${apiPath()}/${img}`)
        }
    }, [current_categorie])

    const onChange = (e) => setFormData({...formData, [e.target.name] : e.target.value})

    const onFileUpload = (e) => {
        const file = e.target.files[0] 
        setBuffer(file);

        const reader = new FileReader();
        reader.addEventListener("load", function () {
            // convert image file to base64 string
            if(reader.readyState === 2){
                setImage(reader.result)
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
        editCategorie(formData,fileData);
    }

    return (
        <Fragment>
            {
            loading ? <Spinner /> : (
                <section className="add-product-section container">
                    <Typography variant="h4" component="h2">
                        Kategoriýa üýtget - {formData.categorie_name_tm && formData.categorie_name_tm}
                    </Typography>
                    <br />
                    <div className="form-block"> 
                        <form className={classes.root} noValidate autoComplete="off" onSubmit={(e) => onSubmit(e)}>
                           {/* Categorie Name (TURKMENÇE) */}
                    <TextField 
                        className={classes.input}
                        id="outlined-basic" 
                        label="Kategoriýa ady (TURKMENÇE)" 
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
                        label="Название категории (РУССКИЙ)" 
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
                                {
                                    // formData.categorie_image ? 
                                        // <Avatar className={classes.image} src={imgPath(formData.categorie_image)} variant="square"/> :
                                        <Avatar className={classes.image} src={image} variant="square"/>
                                }
                                <div style={{paddingLeft : '10px', width : '100%'}}>
                                    <InputLabel children={`Kategoriýa suraty`} />
                                    <br />
                                    <TextField className={classes.inputNumber} id="outlined-basic" type="file" variant="outlined" 
                                        onChange={(e) => onFileUpload(e)}
                                    /><br />
                                </div>
                            </div>
                            <Button variant="contained" color="primary" type='submit'>
                                Ýatda sakla
                            </Button>
                        </form>
                    </div>
                </section>
            )
        }
        </Fragment>
    )
}

EditCategorie.propTypes = {
    editCategorie: PropTypes.func.isRequired,
    getCurrentCategorie: PropTypes.func.isRequired,
    categories : PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    categories: state.categories,
 })

export default connect(mapStateToProps, {
    editCategorie,
    getCurrentCategorie
})(EditCategorie);
    
