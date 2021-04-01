import React, {Fragment, useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import { InputLabel } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Avatar from '@material-ui/core/Avatar';
import axios from 'axios'
import { useHistory } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
// 
import Placeholder from '../../img/BG.svg'
import { editProduct, getCurrentProduct } from '../../actions/productsAction';
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
        width : '100px',
        height : '100px'
    },
}));


const EditProduct = ({editProduct, getCurrentProduct,match, products: {current_product,loading}}) => {

    const classes = useStyles();

    const [brands, setBrands] = useState(null);
    const [images, setImage] = useState([
        {
            id : 1,
            img : Placeholder
        },
    ]);
    const [stores,setStore] = useState(null);
    const [subcategories,setSubcategories] = useState(null);
    const [buffers,setBuffers] = useState([]);
    const [currency, setCurrency] = useState('tmt');
    const [productImages,setProductImages] = useState(null)
    const [formData,setFormData] = useState({
        product_id : '',
        product_name : '',
        price_tmt : '',
        price_usd : '',
        subcategorie_id : '',
        brand_id : '',
        store_id : '',
        description : ''
    });
    const history = useHistory();


    const onChange = (e) => setFormData({...formData, [e.target.name] : e.target.value});

    // Get current product
    useEffect(() => {
        getCurrentProduct(match.params.id)
    }, [getCurrentProduct,match.params.id])

    const onChangeCurrency = (e) => {
        formData.price_tmt = ''
        formData.price_usd = ''
        setCurrency(e.target.value)
    }

    // Set current Product
    useEffect(() => {
        if(current_product){
            console.log(current_product)
            setFormData({
                ...current_product,
                subcategorie_id : current_product.subcategorie.subcategorie_id,
                brand_id : current_product.brand.brand_id,
                store_id : current_product.store.store_id
            })
            if(current_product.price_tmt){  
                setCurrency('tmt')
            }
            else{
                setCurrency('usd')
            }
        }
    }, [current_product]);

    useEffect(() => {
        if(current_product){
            if(current_product.product_images || current_product.product_images.length > 0){
                // console.log(current_product.product_images)
                // let imagesArray = []
                // current_product.product_images.forEach((image,index) => {
                //     imagesArray = [
                //         ...imagesArray,
                //         {
                //             id : index + 1,
                //             img : image
                //         }
                //     ]
                // })
                // console.log(imagesArray);
                // setImage(imagesArray)
                setProductImages(current_product.product_images)
            }
        }
    },[current_product,productImages])


    // Get all subcategories
    useEffect(() => {
        axios.get(`/v1/subcategories`)
            .then((res) => {
                if (res.data) {
                    setSubcategories(res.data);
                }
            })
            .catch((err) => console.error('SubCategories: ',err))

    }, [])

    // Get all brands
    useEffect(() => {
        axios.get(`/v1/brands`)
            .then((res) => {
                if (res.data) {
                    let data = res.data;
                    data.push({
                        brand_id : '',
                        brand_name : 'Dont have brand'
                    })
                    setBrands(data);
                }
            })
            .catch((err) => console.error('SubCategories: ',err))

    }, [])

    // Get all stores
    useEffect(() => {
        axios.get(`/v1/stores`)
            .then((res) => {
                if (res.data) {
                    setStore(res.data);
                }
            })
            .catch((err) => console.error('Stores : ',err))

    }, [])

    const onFileUpload = (e,id) => {
        const newfile = e.target.files[0] 
        if(newfile.size < 1800000){
            setBuffers([...buffers,{
                id : id,
                buffer : newfile
            }]);

            const reader = new FileReader();
            reader.addEventListener("load", function () {
                // convert image file to base64 string
                if(reader.readyState === 2){
                    const newArr = images.map((file) => {
                        if(file.id === id){
                            return file = {
                                id : file.id,
                                img : reader.result
                            }
                        }
                        else{
                            return file
                        }
                    })
                    setImage(newArr)
                }
            }, false);

            if (newfile) {
                reader.readAsDataURL(newfile);
            }       
        }
        else{
            alert('2MB dan kan bolan surat yuklap bolmayar')
        }
    };

    const addFormFile = () => {
        if(images.length < 6) {
            setImage([...images, {
                id : parseInt(images[images.length - 1].id) + 1,
                img : Placeholder
            }])
        }
    }

    const removeFileUpload = (id) => {
        const newArr = images.filter((file) => file.id !== id);
        setImage(newArr);
        // Restore buffers
        const newBuffers = buffers.filter((buffer) => buffer.id !== id);
        setBuffers(newBuffers);
    }

    const onSubmit = (e) => {
        e.preventDefault();
        const fileData = new FormData(); 
     
        // Update the formData object
        buffers.forEach((buffer) => {
            fileData.append( 
                "images", 
                buffer, 
            ); 
        })
        console.log(buffers)
        console.log(formData,fileData)
        // editProduct(formData,fileData);
    }



    return (
        <>
        {loading ? <Spinner /> : 
            <section className="add-product-section container">
            <Typography variant="h4" component="h2">
               Edit Product
            </Typography>
            <div className="form-block"> 
                <form className={classes.root} noValidate autoComplete="off" onSubmit={(e) => onSubmit(e)}>
                    {/* Product Name */}
                    <TextField 
                        className={classes.input} 
                        id="outlined-basic" 
                        label="Product Name" 
                        variant="outlined"
                        name="product_name"
                        value={formData.product_name}
                        onChange={(e) => onChange(e)}
                    /><br />
                    <TextField
                        className={classes.input}
                        id="outlined-select-currency"
                        select
                        label="Select Product Price Currency"
                        name="currency"
                        value={currency}
                        onChange={(e) => onChangeCurrency(e)}
                        variant="outlined"
                        >
                        <MenuItem key={0} value={'tmt'}>
                                TMT (Manat)
                        </MenuItem>
                        <MenuItem key={1} value={'usd'}>
                                USD (Dollar)
                        </MenuItem>
                        </TextField>
                    {
                        currency === 'tmt' ? 
                        <Fragment>
                            {/* Price(TMT) */}
                            <TextField 
                                className={classes.inputNumber} 
                                id="outlined-basic" 
                                label="Price(TMT)" 
                                type="number" 
                                name="price_tmt"
                                variant="outlined" 
                                value={formData.price_tmt}
                                onChange={(e) => onChange(e)}
                            />
                        </Fragment>
                        :
                        <Fragment>
                            {/* Price(USD) */}
                            <TextField 
                                className={classes.inputNumber} 
                                id="outlined-basic" 
                                label="Price(USD)" 
                                type="number" 
                                variant="outlined"
                                name="price_usd"
                                onChange={(e) => onChange(e)}
                                value={formData.price_usd}
                            />
                        </Fragment>
                    }
                    {/* Brand */}
                    <TextField
                        className={classes.input}
                        id="outlined-select-currency"
                        select
                        label="Brand"
                        name="brand_id"
                        value={formData.brand_id}
                        onChange={(e) => onChange(e)}
                        variant="outlined"
                        >
                        {
                            brands && 
                            brands.map((option,index) => (
                                <MenuItem key={index} value={option.brand_id}>
                                {option.brand_name}
                                </MenuItem>
                            ))
                        }
                        </TextField>
                    {/* Subcategorie */}
                    <TextField
                        className={classes.input}
                        id="outlined-select-currency"
                        select
                        label="Subcategorie"
                        name="subcategorie_id"
                        value={formData.subcategorie_id}
                        onChange={(e) => onChange(e)}
                        variant="outlined"
                        >
                        {
                            subcategories &&
                            subcategories.map((option) => (
                                <MenuItem key={option.subcategorie_id} value={option.subcategorie_id}>
                                    {option.subcategorie_name}
                                </MenuItem>
                            ))
                        }
                        </TextField>
                    {/* Store */}
                    <TextField
                        className={classes.input}
                        id="outlined-select-currency"
                        select
                        label="Store"
                        name="store_id"
                        value={formData.store_id}
                        variant="outlined"
                        onChange={(e) => onChange(e)}
                        >
                        {
                            stores && 
                            stores.map((option) => (
                                <MenuItem key={option.store_id} value={option.store_id}>
                                    {option.store_name ? option.store_name +' (No:'+option.store_number+')' : option.store_number }
                                </MenuItem>
                            ))
                        }   
                        </TextField>
                    {/* Brand */}
                    <TextField
                        className={classes.input}
                        placeholder="MultiLine with rows: 2 and rowsMax: 4"
                        id="outlined-select-currency"
                        label="Description"
                        name="description"
                        variant="outlined"
                        value={formData.description}
                        onChange={(e) => onChange(e)}
                        multiline
                        rows={2}
                        rowsMax={10}
                        />
                    <br />
                    <p>Suratlardan biri chalyshylan yagdayynda ahli onki suratlar pozulyandyr!</p>
                    <div className={classes.grid}>
                        {
                            productImages &&
                            productImages.map((image,index) => 
                                (
                                    <Fragment>
                                    <Avatar 
                                        className={classes.image}
                                        src={image}
                                        variant="square" 
                                    />
                                    &nbsp; &nbsp;
                                    </Fragment>
                                )
                            )
                        }
                    </div>
                    {
                        images.map((value,index) => 
                            <Fragment key={index}>
                                {/* Product Image */}
                                <div className={classes.grid}>
                                    <Avatar 
                                        className={classes.image}
                                        src={value.img}
                                        variant="square" 
                                        />
                                    <div style={{paddingLeft : '10px', width : '100%'}}>
                                        <InputLabel children={`Product Image ${index+1} `} />
                                        <br />
                                        <TextField className={classes.inputNumber} id="outlined-basic" type="file" variant="outlined" 
                                            onChange={(e) => onFileUpload(e,value.id)}
                                        />
                                        {
                                            images.length === 1 ? '' : 
                                            <IconButton aria-label="delete" className={classes.margin} onClick={(e) => removeFileUpload(value.id) }>
                                                <DeleteIcon fontSize="small" />
                                            </IconButton>
                                        }
                                        <br />
                                    </div>
                                </div>
                            </Fragment>
                        )
                    }
                    <Button variant="outlined" color="default"
                        onClick={() => addFormFile()}
                        disabled={images.length === 6  ? true : false}
                    >
                        <AddCircleOutlineIcon />
                    </Button>
                    <br />
                    <Button variant="contained" color="primary" type='submit'>
                        Create Product
                    </Button>
                </form>
            </div>
        </section>
        }
        </>
    )
}


EditProduct.propTypes = {
    getCurrentProduct: PropTypes.func.isRequired,
    editProduct: PropTypes.func.isRequired,
    products : PropTypes.object.isRequired,
}


const mapStateToProps = (state) => ({
    products : state.products
})

export default connect(mapStateToProps, {
    getCurrentProduct,
    editProduct
  })(EditProduct);
