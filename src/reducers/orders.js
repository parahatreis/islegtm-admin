import {
    GET_ORDERS,
    SET_LOADING_ORDERS,
  } from '../actions/types';
  
  
  const initialState = {
     orders: [],
     loading : false
  }
  
  export default function ordersReducer(state = initialState, action) {
    const { type, payload } = action;
 
    switch (type) {
       case SET_LOADING_ORDERS:
          return {
             ...state,
             loading: true
          }
       case GET_ORDERS:
          return {
             ...state,
             orders: payload,
             loading : false
          }
       default:
          return state;
       }
  }