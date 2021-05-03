import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
// 
import HomeSubsList from '../components/home-subcategories/HomeSubsList'
import { getHomeSubs } from '../actions/homeSubcategoriesAction';



const HomeSubcategories = ({home, getHomeSubs}) => {

    useEffect(() => {
     
      getHomeSubs()
  
     }, [getHomeSubs])

    return (
        <section className="container products-section">
         <header>
            <Typography variant="h4" component="h2">
               Baş sahypa Subkategoriýalary
            </Typography>
         </header>
         <div className="products-wrapper">
            {/* Product Pagination */}
            <HomeSubsList home={home} />
         </div>
      </section>
    )
}

HomeSubcategories.propTypes = {
   home: PropTypes.object.isRequired,
   getHomeSubs: PropTypes.func.isRequired,
 }
 const mapStateToProps = state => ({
   home: state.home,
 })
 
 export default connect(mapStateToProps, {
   getHomeSubs
 })(HomeSubcategories);
