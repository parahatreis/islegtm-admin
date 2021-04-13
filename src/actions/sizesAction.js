import axios from 'axios';
import {
    GET_SIZES,
    SET_LOADING_SIZES,
    // GET_CURRENT_SIZE,
} from './types';

// GET ALL sizes
export const getSizes = () => async dispatch => {

    dispatch({ type: SET_LOADING_SIZES });
 
    try {
       const res = await axios.get('/v1/size_types');
 
       dispatch({
          type: GET_SIZES,
          payload : res.data
       });

    }
    catch (error) {
       console.error(error)
    }
}

// Create size
export const createSize = (obj) => async dispatch => {

    dispatch({ type: SET_LOADING_SIZES });
 
    const config = {
       headers: {
          'Content-Type': 'application/json'  
       }
    };
 
    const body = JSON.stringify(obj);
 
    try {
       await axios.post('/v1/size_types', body, config);

       return window.location.href = '/sizes'
    }
    catch (error) {
       console.error(error)
    }
  }

   // DELETE SubCategorie
export const deleteSize = (id) => async dispatch => {
   
    dispatch({ type: SET_LOADING_SIZES });

    try {
         await axios.delete(`/v1/size_types/${id}`);

         return window.location.href = '/sizes'
 
    } catch (error) {
       console.error(error)
    }
 }


//  // Get Current size
// export const getCurrentsize = (id) => async dispatch => {
   
//     dispatch({ type: SET_LOADING_SIZES });
 
//     try {
//          const res = await axios.get(`/v1/size_types/${id}`);
 
//          dispatch({
//              type: GET_CURRENT_SIZE,
//              payload: res.data
//          });
 
//     } catch (error) {
//        console.error(error)
//     }
//  }
 
 
//   // Edit size
//  export const editsize = (obj) => async dispatch => {
 
//      const config = {
//          headers: {
//          'Content-Type': 'application/json'  
//          }
//      };
//      const body = JSON.stringify(obj);
 
//      try {

//          await axios.patch(`/v1/sizes/${obj.size_id}`, body, config);
 
//          return window.location.href = '/sizes'

//      }
//      catch (error) {
//          console.error(error)
//      }
//   }