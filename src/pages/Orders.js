import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
// 
import OrderList from '../components/orders/OrderList'
import { getOrders } from '../actions/ordersAction';



const Orders = ({orders, getOrders}) => {

    useEffect(() => {
     
        getOrders();
  
    }, [getOrders])

    return (
        <section className="container products-section">
         <header>
            <Typography variant="h4" component="h2">
               Sargytlar
            </Typography>
         </header>
         <div className="products-wrapper">
            {/* Product Pagination */}
            <OrderList orders={orders} />
         </div>
      </section>
    )
}

Orders.propTypes = {
   orders: PropTypes.object.isRequired,
   getOrders: PropTypes.func.isRequired,
 }
 const mapStateToProps = state => ({
    orders: state.orders,
 })
 
 export default connect(mapStateToProps, {
    getOrders
 })(Orders);
