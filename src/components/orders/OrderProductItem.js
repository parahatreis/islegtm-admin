import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import TableCell from '@material-ui/core/TableCell';
import VisibilityIcon from '@material-ui/icons/Visibility';
import TableRow from '@material-ui/core/TableRow';
import Chip from '@material-ui/core/Chip';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import { Link } from 'react-router-dom'
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
// 
import Placeholder from '../../img/BG.svg';
import apiPath from '../../utils/apiPath'

const useStyles = makeStyles({
   table: {
      minWidth: 500
   },
   primaryText: {
      color: '#3f51b5'
   },
   image: {
      width: '100px',
      height: '100px'
   },
});


const OrderProductItem = ({ order_product }) => {

   const {
      product,
      sold_price,
      quantity,
      sizeNameId,
      size_name
   } = order_product;

   const [image, setImage] = useState(Placeholder);
    const classes = useStyles();
    
   useEffect(() => {
      if (product.preview_image) {
         if (product.preview_image) {
            setImage(`${apiPath()}/${product.preview_image}`)
         }
      }
   }, [product.preview_image])


  return (
      <TableRow key="num">
           {/* product_id */}
          <TableCell align="left">{product.product_code && product.product_code}</TableCell>
           {/* Product Image */}
            <TableCell align="left">
                <Avatar 
                className={classes.image}
                src={image}
                variant="square" 
                />
            </TableCell>
          <TableCell align="left">{product.product_name_tm && product.product_name_tm}</TableCell>
          <TableCell align="left">{sizeNameId && size_name.size_name}</TableCell>
           <TableCell align="left">{
              product.store && 
              (
                 <>
                    <p>{product.store.store_name}</p>
                    <p>No - {product.store.store_number}</p>
                 </>
               )
              }
           </TableCell>
           <TableCell align="left">{product.price_tmt ? product.price_tmt : product.price_usd }</TableCell>
           <TableCell align="left">{sold_price}</TableCell>
           <TableCell align="left" style={{fontWeight : 'bold'}}>{quantity}</TableCell>
           <TableCell align="left">{quantity && quantity * sold_price}</TableCell>
      </TableRow>  
  )
}

OrderProductItem.propTypes = {
  order_product: PropTypes.object.isRequired,
}

export default OrderProductItem;


