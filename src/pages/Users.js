import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
// 
import UserList from '../components/users/UserList'
import { getUsers } from '../actions/usersAction';



const Users = ({users, getUsers}) => {

    useEffect(() => {
     
        getUsers();
  
    }, [getUsers])

    return (
        <section className="container products-section">
         <header>
            <Typography variant="h4" component="h2">
               Ulanyjylar
            </Typography>
         </header>
         <div className="products-wrapper">
            {/* Product Pagination */}
            <UserList users={users} />
         </div>
      </section>
    )
}

Users.propTypes = {
   users: PropTypes.object.isRequired,
   getUsers: PropTypes.func.isRequired,
 }
 const mapStateToProps = state => ({
    users: state.orders,
 })
 
 export default connect(mapStateToProps, {
    getUsers
 })(Users);
