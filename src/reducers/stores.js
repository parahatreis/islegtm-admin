import {
   GET_STORES,
   SET_LOADING_STORES,
   DELETE_STORE,
   CREATE_STORE,
   GET_CURRENT_STORE,
   UPDATE_STORE,
 } from '../actions/types';
 
 
 const initialState = {
    stores: [],
    current_store : null,
    loading : false
 }
 
 export default function storesReducer(state = initialState, action) {
   const { type, payload } = action;

   switch (type) {
      case SET_LOADING_STORES:
         return {
            ...state,
            loading: true
         }
      case GET_STORES:
         return {
            ...state,
            stores: payload,
            loading : false
         }
      case GET_CURRENT_STORE:
            return {
               ...state,
               current_store: payload,
               loading : false
            }
      case CREATE_STORE:
         return {
            ...state,
            stores: [
               ...state.stores,
               payload
            ],
            loading : false
         }
      case UPDATE_STORE:
         let index = state.stores.findIndex((store) => {
            return store.store_id === payload.store_id
         });
         let catArr = state.stores
         catArr[index] = payload;
         return {
            ...state,
            stores : catArr,
            loading: false
            };
      case DELETE_STORE:
         return {
            ...state,
            stores: state.stores.filter((store) => {
               return store.store_id !== payload
            }),
            loading: false
            };
      default:
         return state;
      }
 }