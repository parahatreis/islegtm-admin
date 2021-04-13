import axios from 'axios';
import {
    GET_ORDERS,
    SET_LOADING_ORDERS,
} from './types';

// GET ALL orders
export const getOrders = () => async dispatch => {

    dispatch({ type: SET_LOADING_ORDERS });
 
    try {
       const res = await axios.get('/v1/orders');
 
       dispatch({
          type: GET_ORDERS,
          payload : res.data
       });

       console.log(res.data)

    }
    catch (error) {
       console.error(error)
    }
}

