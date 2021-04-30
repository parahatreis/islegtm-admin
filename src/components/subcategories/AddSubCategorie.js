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
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import axios from 'axios'
// 
import { createSubCategorie } from '../../actions/subcategoriesAction';
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
}));


const AddSubCategorie = ({createSubCategorie, setAlert}) => {
    
   const [formData,setFormData] = useState({
      subcategorie_name_tm : '',
      subcategorie_name_ru : '',
      subcategorie_name_en : '',
      categorie_id : '',
      size_type_id : '',
   })
   const [imgUri,setImg] = useState({img : Placeholder})
   const [buffer,setBuffer] = useState(null)
   const [categories,setCategories] = useState(null);
   const [sizeTypes, setSizeTypes] = useState(null);
   const [hasSize, setHasSize] = useState(false)
   const classes = useStyles();


   // GET ALL Categories
   useEffect(() => {
      axios.get(`/v1/categories`, {
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

   }, []);

   // GET ALL SizeTypes
   useEffect(() => {
      axios.get(`/v1/size_types`)
         .then((res) => {
               if (res.data) {
                  setSizeTypes(res.data);
               }
         })
         .catch((err) => console.error('SizeTypes: ',err))
   }, []);


   const onChange = (e) => setFormData({...formData, [e.target.name] : e.target.value});


   // const changeCheckbox = (e) => setFormData({...formData, [e.target.name] : e.target.checked})

   const changeHasSizeType = () => {
      if(hasSize === false) setHasSize(true)
      else{
         setHasSize(false)
         setFormData({
               ...formData,
               size_type_id : ''
         })
      }
   };

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
      
      const validated = validateInputs();

      if (validated) {
         if (buffer) {
            // Update the formData object 
            fileData.append(
               "image",
               buffer,
            );
            createSubCategorie(formData, fileData);
         } else {
            setAlert('Subkategoriýa suraty ýükläň!', 'error');
         }
      }
   }

   const validateInputs = () => {
      if (validator.isEmpty(formData.subcategorie_name_tm) || validator.isEmpty(formData.subcategorie_name_ru) || validator.isEmpty(formData.subcategorie_name_en)) {
         setAlert('Subkategoriýa ady girizin!', 'error');
         return false
      }
      if (validator.isEmpty(formData.categorie_id)) {
         setAlert('Kategoriýa ady saýlaň!', 'error');
         return false
      }
      return true
   }

   return (
      <section className="add-product-section container">
         <Typography variant="h4" component="h2">
            Subkategoriýa goşuň
         </Typography>
         <div className="form-block"> 
               <form className={classes.root} noValidate autoComplete="off" onSubmit={(e) => onSubmit(e)}>
                  {/* SubCategorie Name (TURKMENÇE) */}
                  <TextField 
                     className={classes.input}
                     id="outlined-basic" 
                     label="Subkategoriýa ady (TURKMENÇE)" 
                     variant="outlined"
                     value={formData.subcategorie_name_tm}
                     required
                     name="subcategorie_name_tm"
                     onChange={(e) => onChange(e)}
                     /><br />
                  {/* SubCategorie Name (РУССКИЙ) */}
                  <TextField 
                     className={classes.input}
                     id="outlined-basic" 
                     label = "Название подкатегории (РУССКИЙ)" 
                     variant="outlined"
                     value={formData.subcategorie_name_ru}
                     required
                     name="subcategorie_name_ru"
                     onChange={(e) => onChange(e)}
                     /><br />
                  {/* SubCategorie Name (ENGLISH) */}
                  <TextField 
                     className={classes.input}
                     id="outlined-basic" 
                     label="SubCategorie Name (ENGLISH)" 
                     variant="outlined"
                     value={formData.subcategorie_name_en}
                     required
                     name="subcategorie_name_en"
                     onChange={(e) => onChange(e)}
                     /><br />
                  {/* Categorie Name */}
                  <TextField
                     className={classes.input}
                     id="outlined-select-currency"
                     select
                     label="Kategoriýa ady"
                     value={formData.categorie_id}
                     onChange={(e) => onChange(e)}
                     variant="outlined"
                     name="categorie_id"
                     required
                  >
                     {
                           categories && 
                           categories.map((option,index) => (
                              <MenuItem key={index} value={option.categorie_id}>
                              {option.categorie_name_tm}
                              </MenuItem>
                           ))
                     }
                  </TextField>
                  {/* Has Color */}
                  {/* <FormControlLabel
                     control={<Checkbox color="primary" value={formData.hasColor} checked={formData.hasColor} onChange={(e) => changeCheckbox(e)} name="hasColor" />}
                     label="Renk filteri"
                  /><br /> */}
                  {/* Has Size  */}
                  <FormControlLabel
                     control={<Checkbox color="primary" value={hasSize} checked={hasSize} onChange={(e) => changeHasSizeType()} name="hasSize" />}
                     label="Beden ölçegi barmy"
                  />
                  {/* Size Type */}
                  {
                     hasSize &&
                     <TextField
                           className={classes.input}
                           id="outlined-select-currency"
                           select
                           label="Ölçeg görnüşi"
                           value={formData.size_type_id}
                           onChange={(e) => onChange(e)}
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
                  {/* Add Image */}
                  <div className={classes.grid}>
                     <Avatar 
                           className={classes.image}
                           src={imgUri.img}
                           variant="square" 
                           />
                     <div style={{paddingLeft : '10px', width : '100%'}}>
                           <InputLabel children={`Subkategoriýa suraty`} />
                           <br />
                           <TextField className={classes.inputNumber} id="outlined-basic" type="file" variant="outlined" 
                              onChange={(e) => onFileUpload(e)}
                           /><br />
                     </div>
                  </div>
                  <Button variant="contained" color="primary" type='submit'>
                     Subkategoriýa döret
                  </Button>
               </form>
         </div>
      </section>
   )
}

AddSubCategorie.propTypes = {
    createSubCategorie: PropTypes.func.isRequired,
    setAlert: PropTypes.func.isRequired,
}

export default connect(null, {
   createSubCategorie,
   setAlert
  })(AddSubCategorie);
    
