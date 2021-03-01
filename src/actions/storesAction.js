import axios from 'axios';
import {
    GET_STORES,
    SET_LOADING_STORES,
    DELETE_STORE,
    CREATE_STORE,
    GET_CURRENT_STORE,
    UPDATE_STORE,
} from './types';

// GET ALL Stores
export const getStores = () => async dispatch => {

    dispatch({ type: SET_LOADING_STORES });
 
    try {
       const res = await axios.get('/api/stores');

       console.log(res.data)
 
       dispatch({
          type: GET_STORES,
          payload : res.data
       })
    }
    catch (error) {
       console.error(error)
    }
 }

// Create Store
export const createStore = (obj) => async dispatch => {

    dispatch({ type: SET_LOADING_STORES });
 
    const config = {
       headers: {
          'Content-Type': 'application/json'  
       }
    };
 
    const body = JSON.stringify(obj);
 
    try {
       const res = await axios.post('/api/stores', body, config);
 
       dispatch({
          type: CREATE_STORE,
          payload : res.data
       });
    }
    catch (error) {
       console.error(error)
    }
  }

   // DELETE SubCategorie
export const deleteStore = (id) => async dispatch => {
   
    dispatch({ type: SET_LOADING_STORES });

    try {
         await axios.delete(`/api/stores/${id}`);
         
         dispatch({
             type: DELETE_STORE,
             payload: id
         });
 
    } catch (error) {
       console.error(error)
    }
 }


 // Get Current Store
export const getCurrentStore = (id) => async dispatch => {
   
    dispatch({ type: SET_LOADING_STORES });
 
    try {
         const res = await axios.get(`/api/stores/${id}`);
 
         dispatch({
             type: GET_CURRENT_STORE,
             payload: res.data
         });
 
    } catch (error) {
       console.error(error)
    }
 }
 
 
  // Edit Store
 export const editStore = (obj) => async dispatch => {
 
     const config = {
         headers: {
         'Content-Type': 'application/json'  
         }
     };
     const body = JSON.stringify(obj);
 
     try {

         await axios.patch(`/api/stores/${obj.store_id}`, body, config);
 
         dispatch({
         type: UPDATE_STORE,
         payload : obj
         });
     }
     catch (error) {
         console.error(error)
     }
  }