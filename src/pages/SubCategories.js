import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
// 
import SubCategorieList from '../components/subcategories/SubCategorieList'
import { getSubCategories } from '../actions/subcategoriesAction';



const SubCategories = ({subcategories, getSubCategories}) => {

    useEffect(() => {
     
      getSubCategories();

  
     }, [getSubCategories])

    return (
        <section className="container products-section">
         <header>
            <Typography variant="h4" component="h2">
            Subkategoriýalar
            </Typography>
            <Link to="/subcategories/add-subcategorie">
               <Button className="btn" variant="contained" color="primary">
                  <AddIcon />
                  Subkategoriýa goş
               </Button>
            </Link>
         </header>
         <div className="products-wrapper">
            {/* Product Pagination */}
            <SubCategorieList subcategories={subcategories} />

         </div>
      </section>
    )
}

SubCategories.propTypes = {
    subcategories: PropTypes.object.isRequired,
    getSubCategories: PropTypes.func.isRequired,
 }
 const mapStateToProps = state => ({
    subcategories: state.subcategories,
 })
 
 export default connect(mapStateToProps,{
   getSubCategories
 })(SubCategories)