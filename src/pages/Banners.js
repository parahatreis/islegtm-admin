import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
// 
import BannerList from '../components/banners/BannerList'
import { getBanners } from '../actions/bannersAction';



const Banners = ({banners, getBanners}) => {

    useEffect(() => {
     
      getBanners()
  
     }, [getBanners])

    return (
        <section className="container products-section">
         <header>
            <Typography variant="h4" component="h2">
               Bannerler
            </Typography>
            <Link to="/banners/add-banner">
               <Button className="btn" variant="contained" color="primary">
                  <AddIcon />
                  Banner Goş
               </Button>
            </Link>
         </header>
         <div className="products-wrapper">
            {/* Product Pagination */}
            <BannerList banners={banners} />

         </div>
      </section>
    )
}

Banners.propTypes = {
    banner: PropTypes.object.isRequired,
    getBanners: PropTypes.func.isRequired,
 }
 const mapStateToProps = state => ({
    banners: state.banners,
 })
 
 export default connect(mapStateToProps, {
   getBanners
 })(Banners);
