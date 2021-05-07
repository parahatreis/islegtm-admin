import axios from 'axios';
import {
   GET_ORDERS,
SET_LOADING_ORDERS,
GET_CURRENT_ORDER
} from './types';

// GET ALL orders
export const getOrders = () => async dispatch => {

   dispatch({ type: SET_LOADING_ORDERS });

   try {
      const res = await axios.get('/v1/orders');

      console.log(res.data)

      dispatch({
         type: GET_ORDERS,
         payload : res.data
      });

   }
   catch (error) {
      console.error(error)
   }
}

// GET ALL orders
export const getCurrentOrder = (id) => async dispatch => {

   dispatch({
      type: SET_LOADING_ORDERS
   });

   try {
      console.log('api')
      const res = await axios.get(`/v1/orders/${id}`);

      console.log(res.data)

      dispatch({
         type: GET_CURRENT_ORDER,
         payload: res.data
      });

   } catch (error) {
      console.error(error)
   }
}
