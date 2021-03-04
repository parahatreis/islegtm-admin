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
  


const AddStoreAdmin = ({createStoreAdmin}) => {
    
    const [formData,setFormData] = useState({
        store_admin_name : '',
        store_admin_phone : '',
        store_admin_password : '',
        store_admin_username : '',
        store_id : '',
    })
    const classes = useStyles();
    const history = useHistory();
    const [stores,setStore] = useState([{
        store_id : '123'
    }]);

    const onChange = (e) => setFormData({...formData, [e.target.name] : e.target.value});


    useEffect(() => {
        axios.get(`/api/stores`)
            .then((res) => {
                if (res.data) {
                    setStore(res.data);
                }
            })
            .catch((err) => console.error('Stores : ',err))

    }, [])


    const onSubmit = (e) => {
        e.preventDefault();
        createStoreAdmin(formData);
        return history.push('/store-admins')
    }

    return (
        <section className="add-product-section container">
            <Typography variant="h4" component="h2">
               Add Store
            </Typography>
            <div className="form-block"> 
                <form className={classes.root} noValidate autoComplete="off" onSubmit={(e) => onSubmit(e)}>
                    {/* Store Admin Name */}
                    <TextField 
                        className={classes.input}
                        id="outlined-basic" 
                        label="Store Admin Name" 
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
                        label="Store Admin Username" 
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
                        label="Store Admin Phone Number" 
                        variant="outlined"
                        value={formData.store_admin_phone}
                        required
                        name="store_admin_phone"
                        onChange={(e) => onChange(e)}
                        /><br />
                    {/* Store Admin Password */}
                    <InputLabel children={`Select Store`} />
                        <TextField
                            className={classes.input}
                            id="outlined-select-currency"
                            select
                            label="Store"
                            value={formData.store_id}
                            onChange={(e) => onChange(e)}
                            variant="outlined"
                            name="store_id"
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
                    {/* Store Admin Password */}
                    <TextField 
                        className={classes.input}
                        id="outlined-basic" 
                        label="Store Admin Password" 
                        variant="outlined"
                        value={formData.store_admin_password}
                        required
                        name="store_admin_password"
                        onChange={(e) => onChange(e)}
                        /><br />
                        
                    <Button variant="contained" color="primary" type='submit'>
                        Create Store
                    </Button>
                </form>
            </div>
        </section>
    )
}

AddStoreAdmin.propTypes = {
    createStoreAdmin: PropTypes.func.isRequired,
}

export default connect(null, {
    createStoreAdmin
  })(AddStoreAdmin);
    
