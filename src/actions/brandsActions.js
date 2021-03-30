import axios from 'axios';
import {
    GET_BRANDS,
    SET_LOADING_BRANDS,
    CREATE_BRAND,
    DELETE_BRAND,
    GET_CURRENT_BRAND,
} from './types';


// GET ALL SubCategories
export const getBrands = () => async dispatch => {

   dispatch({ type: SET_LOADING_BRANDS });

   try {
      const res = await axios.get('/v1/brands',{
         params : {
            subcategories : true
         }
      });

      dispatch({
         type: GET_BRANDS,
         payload : res.data
      })
   }
   catch (error) {
      console.error(error)
   }
}


// Create SubCategorie
export const createBrand = (obj,image) => async dispatch => {

   dispatch({ type: SET_LOADING_BRANDS });

   let subcats = [];

   const config = {
      headers: {
         'Content-Type': 'application/json'  
      }
   };

   if(obj.subcategories && obj.subcategories.length > 0){
      obj.subcategories.forEach((sub) => subcats.push(sub.subcategorie_id));
   } 

   const body = JSON.stringify({
      brand_name : obj.brand_name,
      subcategories : subcats
   });

   try {

      let newObj = {}

      const res = await axios.post('/v1/brands', body, config);
      newObj = res.data

      dispatch({
         type: CREATE_BRAND,
         payload : newObj
      });

      // Check image
      const hasImage = image.get('image').name ? true : false;

      if(hasImage){
         await axios.post(`/v1/brands/image/${newObj.brand_id}`,image);
      }

      return window.location.href = '/brands'

   }
   catch (error) {
      console.error(error)
   }
 }
 


 // DELETE SubCategorie
export const deletBrand = (id) => async dispatch => {
   
    dispatch({ type: SET_LOADING_BRANDS });

    try {
         await axios.delete(`/v1/brands/${id}`);
         
         dispatch({
             type: DELETE_BRAND,
             payload: id
         });
 
    } catch (error) {
       console.error(error)
    }
 }

// Get Current SubCategorie
export const getCurrentBrand = (id) => async dispatch => {
   
   dispatch({ type: SET_LOADING_BRANDS });

   try {
        const res = await axios.get(`/v1/brands/${id}`);

        dispatch({
            type: GET_CURRENT_BRAND,
            payload: res.data
        });

   } catch (error) {
      console.error(error)
   }
}


 // Edit Brand
export const editBrand = (obj,image = null) => async dispatch => {

   let subcats = []; 
   const config = {
      headers: {
      'Content-Type': 'application/json'  
      }
   };

   if(obj.subcategories && obj.subcategories.length > 0){
      obj.subcategories.forEach((sub) => subcats.push(sub.subcategorie_id));
   } 

   const body = JSON.stringify({
      brand_name : obj.brand_name,
      subcategories : subcats
   });

   try {
      await axios.patch(`/v1/brands/${obj.brand_id}`, body, config);

      // Check image
      const hasImage = image.get('image').name ? true : false;

      if(hasImage){
         await axios.post(`/v1/brands/image/${obj.brand_id}`,image);
      }

      return window.location.href = '/brands'

   }
   catch (error) {
      console.error(error)
   }
 }