import {
    GET_SIZES,
    SET_LOADING_SIZES,
    GET_CURRENT_SIZE,
  } from '../actions/types';
  
  
  const initialState = {
     sizes: [],
     current_size : null,
     loading : false
  }
  
  export default function sizesReducer(state = initialState, action) {
    const { type, payload } = action;
 
    switch (type) {
       case SET_LOADING_SIZES:
          return {
             ...state,
             loading: true
          }
       case GET_SIZES:
          return {
             ...state,
             sizes: payload,
             loading : false
          }
       case GET_CURRENT_SIZE:
             return {
                ...state,
                current_size: payload,
                loading : false
             }
       default:
          return state;
       }
  }