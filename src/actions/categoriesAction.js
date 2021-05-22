import axios from 'axios';
import {
   GET_CATEGORIES,
   SET_LOADING_CATEGORIES,
   DELETE_CATEGORIE,
   CREATE_CATEGORIE,
   GET_CURRENT_CATEGORIE,
} from './types';


// GET ALL Categories
export const getCategories = () => async dispatch => {

   dispatch({ type: SET_LOADING_CATEGORIES });

   try {
      const res = await axios.get('/v1/categories');

      dispatch({
         type: GET_CATEGORIES,
         payload : res.data
      })
   }
   catch (error) {
      console.error(error)
   }
}


// Create Categories
export const createCategorie = (obj,image) => async dispatch => {

   dispatch({ type: SET_LOADING_CATEGORIES });

   const config = {
   headers: {
      'Content-Type': 'application/json'  
   }
   };

   const body = JSON.stringify(obj);

   try {

      let newObj = {}

      const res = await axios.post('/v1/categories', body, config);
      newObj = res.data

      dispatch({
         type: CREATE_CATEGORIE,
         payload : newObj
      });
      // Check image
      const hasImage = image.get('image').name ? true : false;

      if(hasImage){
         await axios.post(`/v1/categories/image/${newObj.categorie_id}`,image);
      }

      return 200;

   }
   catch (error) {
      console.error(error);
      return 500;
   }
 }
 


 // DELETE Categorie
export const deleteCategorie = (id) => async dispatch => {
   
   dispatch({ type: SET_LOADING_CATEGORIES });

   try {
      await axios.delete(`/v1/categories/${id}`);
      
      dispatch({
            type: DELETE_CATEGORIE,
            payload: id
      });

      return 200;

   } catch (error) {
      console.error(error);
      return 500
   }
 }

// Get Current Categorie
export const getCurrentCategorie = (id) => async dispatch => {
   
   dispatch({ type: SET_LOADING_CATEGORIES });

   try {
        const res = await axios.get(`/v1/categories/${id}`, {
           params : {
              getImage : true
           }  
        });
        dispatch({
            type: GET_CURRENT_CATEGORIE,
            payload: res.data
        });

   } catch (error) {
      console.error(error)
   }
}


 // Edit Categorie
export const editCategorie = (obj,image = null) => async dispatch => {
   const config = {
      headers: {
         'Content-Type': 'application/json'  
      }
   };
   const body = JSON.stringify(obj);

   try {

      await axios.patch(`/v1/categories/${obj.categorie_id}`, body, config);

      // Check image
      const hasImage = image.get('image').name ? true : false;

      if(hasImage){
         await axios.post(`/v1/categories/image/${obj.categorie_id}`,image);
      }

      return 200;

   }
   catch (error) {
      console.error(error);
      return 500
   }
 }