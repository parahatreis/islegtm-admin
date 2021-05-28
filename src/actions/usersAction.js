import axios from 'axios';
import {
   GET_USERS,
   SET_LOADING_USERS
} from './types';

// GET ALL orders
export const getUsers = () => async dispatch => {

   dispatch({ type: SET_LOADING_USERS });

   try {
      const res = await axios.get('/v1/users');

      console.log(res.data)

      dispatch({
         type: GET_USERS,
         payload : res.data
      });

   }
   catch (error) {
      console.error(error)
   }
}
