import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
// 
import BrandList from '../components/brands/BrandList'
import { getBrands } from '../actions/brandsActions';



const Brands = ({brands, getBrands}) => {

    useEffect(() => {
     
        getBrands();
  
     }, [getBrands])

    return (
        <section className="container products-section">
         <header>
            <Typography variant="h4" component="h2">
            Brendler
            </Typography>
            <Link to="/brands/add-brand">
               <Button className="btn" variant="contained" color="primary">
                  <AddIcon />
                  Brend goş
               </Button>
            </Link>
         </header>
         <div className="products-wrapper">
            {/* List */}
            <BrandList brands={brands} />

         </div>
      </section>
    )
}

Brands.propTypes = {
    brands: PropTypes.object.isRequired,
    getBrands: PropTypes.func.isRequired,
 }
 const mapStateToProps = state => ({
    brands: state.brands,
 })
 
 export default connect(mapStateToProps,{
    getBrands
 })(Brands)