import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import TableCell from '@material-ui/core/TableCell';
import VisibilityIcon from '@material-ui/icons/Visibility';
import TableRow from '@material-ui/core/TableRow';
import Chip from '@material-ui/core/Chip';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import {Link} from 'react-router-dom'
// 
import { deleteSize } from '../../actions/sizesAction';


const statusNames = [
   {
      status_name: 'waiting'
   },
   {
      status_name: 'processing'
   },
   {
      status_name: 'delivered'
   },
   {
      status_name: 'rejected'
   }
]

const OrderItem = ({order :{
    order_id,
    order_status,
   address,
    subtotal,
    user,
} }) => {

   const [status, setStatus] = useState({
      status_name: '',
      status_color : 'black'
   })


   const [currentStatus, setCurrentStatus] = useState('');

   const handleChangeStatus = (val) => {
      setCurrentStatus(val)
   }
   

   useEffect(() => {
      if (order_status) {
         if (order_status === 'waiting') setStatus({ status_name: order_status, status_color: 'orange' });
         if (order_status === 'processing') setStatus({ status_name: order_status, status_color: 'blue' });
         if (order_status === 'delivered') setStatus({ status_name: order_status, status_color: 'green' });
         if (order_status === 'rejected') setStatus({ status_name: order_status, status_color: 'red' });
         setCurrentStatus(order_status)
      }
   }, [order_status])


  return (
      <> 
          {/* Store-Item */}
      <TableRow key="ID">
          {/* Store ID */}
          <TableCell align="left">{order_id && order_id.slice(0,5)} ...</TableCell>
           <TableCell align="left">{
              user &&
              (
                 <>
                    <p>{user.user_name}</p>
                     <p>{user.user_phone}</p>
                 </>
              )
           }</TableCell>
           <TableCell align="left">{address && address}</TableCell>
           <TableCell align="left">{subtotal && subtotal}</TableCell>
           <TableCell align="left" style={{ color: status.status_color }}>
              <Chip style={{ backgroundColor: status.status_color, color : 'white' }} label={status.status_name} />
           </TableCell>
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
                          <MenuItem key={index} value={option.status_name}>
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


