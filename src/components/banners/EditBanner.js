import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { InputLabel } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import validator from 'validator';
import {useHistory} from 'react-router-dom'
// 
import { editBanner, getCurrentBanner } from '../../actions/bannersAction';
import Placeholder from '../../img/BG.svg';
import { setAlert } from '../../actions/alertsAction'
import apiPath from '../../utils/apiPath'
import Spinner from '../layouts/Spinner';


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
        width : '400px',
        height : '200px'
      },
    table: {
    minWidth: 650,
    },
}));
  


const EditBanner = ({editBanner, getCurrentBanner,match,setAlert,
    banners : {current_banner, loading},
}) => {
    
    const [formData,setFormData] = useState({
        banner_name : '',
        banner_url : ''
    })
    const [image,setImage] = useState(Placeholder);
    const [buffer,setBuffer] = useState(null)
    const classes = useStyles();
    const history = useHistory()

    const onChange = (e) => setFormData({...formData, [e.target.name] : e.target.value});

    useEffect(() => {
        getCurrentBanner(match.params.id);
        window.scrollTo(0, 0);
    },[match.params.id,getCurrentBanner])

    useEffect(() => {
        if(current_banner !== null){
            setFormData(current_banner);
            if(current_banner.banner_image){
                let img  = current_banner.banner_image;
                setImage(`${apiPath()}/${img}`)
            }
        }
    }, [current_banner])

    const onFileUpload = (e) => {
        const file = e.target.files[0] 
        if(file.size < 6000000){

            const reader = new FileReader();
            reader.addEventListener("load", function () {
                // convert image file to base64 string
                if(reader.readyState === 2){
                    setImage(reader.result);
                    setBuffer(file);
                }
            }, false);

            if (file) {
                reader.readAsDataURL(file);
            }       
        }
        else{
            alert('2MB dan kän bolan suraty yüklap bolmayar!')
        }
    };

    const onSubmit = (e) => {
        e.preventDefault();
        const fileData = new FormData();

        const validated = validateInputs();

        if(validated){
            // Update the formData object 
            fileData.append( 
                "image", 
                buffer, 
            );
            editBanner(formData,fileData).then((res) => {
                if(res === 200){
                    return history.push('/banners')
                }
                else{
                    return setAlert('Error!', 'error');
                }
            });
        }
    }

    const validateInputs = () => {
        if(validator.isEmpty(formData.banner_name)){
            setAlert('Banner ady giriziň!', 'error');
            return false
        }
        if(!validator.isURL(formData.banner_url) || validator.isEmpty(formData.banner_url)){
            setAlert('Banner URL giriziň!', 'error');
            return false
        }
        return true
    }

    

    return (
        <>
            {loading ? <Spinner /> : 
                <section className="add-product-section container">
                <Typography variant="h4" component="h2">
                   Banneri Täzele
                </Typography>
                <div className="form-block"> 
                    <form className={classes.root} noValidate autoComplete="off" onSubmit={(e) => onSubmit(e)}>
                        {/* Banner Name */}
                        <TextField 
                            className={classes.input}
                            id="outlined-basic" 
                            label="Banner Ady" 
                            variant="outlined"
                            value={formData.banner_name}
                            required
                            name="banner_name"
                            onChange={(e) => onChange(e)}
                            /><br />
                        {/* Banner URL */}
                        <TextField 
                            className={classes.input}
                            id="outlined-basic" 
                            label="Banner URL" 
                            variant="outlined"
                            value={formData.banner_url}
                            required
                            name="banner_url"
                            onChange={(e) => onChange(e)}
                            /><br />
                        {/* Add Image */}
                        <div className={classes.grid}>
                            <Avatar 
                                className={classes.image}
                                src={image}
                                variant="square"
                                />
                            <div style={{paddingLeft : '10px', width : '100%'}}>
                                <InputLabel children={`Banner Image`} />
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
            }
        </>
    )
}

EditBanner.propTypes = {
    editBanner: PropTypes.func.isRequired,
    setAlert: PropTypes.func.isRequired,
    getCurrentBanner: PropTypes.func.isRequired,
    banners : PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
    banners : state.banners
})

export default connect(mapStateToProps, {
    editBanner,
    getCurrentBanner,
    setAlert
  })(EditBanner);
    
