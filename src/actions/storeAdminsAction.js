import axios from 'axios';
import {
    GET_STORE_ADMINS,
    SET_LOADING_STORE_ADMINS,
    DELETE_STORE_ADMIN,
    CREATE_STORE_ADMIN,
    GET_CURRENT_STORE_ADMIN,
    UPDATE_STORE_ADMIN,
} from './types';

// GET ALL StoreAdmins
export const getStoreAdmins = () => async dispatch => {

    dispatch({ type: SET_LOADING_STORE_ADMINS });
 
    try {
       const res = await axios.get('/api/store_admins');
 
       dispatch({
          type: GET_STORE_ADMINS,
          payload : res.data
       })
    }
    catch (error) {
       console.error(error)
    }
 }

// Create StoreAdmin
export const createStoreAdmin = (obj) => async dispatch => {

    dispatch({ type: SET_LOADING_STORE_ADMINS });
 
    const config = {
       headers: {
          'Content-Type': 'application/json'  
       }
    };
 
    const body = JSON.stringify(obj);
 
    try {
       const res = await axios.post('/api/store_admins', body, config);
 
       dispatch({
          type: CREATE_STORE_ADMIN,
          payload : res.data
       });
    }
    catch (error) {
       console.error(error)
    }
  }

   // DELETE SubCategorie
export const deleteStoreAdmin = (id) => async dispatch => {
   
    dispatch({ type: SET_LOADING_STORE_ADMINS });

    try {
         await axios.delete(`/api/store_admins/${id}`);
         
         dispatch({
             type: DELETE_STORE_ADMIN,
             payload: id
         });
 
    } catch (error) {
       console.error(error)
    }
 }


 // Get Current StoreAdmin
export const getCurrentStoreAdmin = (id) => async dispatch => {
   
    dispatch({ type: SET_LOADING_STORE_ADMINS });
 
    try {
         const res = await axios.get(`/api/store_admins/${id}`);
 
         dispatch({
             type: GET_CURRENT_STORE_ADMIN,
             payload: res.data
         });
 
    } catch (error) {
       console.error(error)
    }
 }
 
 
  // Edit StoreAdmin
 export const editStoreAdmin = (obj) => async dispatch => {
 
     const config = {
         headers: {
         'Content-Type': 'application/json'  
         }
     };
     const body = JSON.stringify(obj);
 
     try {

         await axios.patch(`/api/store_admins/${obj.store_admin_id}`, body, config);
 
         dispatch({
            type: UPDATE_STORE_ADMIN,
            payload : obj
         });
     }
     catch (error) {
         console.error(error)
     }
  }