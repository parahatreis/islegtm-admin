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




const useStyles = makeStyles({
    table: {
      minWidth: 550
    },
    primaryText : {
      color : '#3f51b5'
    },
    image : {
      width : '100px',
      height : '100px'
    },
    paper: {
      position: 'absolute',
      left : "50%",
      top : "50%",
      transform : "translate(-50%,-50%)",
      width: 400,
      backgroundColor: 'white',
      boxShadow: '0 0 10px grey',
      padding: '20px',
      outline : 'none',
      borderRadius : '5px',
      display : 'flex',
      flexDirection : "column" ,
      alignItems :'center'
    },
    btnGroup : {
      display : 'flex',
      width : '60%',
      justifyContent :'space-between',
    }
  });



const OrderItem = ({order :{
    order_id,
    order_status,
    user,
}}) => {

  const classes = useStyles();
  const [open, setOpen] = useState(false);  


  const handleOpen = (e) => {
      setOpen(true);
  };

  const handleClose = () => {
      setOpen(false);
  };

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


