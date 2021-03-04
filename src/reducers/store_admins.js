import {
   GET_STORE_ADMINS,
   SET_LOADING_STORE_ADMINS,
   DELETE_STORE_ADMIN,
   CREATE_STORE_ADMIN,
   GET_CURRENT_STORE_ADMIN,
   UPDATE_STORE_ADMIN,
 } from '../actions/types';
 
 
 const initialState = {
    store_admins: [],
    current_store_admin : null,
    loading : false
 }
 
 export default function storeAdminsReducer(state = initialState, action) {
   const { type, payload } = action;

   switch (type) {
      case SET_LOADING_STORE_ADMINS:
         return {
            ...state,
            loading: true
         }
      case GET_STORE_ADMINS:
         return {
            ...state,
            store_admins: payload,
            loading : false
         }
      case GET_CURRENT_STORE_ADMIN:
            return {
               ...state,
               current_store_admin: payload,
               loading : false
            }
      case CREATE_STORE_ADMIN:
         return {
            ...state,
            store_admins: [
               ...state.store_admins,
               payload
            ],
            loading : false
         }
      case UPDATE_STORE_ADMIN:
         let index = state.store_admins.findIndex((store_admin) => {
            return store_admin.store_admin_id === payload.store_admin_id
         });
         let catArr = state.store_admins
         catArr[index] = payload;
         return {
            ...state,
            store_admins : catArr,
            loading: false
            };
      case DELETE_STORE_ADMIN:
         return {
            ...state,
            store_admins: state.store_admins.filter((store_admin) => {
               return store_admin.store_admin_id !== payload
            }),
            loading: false
            };
      default:
         return state;
      }
 }