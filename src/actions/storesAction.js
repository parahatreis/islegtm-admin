import axios from 'axios';
import {
    GET_STORES,
    SET_LOADING_STORES,
    DELETE_STORE,
    CREATE_STORE,
    GET_CURRENT_STORE,
   //  UPDATE_STORE,
} from './types';

// GET ALL Stores
export const getStores = () => async dispatch => {

    dispatch({ type: SET_LOADING_STORES });
 
    try {
       const res = await axios.get('/v1/stores');
 
       dispatch({
          type: GET_STORES,
          payload : res.data
       })

       console.log(res.data)
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
       const res = await axios.post('/v1/stores', body, config);
 
       dispatch({
          type: CREATE_STORE,
          payload : res.data
       });
       return window.location.href = '/stores'
    }
    catch (error) {
       console.error(error)
    }
  }

   // DELETE SubCategorie
export const deleteStore = (id) => async dispatch => {
   
    dispatch({ type: SET_LOADING_STORES });

    try {
         await axios.delete(`/v1/stores/${id}`);
         
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
         const res = await axios.get(`/v1/stores/${id}`);
 
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

         await axios.patch(`/v1/stores/${obj.store_id}`, body, config);
 
         return window.location.href = '/stores'

     }
     catch (error) {
         console.error(error)
     }
  }