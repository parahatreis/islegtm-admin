import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import Loading from '../components/layouts/Loading'

const PrivateRoute = ({ component: Component, admins: { isAuthenticated, loading }, ...rest }) => (
   <Route
      {...rest}
      render={props =>
      loading ? (
         <Loading />
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