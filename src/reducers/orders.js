import {
    GET_ORDERS,
   SET_LOADING_ORDERS,
    GET_CURRENT_ORDER
  } from '../actions/types';
  
  
  const initialState = {
     orders: [],
     current_order : null,
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
       case GET_CURRENT_ORDER:
          return {
             ...state,
             current_order: payload,
             loading: false
          }
       default:
          return state;
       }
  }