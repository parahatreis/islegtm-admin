import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
// 
import ProductList from '../components/products/ProductList'
// 
import { getProducts } from '../actions/productsAction';


const Products = ({products , getProducts}) => {

   useEffect(() => {
     
      getProducts()

   }, [getProducts])

   return (
      <section className="container products-section">
         <header>
            <Typography variant="h4" component="h2">
               Products
            </Typography>
            <Link to="/products/add-product">
               <Button className="btn" variant="contained" color="primary">
                  <AddIcon />
                  Add product
               </Button>
            </Link>
         </header>
         <div className="products-wrapper">
            {/* Product Pagination */}
            <ProductList products={products} />
         </div>
      </section>
   )
}

Products.propTypes = {
   products: PropTypes.object.isRequired,
   getProducts: PropTypes.func.isRequired,
}
const mapStateToProps = state => ({
   products: state.products,
})

export default connect(mapStateToProps, {
   getProducts
})(Products);
