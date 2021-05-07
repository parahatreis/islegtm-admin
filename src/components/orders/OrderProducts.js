import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TableHead from '@material-ui/core/TableHead';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import { makeStyles } from '@material-ui/core/styles';
// 
import OrderProductItem from './OrderProductItem';
import { getCurrentOrder } from '../../actions/ordersAction'
import Spinner from '../layouts/Spinner';


const useStyles = makeStyles({
    table: {
      minWidth: 550
    },
  });


const OrderProducts = ({ orders: { loading, current_order }, match, getCurrentOrder }) => {
   
   const classes = useStyles();
   
   // GET current
   useEffect(() => {
      getCurrentOrder(match.params.id);
      window.scrollTo(0, 0);
   }, [getCurrentOrder, match.params.id])

    return (
      <div className="list-wrapper">
          {
             loading ? <Spinner /> :
               <TableContainer component={Paper}>
                  <Table className={classes.table} aria-label="simple table">              
                     <TableHead>
                     <TableRow>
                           <TableCell align="left">ID</TableCell>
                           <TableCell align="left">Haryt Suraty</TableCell>
                           <TableCell align="left">Haryt ady</TableCell>
                           <TableCell align="left">Ölçeg</TableCell>
                           <TableCell align="left">Magazin</TableCell>
                              <TableCell align="left">Haryt Bahasy</TableCell>
                           <TableCell align="left">Satylan bahasy</TableCell>
                            <TableCell align="left">Mukadary</TableCell>
                           <TableCell align="left">Jemi</TableCell>
                     </TableRow>
                     </TableHead>
                     <TableBody>
                     {/* Categorie ITEM */}
                     {
                        current_order &&
                        current_order.order_products.map((order_product,index) => <OrderProductItem key={index} order_product={order_product} />)
                     }

                     </TableBody>
                  </Table>
               </TableContainer>
        } 
      </div>
    )
}

OrderProducts.propTypes = {
   orders: PropTypes.object.isRequired,
   getCurrentOrder: PropTypes.func.isRequired,
}
const mapStateToProps = state => ({
   orders: state.orders,
})

export default connect(mapStateToProps, {
   getCurrentOrder
})(OrderProducts);
