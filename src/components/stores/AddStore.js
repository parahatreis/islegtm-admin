import React, { useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { InputLabel } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import MenuItem from '@material-ui/core/MenuItem';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
// 
import { createStore } from '../../actions/storesAction';


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
  


const AddStore = ({createStore}) => {
    
    const [formData,setFormData] = useState({
        store_name : '',
        store_number : '',
        store_phone : '',
        store_description : '',
        store_floor : '',
        store_currency : '',
    })
    const classes = useStyles();
    const history = useHistory();

    const onChange = (e) => setFormData({...formData, [e.target.name] : e.target.value});

    const onSubmit = (e) => {
        e.preventDefault();
        createStore(formData);
        return history.push('/stores')
    }

    return (
        <section className="add-product-section container">
            <Typography variant="h4" component="h2">
               Add Store
            </Typography>
            <div className="form-block"> 
                <form className={classes.root} noValidate autoComplete="off" onSubmit={(e) => onSubmit(e)}>
                    {/* Store Name */}
                    <TextField 
                        className={classes.input}
                        id="outlined-basic" 
                        label="Store Name" 
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
                        label="Store Number" 
                        variant="outlined"
                        value={formData.store_number}
                        required
                        name="store_number"
                        onChange={(e) => onChange(e)}
                        /><br />
                    {/* Store Phone */}
                    <TextField 
                        className={classes.input}
                        id="outlined-basic" 
                        label="Store Phone" 
                        variant="outlined"
                        value={formData.store_phone}
                        required
                        name="store_phone"
                        onChange={(e) => onChange(e)}
                        /><br />
                    {/* Store Floor(etazh) */}
                    <TextField 
                        className={classes.input}
                        id="outlined-basic" 
                        label="Store Floor" 
                        variant="outlined"
                        value={formData.store_floor}
                        required
                        name="store_floor"
                        onChange={(e) => onChange(e)}
                        /><br />
                    {/* Store Currency */}
                    <TextField 
                        className={classes.input}
                        id="outlined-basic" 
                        label="Store Currency" 
                        variant="outlined"
                        value={formData.store_currency}
                        name="store_currency"
                        onChange={(e) => onChange(e)}
                        /><br />
                    {/* Store Description */}
                    <TextField 
                        className={classes.input}
                        id="outlined-basic" 
                        label="Store Description" 
                        variant="outlined"
                        value={formData.store_description}
                        name="store_description"
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

AddStore.propTypes = {
    createStore: PropTypes.func.isRequired,
}

export default connect(null, {
    createStore
  })(AddStore);
    
