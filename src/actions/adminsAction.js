import axios from 'axios';
import {
   REGISTER_SUCCESS,
   REGISTER_FAIL,
   ADMIN_LOADED,
   AUTH_ERROR,
   LOGIN_FAIL,
   LOGIN_SUCCESS,
   SET_LOADING_AUTH,
   LOGOUT
} from './types';
import setAuthToken from '../utils/setAuthToken';

// Load Admin
export const loadAdmin = () => async dispatch => {
   
   if (localStorage.smToken) {
      setAuthToken(localStorage.smToken);
   }
   try {
      const res = await axios.get('/api/users/auth');
      dispatch({
         type: ADMIN_LOADED,
         payload: res.data
      });
      console.log('user : ', res.data)
   }
   catch (error) {
      dispatch({ type: AUTH_ERROR });
   }
}

// Register Admin
export const register = ({ username, phone_number, password }) => async dispatch => {

      dispatch({ type: SET_LOADING_AUTH });


   const config = {
      headers: {
         'Content-Type': 'application/json'  
      }
   };

   const body = JSON.stringify({ username, phone_number, password });

   console.log(body)
   
   try {
      const res = await axios.post('/api/users', body, config);

      dispatch({
         type: REGISTER_SUCCESS,
         payload : res.data
      });

      console.log(res.data);
      // dispatch(loadAdmin());

   }
   catch (err) {
      console.error('Auth error:', err)
      dispatch({ type: REGISTER_FAIL });
   }
}

// Login Admin
export const login = (phone_number, password) => async dispatch => {
   const config = {
      headers: {
         'Content-Type': 'application/json'
      }
   };

   const body = JSON.stringify({ phone_number, password });
   
   try {
      const res = await axios.post('/api/users/login', body, config);

      dispatch({
         type: LOGIN_SUCCESS,
         payload: res.data
      });

      dispatch(loadAdmin());

      console.log(res.data)

   }
   catch (err) {
      const errors = err.response.data.errors;

      if (errors) {
         // errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
         console.log(errors)
      }
      dispatch({ type: LOGIN_FAIL });
   }
};

// Logout / Clear Profile
export const logout = () => dispatch => {
   dispatch({ type: LOGOUT });
}