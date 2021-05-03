import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
// 
import StoreAdminList from '../components/store-admins/StoreAdminList'
import { getStoreAdmins } from '../actions/storeAdminsAction';



const StoreAdmins = ({store_admins, getStoreAdmins}) => {

    useEffect(() => {
     
      getStoreAdmins();
  
     }, [getStoreAdmins])

    return (
        <section className="container products-section">
         <header>
            <Typography variant="h4" component="h2">
            Magazin Adminleri
            </Typography>
            <Link to="/store-admins/add-store-admin">
               <Button className="btn" variant="contained" color="primary">
                  <AddIcon />
                  Magazin Admin Goş
               </Button>
            </Link>
         </header>
         <div className="products-wrapper">
            <StoreAdminList store_admins={store_admins} />
         </div>
      </section>
    )
}

StoreAdmins.propTypes = {
   store_admins: PropTypes.object.isRequired,
    getStoreAdmins: PropTypes.func.isRequired,
 }
 const mapStateToProps = state => ({
   store_admins: state.store_admins,
 })
 
 export default connect(mapStateToProps,{
   getStoreAdmins
 })(StoreAdmins)