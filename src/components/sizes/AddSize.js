import React, { useState} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { InputLabel } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
// 
import { createSize } from '../../actions/sizesAction';
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
  


const AddSize = ({createSize, setAlert}) => {
    
   const [formData,setFormData] = useState({
      size_type : ''
   });
   const [sizeNames, setSizeNames] = useState(
      [{
         id : 1,
         size_name : ''
      }]
   )
   const classes = useStyles();

   const onChange = (e) => setFormData({...formData, [e.target.name] : e.target.value});


   const changeSizeName = (e,id) => {
      const newArr = sizeNames.map((name) => {
         if(name.id === id){
               return name = {
                  id : name.id,
                  size_name : e.target.value
               }
         }
         else{
               return name
         }
      })
      setSizeNames(newArr)
   };

   const addSizeNameInput = () => {
      setSizeNames([...sizeNames, {
         id : sizeNames[sizeNames.length - 1].id + 1,
         size_name : ''
      }]);
   }

   const removeSizeNameInput = (id) => {
      setSizeNames(sizeNames.filter(val => val.id !== id))
   }

   const onSubmit = (e) => {
      e.preventDefault();
      
      const validated = validateInputs();

      if (validated) {
         formData.size_names = sizeNames.filter(name => name.size_name !== '');
         createSize(formData);
      }

      
   }

   const validateInputs = () => {
   if (validator.isEmpty(formData.size_type)) {
      setAlert('Ölçeg görnüşi goşuň!', 'error');
      return false
   }
   if (validator.isEmpty(sizeNames[0].size_name)) {
      setAlert('Ölçeg ady goşuň!', 'error');
      return false
   }
   return true
   }

   return (
      <section className="add-product-section container">
         <Typography variant="h4" component="h2">
            Ölçeg Görnüşi goş
         </Typography>
         <div className="form-block"> 
               <form className={classes.root} noValidate autoComplete="off" onSubmit={(e) => onSubmit(e)}>
                  {/* Size Type */}
                  <TextField 
                     className={classes.input}
                     id="outlined-basic" 
                     label="Ölçeg Görnüşi" 
                     variant="outlined"
                     value={formData.size_type}
                     required
                     name="size_type"
                     onChange={(e) => onChange(e)}
                     /><br />
                  {/* Size Names */}
                  <InputLabel children={`Ölçeg ady goşuň (mysal:M,L...)`} />
                  {
                     sizeNames.map((val, index) => (
                           <>
                              <div className={classes.grid}>
                                 {/* Size Type */}
                                 <TextField 
                                       className={classes.input}
                                       id="outlined-basic" 
                                       label={`Ölçeg ady ${index + 1}`} 
                                       variant="outlined"
                                       value={val.size_name}
                                       name="size_name"
                                       onChange={(e) => changeSizeName(e,val.id)}
                                 />
                                 {
                                       sizeNames.length === 1 ? '' : 
                                       <IconButton aria-label="delete" className={classes.margin} onClick={(e) => removeSizeNameInput(val.id) }>
                                          <DeleteIcon fontSize="small" />
                                       </IconButton>
                                 }
                              </div>
                              <br />
                           </>
                     ))
                  }

                  <Button variant="outlined" color="default"
                     onClick={() => addSizeNameInput()}
                  >
                     <AddCircleOutlineIcon />
                  </Button>
                  <br />
                  <Button variant="contained" color="primary" type='submit'>
                     Ölçeg Görnüşi döret
                  </Button>
               </form>
         </div>
      </section>
   )
}

AddSize.propTypes = {
    createSize: PropTypes.func.isRequired,
    setAlert: PropTypes.func.isRequired,
}

export default connect(null, {
   createSize,
   setAlert
  })(AddSize);
    
