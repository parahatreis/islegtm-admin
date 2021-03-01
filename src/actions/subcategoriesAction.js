import axios from 'axios';
import {
    GET_SUBCATEGORIES,
    SET_LOADING_SUBCATEGORIES,
    CREATE_SUBCATEGORIE,
    SET_SUB_IMAGE,
    DELETE_SUBCATEGORIE,
    GET_CURRENT_SUBCATEGORIE,
    UPDATE_SUBCATEGORIE
} from './types';


// GET ALL Categories
export const getSubCategories = () => async dispatch => {

   dispatch({ type: SET_LOADING_SUBCATEGORIES });

   try {
      const res = await axios.get('/api/subcategories');

      dispatch({
         type: GET_SUBCATEGORIES,
         payload : res.data
      })
   }
   catch (error) {
      console.error(error)
   }
}


// Create SubCategorie
// GET ALL Categories
export const createSubCategorie = (obj,image) => async dispatch => {

   dispatch({ type: SET_LOADING_SUBCATEGORIES });

   const config = {
      headers: {
         'Content-Type': 'application/json'  
      }
   };

   const body = JSON.stringify(obj);

   try {

      let newObj = {}

      const res = await axios.post('/api/subcategories', body, config);
      newObj = res.data

      dispatch({
         type: CREATE_SUBCATEGORIE,
         payload : newObj
      });

      // Check image
      const hasImage = image.get('image').name ? true : false;

      if(hasImage){
         const resImage = await axios.post(`/api/subcategories/image/${newObj.subcategorie_id}`,image);
         dispatch({
            type: SET_SUB_IMAGE,
            payload : {
               id : newObj.subcategorie_id,
               image : resImage.data
            }
         })
      }


   }
   catch (error) {
      console.error(error)
   }
 }
 


 // DELETE SubCategorie
export const deleteSubCategorie = (id) => async dispatch => {
   
    dispatch({ type: SET_LOADING_SUBCATEGORIES });

    try {
         await axios.delete(`/api/subcategories/${id}`);
         
         dispatch({
             type: DELETE_SUBCATEGORIE,
             payload: id
         });
 
    } catch (error) {
       console.error(error)
    }
 }

// Get Current SubCategorie
export const getCurrentSubCategorie = (id) => async dispatch => {
   
   dispatch({ type: SET_LOADING_SUBCATEGORIES });

   try {
        const res = await axios.get(`/api/subcategories/${id}`);
        dispatch({
            type: GET_CURRENT_SUBCATEGORIE,
            payload: res.data
        });

   } catch (error) {
      console.error(error)
   }
}


 // Edit SubCategorie
export const editSubCategorie = (obj,image = null) => async dispatch => {

   const config = {
      headers: {
         'Content-Type': 'application/json'  
      }
   };
   const body = JSON.stringify(obj);

   try {

      let newObj = obj;

      await axios.patch(`/api/subcategories/${obj.subcategorie_id}`, body, config);

      if(image){
         const resImage = await axios.post(`/api/subcategories/image/${obj.subcategorie_id}`,image);
         newObj = {
            ...newObj,
            subcategorie_image : resImage.data
         }
      }

      dispatch({
         type: UPDATE_SUBCATEGORIE,
         payload : newObj
      });
   }
   catch (error) {
      console.error(error)
   }
 }