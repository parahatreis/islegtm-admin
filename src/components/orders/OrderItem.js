import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import TableCell from '@material-ui/core/TableCell';
import VisibilityIcon from '@material-ui/icons/Visibility';
import TableRow from '@material-ui/core/TableRow';
import Chip from '@material-ui/core/Chip';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import { Link } from 'react-router-dom';
import axios from 'axios'
// 


const statusNames = [
    {
        status : 0, 
        status_name: 'rejected'
    },
    {
        status : 1,
        status_name: 'waiting'
    },
    {
        status : 2,
        status_name: 'processing'
    },
    {
        status : 3,
        status_name: 'delivered'
    },
]

const OrderItem = ({order :{
    order_id,
    order_status,
    subtotal,
    user,
    userAuth,
    user_name,
    user_phone,
    user_address,
    user_note,
    payment_type,
    createdAt,
} }) => {

    const [status, setStatus] = useState({
        status: 0,
        status_color : 'black'
    })
    const [currentStatus, setCurrentStatus] = useState(0);

    const handleChangeStatus = (val) => {

        const config = {
            headers: {
            'Content-Type': 'application/json'
            }
        };
        const body = JSON.stringify({
            order_status : val
        });

        axios.post(`/v1/orders/status/${order_id}`,body,config)
            .then((res) => {
            if (res.data) {
                setCurrentStatus(val);
                changeStatusState(val)
            }
            })
            .catch((err) => console.error('Orders: ', err))
    }


    useEffect(() => {
        if (order_status) {
            const st = statusNames[order_status].status_name;
            changeStatusState(order_status)
            setCurrentStatus(order_status)
        }
    }, [order_status])

    const changeStatusState = (val) => {
        if (val === 1) setStatus({ status: val, status_color: 'orange' });
        if (val === 2) setStatus({ status: val, status_color: 'blue' });
        if (val === 3) setStatus({ status: val, status_color: 'green' });
        if (val === 0) setStatus({ status: val, status_color: 'red' });
    }


    return (
        <> 
            {/* Store-Item */}
        <TableRow key="ID">
            {/* Store ID */}
            <TableCell align="left">{order_id && order_id.slice(0,5)} ...</TableCell>
            <TableCell align="left">{
                <>
                    <p>{user_name}</p>
                    <p>{user_phone}</p>
                </>
            }</TableCell>
            <TableCell align="left">{user_address && user_address}</TableCell>
            <TableCell align="left">{subtotal && subtotal}</TableCell>
            <TableCell align="left" style={{ color: status.status_color }}>
                <Chip style={{ backgroundColor: status.status_color, color : 'white' }} label={statusNames[currentStatus].status_name} />
            </TableCell>
            <TableCell align="left">{createdAt && createdAt}</TableCell>
            <TableCell align="left">
                <TextField
                    id="outlined-select-currency"
                    select
                    label="Status"
                    value={currentStatus}
                    onChange={(e) => handleChangeStatus(e.target.value)}
                    variant="outlined"
                    name="subcategorie"
                    style={{width : '150px'}}
                >
                    {
                        statusNames &&
                        statusNames.map((option, index) => (
                            <MenuItem key={index} value={option.status}>
                            {option.status_name}
                            </MenuItem>
                        ))
                    }
                </TextField>
            </TableCell>
            <TableCell align="left">
                <Link to={`/orders/product-list/${order_id}`}>
                    <VisibilityIcon />
                </Link>
            </TableCell>
        </TableRow>  
        </>
    )
}

OrderItem.propTypes = {
  order : PropTypes.object.isRequired,
}

export default OrderItem;


