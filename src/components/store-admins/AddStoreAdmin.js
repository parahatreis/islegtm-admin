import React, { useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { InputLabel } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import axios from 'axios'
// 
import { createStoreAdmin } from '../../actions/storeAdminsAction';
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
  


const AddStoreAdmin = ({createStoreAdmin, setAlert}) => {
    
    const [formData,setFormData] = useState({
        store_admin_name : '',
        store_admin_phone : '',
        store_admin_password : '',
        store_admin_username : '',
        storeId : '',
    })
    const classes = useStyles();
    const [stores,setStore] = useState(null);

    const onChange = (e) => setFormData({...formData, [e.target.name] : e.target.value});


    useEffect(() => {
        axios.get(`/v1/stores`)
            .then((res) => {
                if (res.data) {
                    setStore(res.data);
                }
            })
            .catch((err) => console.error('Stores : ',err))

    }, [])


    const onSubmit = (e) => {
       e.preventDefault();
       const validated = validateInputs();

       if (validated) {
          createStoreAdmin(formData);
       }
   }
   
   const validateInputs = () => {
      if (validator.isEmpty(formData.store_admin_name)) {
         setAlert('Magazin Admin ady giriziň!', 'error');
         return false
      }
      if (validator.isEmpty(formData.store_admin_password)) {
         setAlert('Magazin Admin parol giriziň!', 'error');
         return false
      }
      if (validator.isEmpty(formData.store_admin_phone)) {
         setAlert('Magazin Admin telefon nomeri giriziň!', 'error');
         return false
      }
      if (validator.isEmpty(formData.store_admin_username)) {
         setAlert('Magazin Admin ulanyjy ady(username) giriziň!', 'error');
         return false
      }
      if (validator.isEmpty(formData.storeId)) {
         setAlert('Magazin saýlaň!', 'error');
         return false
      }
      return true
   }

    return (
        <section className="add-product-section container">
            <Typography variant="h4" component="h2">
               Magazin admin goşuň
            </Typography>
            <div className="form-block"> 
                <form className={classes.root} noValidate autoComplete="off" onSubmit={(e) => onSubmit(e)}>
                    {/* Store Admin Name */}
                    <TextField 
                        className={classes.input}
                        id="outlined-basic" 
                        label="Magazin Admin ady" 
                        variant="outlined"
                        value={formData.store_admin_name}
                        required
                        name="store_admin_name"
                        onChange={(e) => onChange(e)}
                        /><br />
                    {/* Store Admin Username */}
                    <TextField 
                        className={classes.input}
                        id="outlined-basic" 
                        label="Magazin Admin ulanyjy ady(username)" 
                        variant="outlined"
                        value={formData.store_admin_username}
                        required
                        name="store_admin_username"
                        onChange={(e) => onChange(e)}
                        /><br />
                    {/* Store Admin Phone Number */}
                    <TextField 
                        className={classes.input}
                        id="outlined-basic" 
                        label="Magazin Admin telefon belgisi" 
                        variant="outlined"
                        value={formData.store_admin_phone}
                        required 
                         type = "number"
                        name="store_admin_phone"
                        onChange={(e) => onChange(e)}
                /><br />
                {/* Store Admin Password */}
                    <TextField 
                        className={classes.input}
                        id="outlined-basic" 
                        label="Magazin Admin parol" 
                        variant="outlined"
                        value={formData.store_admin_password}
                        required
                        name="store_admin_password"
                        onChange={(e) => onChange(e)}
                        /><br />
                    {/* Store */}
                    <InputLabel children={`Magazin saýla`} />
                        <TextField
                            className={classes.input}
                            id="outlined-select-currency"
                            select
                            label="Magazin"
                            value={formData.storeId ? formData.storeId : ''}
                            onChange={(e) => onChange(e)}
                            variant="outlined"
                           name="storeId"
                           required
                        >
                            {
                                stores && stores.length > 0 ?
                                stores.map((option,index) => (
                                    <MenuItem key={index} value={option.store_id}>
                                    {option.store_name} - No {option.store_number}
                                    </MenuItem>
                                )) : 'Başga store ýok'
                            }
                        </TextField>
                    
                        
                    <Button variant="contained" color="primary" type='submit'>
                        Magazin admin döret
                    </Button>
                </form>
            </div>
        </section>
    )
}

AddStoreAdmin.propTypes = {
    createStoreAdmin: PropTypes.func.isRequired,
    setAlert: PropTypes.func.isRequired,

}

export default connect(null, {
   createStoreAdmin,
   setAlert
  })(AddStoreAdmin);
    
