import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import Spinner from '../components/layouts/Spinner'

const PrivateRoute = ({ component: Component, admins: { isAuthenticated, loading }, ...rest }) => (
   <Route
      {...rest}
      render={props =>
      loading ? (
         <Spinner />
      ) : isAuthenticated ? (
         <Component {...props} />
      ) : (
         <Redirect to="/login" />
      )
      }
   />
);

PrivateRoute.propTypes = {
   admins : PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
   admins : state.admins
})

export default connect(mapStateToProps)(PrivateRoute)