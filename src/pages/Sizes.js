import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
// 
import SizeList from '../components/sizes/SizeList'
import { getSizes } from '../actions/sizesAction';



const Sizes = ({sizes, getSizes}) => {

    useEffect(() => {
     
        getSizes();
  
    }, [getSizes])

    return (
        <section className="container products-section">
         <header>
            <Typography variant="h4" component="h2">
               Sizes
            </Typography>
            <Link to="/sizes/add-size">
               <Button className="btn" variant="contained" color="primary">
                  <AddIcon />
                  Add Size Type
               </Button>
            </Link>
         </header>
         <div className="products-wrapper">
            {/* Product Pagination */}
            <SizeList sizes={sizes} />
         </div>
      </section>
    )
}

Sizes.propTypes = {
   sizes: PropTypes.object.isRequired,
   getSizes: PropTypes.func.isRequired,
 }
 const mapStateToProps = state => ({
   sizes: state.sizes,
 })
 
 export default connect(mapStateToProps, {
   getSizes
 })(Sizes);
