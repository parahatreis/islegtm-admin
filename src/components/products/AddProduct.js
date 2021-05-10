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
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
// 
import Placeholder from '../../img/BG.svg'
import { createProduct } from '../../actions/productsAction';
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
}));


const AddProduct = ({ createProduct , setAlert}) => {

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
   const [hasSize, setHasSize] = useState(false);
   const [sizeTypes, setSizeTypes] = useState(null);
   const [chosenSizeType, setSizeType] = useState('');
   const [stockWithoutSizes, setStockWithoutSizes] = useState({
      stock_quantity : ''
   })
   const [stocks, setStock] = useState([])
   const [formData,setFormData] = useState({
      product_code : '',
      product_name_tm : '',
      product_name_ru : '',
      product_name_en : '',
      price_tmt : '',
      price_usd : '',
      old_price_tmt: '',
      old_price_usd: '',
      subcategorie_id : '',
      brand_id : '',
      store_id : '',
      description_tm : '',
      description_en : '',
      description_ru : ''
   });

   const onChange = (e) => {
      setFormData({...formData, [e.target.name] : e.target.value})
   };

   const onChangeCurrency = (e) => {
      formData.price_tmt = ''
      formData.price_usd = ''
      setCurrency(e.target.value)
   }


   // Get all subcategories
   useEffect(() => {
      axios.get(`/v1/subcategories`)
         .then((res) => {
            if (res.data) {
               setSubcategories(res.data);
            }
         })
         .catch((err) => console.error('SubCategories: ', err))
   }, []);

   // GET ALL SizeTypes
   useEffect(() => {
      axios.get(`/v1/size_types`)
         .then((res) => {
            if (res.data) {
               setSizeTypes(res.data);
            }
         })
         .catch((err) => console.error('SizeTypes: ', err))
   }, []);

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
                  let data = res.data;
                  data.push({
                     store_id : '',
                     store_name : 'Dont have Store'
                  })
                  setStore(data);
               }
         })
         .catch((err) => console.error('Stores : ',err))

   }, []);

   const changeHasSizeType = () => {
      if (hasSize === false) {
         setHasSize(true);
         setStockWithoutSizes({
            stock_quantity: ''
         })
      }
      else {
         setHasSize(false);
         setStock([])
         setSizeType('')
         setFormData({
            ...formData,
            size_type_id: ''
         })
      }
   };

   const handleSelectSizeType = (id) => {
      setSizeType(id);
      setStock([])
      const size_type = sizeTypes.filter((type) => type.size_type_id === id);
      const size_names = size_type[0].size_names;
      const newStocks = size_names.map((name) => {
         return {
            size_name: name.size_name,
            size_name_id: name.size_name_id,
            size_type_id: id,
            stock_quantity: ''
         }
      });
      setStock(newStocks)
   }

   const handleSetStock = (id, qnt) => {
      let newStock = stocks.map((stock) => {
         if (stock.size_name_id === id) {
            return {
               ...stock,
               stock_quantity: qnt
            }
            };
         return stock
      });
      setStock(newStock)
   }

   const onFileUpload = (e,id) => {
      const newfile = e.target.files[0] 
      if(newfile.size < 2000000){
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
                  setBuffers([...buffers,{
                     id : id,
                     buffer : newfile
                  }]);
                  setImage(newArr);
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
      let formDataStocks = [];

      const validated = validateInputs();

      if(validated){
         if (buffers.length > 0) {
            
            if (hasSize) {
               if (chosenSizeType === '') {
                  return setAlert('Haryt ölçeg saýlaň!', 'error');
               }
               const notEmptyStocks = stocks.filter((stock) => stock.stock_quantity !== '');
               if (notEmptyStocks.length === 0) return setAlert('Haryt ölçeg stogy saýlaň!', 'error');
               formDataStocks = notEmptyStocks;
            } else {
               if (stockWithoutSizes.stock_quantity === '') {
                  return setAlert('Haryt stok giriziň!', 'error');
               }
               formDataStocks.push(stockWithoutSizes);
            }

            const fileData = new FormData(); 
            // Update the formData object
            buffers.forEach((obj) => {
               fileData.append( 
                  "images", 
                  obj.buffer, 
               ); 
            })

            formData.stocks = formDataStocks;
            createProduct(formData,fileData);
         }
         else{
            setAlert('Haryt suraty giriziň!', 'error');
         }
      }  
   }

   const validateInputs = () => {
      if (validator.isEmpty(formData.product_code)) {
         setAlert('Haryt kody giriziň!', 'error');
         return false
      }
      if(validator.isEmpty(formData.product_name_tm) || validator.isEmpty(formData.product_name_ru) || validator.isEmpty(formData.product_name_en)){
         setAlert('Haryt ady giriziň!', 'error');
         return false
      }
      if (validator.isEmpty(String(formData.price_tmt)) && validator.isEmpty(String(formData.price_usd))) {
         setAlert('Harydyn bahasyny giriziň!', 'error');
         return false
      }
      if(validator.isEmpty(formData.subcategorie_id)){
         setAlert('Subkategoriýa saýlaň!', 'error');
         return false
      }
      return true
   }


   return (
      <section className="add-product-section container">
         <Typography variant="h4" component="h2">
            Haryt goşuň
         </Typography>
         <br />
         <div className="form-block"> 
            <form className={classes.root} noValidate autoComplete="off" onSubmit={(e) => onSubmit(e)}>
               {/* Product Code */}
               <TextField 
                  className={classes.input} 
                  id="outlined-basic" 
                  label="Haryt Kody" 
                  variant="outlined"
                  name="product_code"
                  value={formData.product_code}
                  onChange={(e) => onChange(e)}
               /><br />
               {/* Product Name (TURKMENÇE) */}
               <TextField 
                  className={classes.input} 
                  id="outlined-basic" 
                  label="Haryt ady (TURKMENÇE)" 
                  variant="outlined"
                  name="product_name_tm"
                  value={formData.product_name_tm}
                  onChange={(e) => onChange(e)}
               /><br />
               {/* Product Name (РУССКИЙ) */}
               <TextField 
                  className={classes.input} 
                  id="outlined-basic" 
                  label="Название продукта (РУССКИЙ)" 
                  variant="outlined"
                  name="product_name_ru"
                  value={formData.product_name_ru}
                  onChange={(e) => onChange(e)}
               /><br />
               {/* Product Name (ENGLISH) */}
               <TextField 
                  className={classes.input} 
                  id="outlined-basic" 
                  label="Product Name (ENGLISH)" 
                  variant="outlined"
                  name="product_name_en"
                  value={formData.product_name_en}
                  onChange={(e) => onChange(e)}
               /><br />
               {/* Currency */}
               <TextField
                  className={classes.input}
                  id="outlined-select-currency"
                  select
                  label="Harydyň bahasynyň pul birligi"
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
                           label="Bahasy(TMT)" 
                           type="number" 
                           name="price_tmt"
                           variant="outlined" 
                           value={formData.price_tmt}
                           onChange={(e) => onChange(e)}
                        />
                        {'  '}
                        {/* Price(TMT) */}
                        <TextField 
                           className={classes.inputNumber} 
                           id="outlined-basic" 
                           label="Öňki Bahasy(TMT)" 
                           type="number" 
                           name="old_price_tmt"
                           variant="outlined" 
                           value={formData.old_price_tmt}
                           onChange={(e) => onChange(e)}
                        />
                  </Fragment>
                  :
                  <Fragment>
                        {/* Price(USD) */}
                        <TextField 
                           className={classes.inputNumber} 
                           id="outlined-basic" 
                           label="Bahasy(USD)" 
                           type="number" 
                           variant="outlined"
                           name="price_usd"
                           onChange={(e) => onChange(e)}
                           value={formData.price_usd}
                        />
                        {'  '}

                        <TextField 
                           className={classes.inputNumber} 
                           id="outlined-basic" 
                           label="Öňki Bahasy(USD)" 
                           type="number" 
                           variant="outlined"
                           name="old_price_usd"
                           onChange={(e) => onChange(e)}
                           value={formData.old_price_usd}
                        />
                  </Fragment>
               }
               
               &nbsp; &nbsp;  
               
               {/* Brand */}
               <TextField
                  className={classes.input}
                  id="outlined-select-currency"
                  select
                  label="Brend"
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
                  label="Subkategoriýa"
                  name="subcategorie_id"
                  value={formData.subcategorie_id}
                  onChange={(e) => onChange(e)}
                  variant="outlined"
                  >
                  {
                        subcategories &&
                        subcategories.map((option) => (
                           <MenuItem key={option.subcategorie_id} value={option.subcategorie_id}>
                              {option.subcategorie_name_tm}
                           </MenuItem>
                        ))
                  }
                  </TextField>
               {/* Store */}
               <TextField
                  className={classes.input}
                  id="outlined-select-currency"
                  select
                  label="Magazin"
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
               {/* Description */}
               <TextField
                  className={classes.input}
                  placeholder="MultiLine with rows: 2 and rowsMax: 4"
                  id="outlined-select-currency"
                  label="Haryt maglumaty"
                  name="description_tm"
                  variant="outlined"
                  value={formData.description_tm}
                  onChange={(e) => onChange(e)}
                  multiline
                  rows={2}
                  rowsMax={10}
               />
               {/* Description */}
               <TextField
                  className={classes.input}
                  placeholder="MultiLine with rows: 2 and rowsMax: 4"
                  id="outlined-select-currency"
                  label="Описание продукта"
                  name="description_ru"
                  variant="outlined"
                  value={formData.description_ru}
                  onChange={(e) => onChange(e)}
                  multiline
                  rows={2}
                  rowsMax={10}
               />
               {/* Description */}
               <TextField
                  className={classes.input}
                  placeholder="MultiLine with rows: 2 and rowsMax: 4"
                  id="outlined-select-currency"
                  label="Product description"
                  name="description_en"
                  variant="outlined"
                  value={formData.description_en}
                  onChange={(e) => onChange(e)}
                  multiline
                  rows={2}
                  rowsMax={10}
               />
               {/* Stock */}
               {
                  !hasSize &&
                  <div style={{ width: '100%',display : 'flex'}}>
                     {/* Stok sany */}
                     <TextField 
                        style={{width : '40%'}} 
                        id="outlined-basic" 
                        label={`Stock sany`} 
                        variant="outlined"
                        name="stock"
                        type='number'
                        value={stockWithoutSizes.stock_quantity}
                        onChange={(e) => {
                           const qnt = e.target.value
                           setStockWithoutSizes({
                              stock_quantity : qnt
                           })
                        }}
                     /><br />
                  </div>
               }
               {/* Has Size  */}
               <FormControlLabel
                  control={<Checkbox color="primary" value={hasSize} checked={hasSize} onChange={(e) => changeHasSizeType()} name="hasSize" />}
                  label="Beden ölçegi barmy"
               />
               {
                  hasSize &&
                  <TextField
                        className={classes.input}
                        id="outlined-select-currency"
                        select
                        label="Ölçeg görnüşi"
                        value={chosenSizeType}
                        onChange={(e) => handleSelectSizeType(e.target.value)}
                        variant="outlined"
                        name="size_type_id"
                  >
                        {sizeTypes.map((option) => (
                           <MenuItem key={option.value} value={option.size_type_id}>
                           {option.size_type}
                           </MenuItem>
                        ))}
                  </TextField>
               }
               <br />
               {
                  stocks &&
                  stocks.map((stock) => (
                     <div style={{ width: '100%',display : 'flex'}}>
                        {/* Stok sany */}
                        <TextField 
                           style={{width : '40%'}} 
                           id="outlined-basic" 
                           label={`Stock sany - ${stock.size_name}`} 
                           variant="outlined"
                           name="sotck"
                           type='number'
                           value={stock.stock_quantity}
                           onChange={(e) => handleSetStock(stock.size_name_id, e.target.value)}
                        /><br />
                     </div>
                  ))
               }
               
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
                                    <InputLabel children={`Haryt suraty ${index+1} `} />
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
                  Haryt döret
               </Button>
            </form>
         </div>
      </section>
   )
}


AddProduct.propTypes = {
    createProduct: PropTypes.func.isRequired,
    setAlert: PropTypes.func.isRequired,
}

export default connect(null, {
    createProduct,
    setAlert
  })(AddProduct);
