import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TableCell from '@material-ui/core/TableCell';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import TableRow from '@material-ui/core/TableRow';
import Chip from '@material-ui/core/Chip';
// 
import { deleteSize } from '../../actions/sizesAction';


const OrderItem = ({order :{
    order_id,
    order_status,
    user,
}}) => {


  return (
      <> 
          {/* Store-Item */}
      <TableRow key="ID">
          {/* Store ID */}
          <TableCell align="left">{order_id && order_id.slice(0,5)} ...</TableCell>
          <TableCell align="left">{order_status && order_status}</TableCell>

      </TableRow>  
      </>
  )
}

OrderItem.propTypes = {
  order : PropTypes.object.isRequired,
}

export default OrderItem;


