import axios from 'axios';
import {
   GET_CATEGORIES,
   SET_LOADING_CATEGORIES,
   DELETE_CATEGORIE,
   CREATE_CATEGORIE,
   GET_CURRENT_CATEGORIE,
   UPDATE_CATEGORIE
} from './types';


// GET ALL Categories
export const getCategories = () => async dispatch => {

   dispatch({ type: SET_LOADING_CATEGORIES });

   try {
      const res = await axios.get('/api/categories');

      dispatch({
         type: GET_CATEGORIES,
         payload : res.data
      })
   }
   catch (error) {
      console.error(error)
   }
}


// GET ALL Categories
export const createCategorie = (categorie_name,image) => async dispatch => {

    dispatch({ type: SET_LOADING_CATEGORIES });

    const config = {
        headers: {
           'Content-Type': 'application/json'  
        }
     };

     const body = JSON.stringify({ categorie_name });
    try {

      let obj = {}
        const res = await axios.post('/api/categories', body, config);
        const resImage = await axios.post(`/api/categories/image/${res.data.categorie_id}`,image);
        obj = res.data
        obj = {
           ...obj,
           categorie_image : resImage.data
        }
         dispatch({
            type: CREATE_CATEGORIE,
            payload : obj
         });
    }
    catch (error) {
       console.error(error)
    }
 }
 


 // DELETE Categorie
export const deleteCategorie = (id) => async dispatch => {
   
    dispatch({ type: SET_LOADING_CATEGORIES });

    try {
         await axios.delete(`/api/categories/${id}`);
         
         dispatch({
             type: DELETE_CATEGORIE,
             payload: id
         });
 
    } catch (error) {
       console.error(error)
    }
 }

// Get Current Categorie
export const getCurrentCategorie = (id) => async dispatch => {
   
   dispatch({ type: SET_LOADING_CATEGORIES });

   try {
        const res = await axios.get(`/api/categories/${id}`);
        dispatch({
            type: GET_CURRENT_CATEGORIE,
            payload: res.data
        });

   } catch (error) {
      console.error(error)
   }
}


 // Edit Categorie
export const editCategorie = (obj,image) => async dispatch => {

      const config = {
         headers: {
            'Content-Type': 'application/json'  
         }
      };

      const body = JSON.stringify(obj);
      try {

         console.log('obj',obj);


         await axios.patch(`/api/categories/${obj.categorie_id}`, body, config);
         const resImage = await axios.post(`/api/categories/image/${obj.categorie_id}`,image);

         let newObj = {
            ...obj,
            categorie_image : resImage.data
         }

         console.log(newObj)

         dispatch({
            type: UPDATE_CATEGORIE,
            payload : newObj
         });

         console.log(resImage.data)
      }
      catch (error) {
         console.error(error)
      }
 }