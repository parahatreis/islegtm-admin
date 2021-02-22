import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
// 
import CategorieList from '../components/categories/CategorieList'
import { getCategories } from '../actions/categoriesAction';



const Categories = ({categories, getCategories}) => {

    useEffect(() => {
     
        getCategories()
  
     }, [getCategories])

    return (
        <section className="container products-section">
         <header>
            <Typography variant="h4" component="h2">
               Categories
            </Typography>
            <Link to="/categories/add-categorie">
               <Button className="btn" variant="contained" color="primary">
                  <AddIcon />
                  Add categorie
               </Button>
            </Link>
         </header>
         <div className="products-wrapper">
            {/* Product Pagination */}
            <CategorieList categories={categories} />

         </div>
      </section>
    )
}

Categories.propTypes = {
    categories: PropTypes.object.isRequired,
    getCategories: PropTypes.func.isRequired,
 }
 const mapStateToProps = state => ({
    categories: state.categories,
 })
 
 export default connect(mapStateToProps, {
    getCategories
 })(Categories);
