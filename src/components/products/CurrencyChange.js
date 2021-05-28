import React, {useState, useEffect, useRef} from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import {useHistory} from 'react-router-dom';
// 
import { setAlert } from '../../actions/alertsAction';
import { getProducts } from '../../actions/productsAction';


const useStyles = makeStyles({
    table: {
      minWidth: 650
    },
    primaryText : {
      color : '#3f51b5'
    },
    input : {
        width : '100%'
    },
    paper: {
      position: 'absolute',
      left : "50%",
      top : "50%",
      transform : "translate(-50%,-50%)",
      width: 500,
      backgroundColor: 'white',
      boxShadow: '0 0 10px grey',
      padding: '20px',
      outline : 'none',
      borderRadius : '5px',
    },
    btnGroup : {
      display : 'flex',
      width : '100%',
      justifyContent :'center',
    }
  });

const CurrencyChange = ({handleClose, open,getProducts,setAlert}) => {

    const nodeRef = useRef(null);
    const classes = useStyles();
    const history = useHistory();
    const [loacalLoading, setLocalLoading] = useState(true);
    const [currency, setCurrency] = useState({
        currency_id : '',
        currency_price : ''
    })

    // Get Currency
    useEffect(() => {
        axios.get(`/v1/currency`)
            .then((res) => {
                if (res.data) {
                    setCurrency(res.data);
                    setLocalLoading(false);
                }
            })
            .catch((err) => console.error('SizeTypes: ', err))
    }, []);

    const updateCurrencyPrice = (obj) => {

        setLocalLoading(true);

        const config = {
           headers: {
              'Content-Type': 'application/json'
           }
        };
        const body = JSON.stringify(obj);
  
        axios.patch(`/v1/currency`, body, config)
           .then(() => {
                setLocalLoading(false);
                getProducts();
                handleClose()
                history.push('/products');
           })
           .catch((err) => {
                console.error('Orders: ', err);
                setLocalLoading(false);
           })
     }


    const onChange = (e) => setCurrency({
        ...currency,
        currency_price : e.target.value
    })

    const onSubmit = (e) => {
        e.preventDefault();
        updateCurrencyPrice(currency)
    }

    return (
        <div>
            {/* MODAL FOR DELETE */}
            <Modal
                open={open}
                onClose={(e) => handleClose(e)}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                BackdropComponent={Backdrop}
                BackdropProps={{
                timeout: 500,
                }}
            >
                <Fade in={open}
                ref={nodeRef}
                >
                <div className={classes.paper}>
                    <h2 id="transition-modal-title" >Kurs bahasyny üýtget</h2>
                    <div>
                    <form className={classes.root} noValidate autoComplete="off" onSubmit={(e) => onSubmit(e)}>
                        {/* Product Code */}
                        <TextField 
                            className={classes.input} 
                            id="outlined-basic" 
                            label="Baha" 
                            variant="outlined"
                            value={currency.currency_price}
                            onChange={(e) => onChange(e)}
                        />
                        <br />
                        <br />
                        <div className={classes.btnGroup}>
                            <Button variant="contained" disabled={loacalLoading} color="primary" type='submit'>
                                {
                                    loacalLoading ? 
                                    'Ýüklenýär...' :  'Üýtget' 
                                }
                            </Button>
                        </div>
                    </form>
                    </div>
                </div>
                </Fade>
            </Modal>
        </div>
    )
}

CurrencyChange.propTypes = {
    getProducts: PropTypes.isRequired,
    setAlert: PropTypes.isRequired,
}

export default connect(null, {
    getProducts,
    setAlert
  })(CurrencyChange);

