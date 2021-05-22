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
import {useHistory} from 'react-router-dom'
// 
import { createBrand } from '../../actions/brandsActions';
import Placeholder from '../../img/BG.svg';
import validator from 'validator'
import { setAlert } from '../../actions/alertsAction'



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
  


const AddBrand = ({createBrand ,setAlert }) => {
    
    const [formData,setFormData] = useState({
        brand_name : '',
        subcategories : []
    })
    const [imgUri,setImg] = useState({img : Placeholder})
    const [buffer,setBuffer] = useState(null)
    const [subcategories,setSubCategories] = useState(null);
    const classes = useStyles();
    const history = useHistory()


    // GET ALL SubCategories
    useEffect(() => {
        axios.get(`/v1/subcategories`, {
            params: {
               getImage: false
            }
         })
            .then((res) => {
                if (res.data) {
                    setSubCategories(res.data);
                }
            })
            .catch((err) => console.error('SubCategories: ',err))

    }, [])


    const onChange = (e) => setFormData({...formData, [e.target.name] : e.target.value});

    const addSubcategorie = (e) => {
        const id  = e.target.value
        const sub = subcategories.find((val) => val.subcategorie_id === e.target.value);
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
        if(file.size < 2000000){

            const reader = new FileReader();
            reader.addEventListener("load", function () {
                // convert image file to base64 string
                if(reader.readyState === 2){
                    setImg({img : reader.result});
                    setBuffer(file);
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
            if(buffer){
                // Update the formData object 
                fileData.append( 
                    "image", 
                    buffer, 
                );
                createBrand(formData,fileData).then((res) => {
                    if(res === 200){
                        return history.push('/brands')
                    }
                    else{
                        return setAlert('Error!', 'error');
                    }
                });
            }
            else{
                setAlert('Brend suraty giriziň!', 'error');
            }
        }   
    }

    const validateInputs = () => {
        if(validator.isEmpty(formData.brand_name)){
            setAlert('Brend ady giriziň!', 'error');
            return false
        }
        return true
    }

    return (
        <section className="add-product-section container">
            <Typography variant="h4" component="h2">
               Brend Goşuň
            </Typography>
            <div className="form-block"> 
                <form className={classes.root} noValidate autoComplete="off" onSubmit={(e) => onSubmit(e)}>
                    {/* Brand Name */}
                    <TextField 
                        className={classes.input}
                        id="outlined-basic" 
                        label="Brend Ady" 
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
                                    formData.subcategories.length > 0 &&
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
                                    ))
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
                            src={imgUri.img}
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
                        Brend döret
                    </Button>
                </form>
            </div>
        </section>
    )
}

AddBrand.propTypes = {
    createBrand: PropTypes.func.isRequired,
    setAlert: PropTypes.func.isRequired,
}

export default connect(null, {
    createBrand,
    setAlert
  })(AddBrand);
    
