import React, { useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { InputLabel } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import MenuItem from '@material-ui/core/MenuItem';
import axios from 'axios'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
// 
import { editBrand, getCurrentBrand } from '../../actions/brandsActions';
import Placeholder from '../../img/BG.svg';
import Spinner from '../layouts/Spinner';
import validator from 'validator';
import apiPath from '../../utils/apiPath'
import { setAlert } from '../../actions/alertsAction';



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
    table: {
    minWidth: 650,
    },
}));
  


const EditBrand = ({
    editBrand,
    getCurrentBrand,
    brands : {current_brand, loading},
    match,
    setAlert
}) => {
    
    const [formData,setFormData] = useState({
        brand_name : '',
        subcategories : []
    })
    const [image,setImage] = useState(Placeholder);
    const [buffer,setBuffer] = useState(null)
    const [subcategories,setSubCategories] = useState(null);
    const classes = useStyles();



    useEffect(() => {
        getCurrentBrand(match.params.id);
        window.scrollTo(0, 0);
    },[match.params.id,getCurrentBrand])


    useEffect(() => {
        if(current_brand !== null){
            setFormData(current_brand);
            if(current_brand.brand_image){
                let img  = current_brand.brand_image;
                setImage(`${apiPath()}/${img}`)
            }
        }
    }, [current_brand])

    useEffect(() => {
        if(current_brand){
            // Get all subcategories
            axios.get(`/v1/subcategories`)
                .then((res) => {
                    if (res.data) {
                        if(formData.subcategories){
                            let subs = res.data;
                            formData.subcategories.forEach((sub) => {
                                let newArr = subs.filter((val) => val.subcategorie_id !== sub.subcategorie_id)
                                subs = newArr
                            })
                            setSubCategories(subs)
                        }
                        else{
                            setFormData({...formData,subcategories : []})
                        }
                    }
                })
                .catch((err) => console.error('SubCategories: ',err))
        }
        
    }, [current_brand,formData])

    const onChange = (e) => setFormData({...formData, [e.target.name] : e.target.value});

    const addSubcategorie = (e) => {
        const id  = e.target.value
        refactorSubcategorie(id)
    }

    const refactorSubcategorie = (id) => {
        const sub = subcategories.find((val) => val.subcategorie_id === id);
        const name = sub.subcategorie_name_tm;
        setFormData({...formData, subcategories : [...formData.subcategories, {subcategorie_id : id, subcategorie_name_tm : name} ]} )
        const arr = subcategories.filter((val) => val.subcategorie_id !== id);
        setSubCategories(arr)
    }

    const deleteSubCategorie = (id) => {
        let newArr = formData.subcategories.filter((val) => val.subcategorie_id !== id);
        let deletedObject = formData.subcategories.find((val) => val.subcategorie_id === id);
        setSubCategories([...subcategories, deletedObject ])
        setFormData({...formData, subcategories : newArr})  
    }

    const onFileUpload = (e) => {
        const file = e.target.files[0] 
        if(file.size < 1800000){
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
        }
        else{
            alert('2MB dan kan bolan surat yuklap bolmayar')
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
            editBrand(formData,fileData);
        }   
    }

    const validateInputs = () => {
        if(validator.isEmpty(formData.brand_name)){
            setAlert('Brand Name Girizin', 'error');
            return false
        }
        return true
    }

    return (
        <>
            {loading && current_brand === null  ? <Spinner /> : 

            <section className="add-product-section container">
            <Typography variant="h4" component="h2">
                Brendi Üýtget - {formData.brand_name && formData.brand_name}
            </Typography>
            <div className="form-block"> 
                <form className={classes.root} noValidate autoComplete="off" onSubmit={(e) => onSubmit(e)}>
                    {/* Brand Name */}
                    <TextField 
                        className={classes.input}
                        id="outlined-basic" 
                        label="Brand Ady" 
                        variant="outlined"
                        value={formData.brand_name}
                        required
                        name="brand_name"
                        onChange={(e) => onChange(e)}
                        /><br />
                        {/* SubCategories */}
                        <TableContainer component={Paper}>
                            <Table className={classes.table} size="small" aria-label="a dense table">
                                <TableHead>
                                <TableRow>
                                    <TableCell style={{color: 'grey'}}>Subkategoriýalar</TableCell>
                                    <TableCell align="right"></TableCell>
                                </TableRow>
                                </TableHead>
                                <TableBody>
                                {
                                    formData.subcategories
                                    ? 
                                    formData.subcategories.map((row) => (
                                        <TableRow key={row.subcategorie_id}>
                                        <TableCell component="th" scope="row">
                                            {row.subcategorie_name_tm}
                                        </TableCell>
                                        <TableCell align="right">
                                            <Button
                                                onClick={() => deleteSubCategorie(row.subcategorie_id)}
                                                color="secondary"
                                                href="#delete"
                                                >
                                                <DeleteOutlineIcon />
                                            </Button>
                                            </TableCell>
                                        </TableRow>
                                    )) : ''
                                }
                                </TableBody>
                            </Table>
                            </TableContainer>
                            {/* Add Subcategorie */}
                        <InputLabel children={`Subkategoriýa goşuň`} />
                        <TextField
                            className={classes.input}
                            id="outlined-select-currency"
                            select
                            label="Kategoriýa ady"
                            value={''}
                            onChange={(e) => addSubcategorie(e)}
                            variant="outlined"
                            name="categorie_id"
                        >
                            {
                                subcategories && subcategories.length > 0 ?
                                subcategories.map((option,index) => (
                                    <MenuItem key={index} value={option.subcategorie_id}>
                                    {option.subcategorie_name_tm}
                                    </MenuItem>
                                )) : 'Başga subkategoriýa ýok'
                            }
                        </TextField>
                    {/* Add Image */}
                    <div className={classes.grid}>
                        <Avatar 
                            className={classes.image}
                            src={image}
                            variant="square" 
                            />
                        <div style={{paddingLeft : '10px', width : '100%'}}>
                            <InputLabel children={`Brend suraty`} />
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

EditBrand.propTypes = {
    editBrand: PropTypes.func.isRequired,
    getCurrentBrand : PropTypes.func.isRequired,
    setAlert : PropTypes.func.isRequired,
    brands : PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
    brands : state.brands
})


export default connect(mapStateToProps, {
    editBrand,
    getCurrentBrand,
    setAlert
  })(EditBrand);
    
