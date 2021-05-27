import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
// 
import ProductList from '../components/products/ProductList';
import CurrencyChange from '../components/products/CurrencyChange'
// 
import { getProducts } from '../actions/productsAction';


const Products = ({products , getProducts}) => {

   const [open, setOpen] = useState(true);


   useEffect(() => {
     
      getProducts()

   }, [getProducts]);

   const handleOpen = (e) => {
      setOpen(true);
  };

  const handleClose = () => {
      setOpen(false);
  };

   return (
      <section className="container products-section">
         <header>
            <Typography variant="h4" component="h2">
               Harytlar
            </Typography>
            <div>
               <Button
                  onClick={handleOpen}
                  style={{backgroundColor : 'green', marginRight : '10px'}}
                  color="primary"
                  variant="contained"
                  >
                  <MonetizationOnIcon />
               </Button>
               <Link to="/products/add-product">
                  <Button className="btn" variant="contained" color="primary">
                     <AddIcon />
                     Haryt goş
                  </Button>
               </Link>
            </div>
         </header>
         <div className="products-wrapper">
            {/* Product Pagination */}
            <ProductList products={products} />
         </div>

         {/* Currency Change */}
         <CurrencyChange handleClose={handleClose} open={open} />
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
