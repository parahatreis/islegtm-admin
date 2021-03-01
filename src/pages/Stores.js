import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
// 
import StoreList from '../components/stores/StoreList'
import { getStores } from '../actions/storesAction';



const Stores = ({stores, getStores}) => {

    useEffect(() => {
     
        getStores();
  
     }, [getStores])

    return (
        <section className="container products-section">
         <header>
            <Typography variant="h4" component="h2">
            Stores
            </Typography>
            <Link to="/stores/add-store">
               <Button className="btn" variant="contained" color="primary">
                  <AddIcon />
                  Add Store
               </Button>
            </Link>
         </header>
         <div className="products-wrapper">
            <StoreList stores={stores} />
         </div>
      </section>
    )
}

Stores.propTypes = {
    stores: PropTypes.object.isRequired,
    getStores: PropTypes.func.isRequired,
 }
 const mapStateToProps = state => ({
    stores: state.stores,
 })
 
 export default connect(mapStateToProps,{
    getStores
 })(Stores)