import React, { useState} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
// 
import { createStore } from '../../actions/storesAction';
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
  


const AddStore = ({createStore, setAlert}) => {
    
   const [formData,setFormData] = useState({
      store_name : '',
      store_number : '',
      store_phone : '',
      store_description : '',
      store_floor : '',
      store_currency : '',
   })
   const classes = useStyles();

   const onChange = (e) => setFormData({...formData, [e.target.name] : e.target.value});

   const onSubmit = (e) => {
      e.preventDefault();
      const validated = validateInputs();
      
      if (validated) {
         createStore(formData);
      }
   }
   const validateInputs = () => {
      if (validator.isEmpty(formData.store_name)) {
         setAlert('Magazin ady giriziň!', 'error');
         return false
      }
      if (validator.isEmpty(formData.store_number)) {
         setAlert('Magazin belgisi giriziň!', 'error');
         return false
      }
      if (validator.isEmpty(formData.store_phone)) {
         setAlert('Magazin telefon nomeri giriziň!', 'error');
         return false
      }
      if (validator.isEmpty(formData.store_floor)) {
         setAlert('Magazin gaty giriziň!', 'error');
         return false
      }
      return true
   }

   return (
      <section className="add-product-section container">
         <Typography variant="h4" component="h2">
            Magazin goşuň
         </Typography>
         <div className="form-block"> 
               <form className={classes.root} noValidate autoComplete="off" onSubmit={(e) => onSubmit(e)}>
                  {/* Store Name */}
                  <TextField 
                     className={classes.input}
                     id="outlined-basic" 
                     label="Magazin Ady" 
                     variant="outlined"
                     value={formData.store_name}
                     required
                     name="store_name"
                     onChange={(e) => onChange(e)}
                     /><br />
                  {/* Store Number */}
                  <TextField 
                     className={classes.input}
                     id="outlined-basic" 
                     label="Magazin belgisi" 
                     variant="outlined"
                     value={formData.store_number}
                     required
                     type="number"
                     name="store_number"
                     onChange={(e) => onChange(e)}
                     /><br />
                  {/* Store Phone Number */}
                  <TextField 
                     className={classes.input}
                     id="outlined-basic" 
                     label="Magazin el telefony" 
                     variant="outlined"
                     value={formData.store_phone}
                     required
                     type = "number"
                     name="store_phone"
                     onChange={(e) => onChange(e)}
                     /><br />
                  {/* Store Floor(etazh) */}
                  <TextField 
                     className={classes.input}
                     id="outlined-basic" 
                     label="Magazin gaty (etaž)" 
                     variant="outlined"
                     type = "number"
                     value={formData.store_floor}
                     required
                     name="store_floor"
                     onChange={(e) => onChange(e)}
                     /><br />
                  {/* Store Currency */}
                  <TextField 
                     className={classes.input}
                     id="outlined-basic" 
                     label="Magazin pul birligi" 
                     variant="outlined"
                     value={formData.store_currency}
                     name="store_currency"
                     onChange={(e) => onChange(e)}
                     /><br />
                  {/* Store Description */}
                  <TextField 
                     className={classes.input}
                     id="outlined-basic" 
                     label="Magazin maglumaty" 
                     variant="outlined"
                     value={formData.store_description}
                     name="store_description"
                     onChange={(e) => onChange(e)}
                     /><br />
                     
                  <Button variant="contained" color="primary" type='submit'>
                     Magazin döret
                  </Button>
               </form>
         </div>
      </section>
   )
}

AddStore.propTypes = {
    createStore: PropTypes.func.isRequired,
    setAlert: PropTypes.func.isRequired,
}

export default connect(null, {
    createStore,
    setAlert
  })(AddStore);
    
