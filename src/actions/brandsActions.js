import axios from 'axios';
import {
    GET_BRANDS,
    SET_LOADING_BRANDS,
    CREATE_BRAND,
    SET_BRN_IMAGE,
    DELETE_BRAND,
    GET_CURRENT_BRAND,
    UPDATE_BRAND
} from './types';


// GET ALL SubCategories
export const getBrands = () => async dispatch => {

   dispatch({ type: SET_LOADING_BRANDS });

   try {
      const res = await axios.get('/api/brands');

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

   const config = {
      headers: {
         'Content-Type': 'application/json'  
      }
   };

   // obj.subcategories.forEach((sub) => {
   //    return delete sub.subcategorie_name
   // });

   const body = JSON.stringify(obj);

   try {

      let newObj = {}

      const res = await axios.post('/api/brands', body, config);
      newObj = res.data

      dispatch({
         type: CREATE_BRAND,
         payload : newObj
      });

      // Check image
      const hasImage = image.get('image').name ? true : false;

      if(hasImage){
         const resImage = await axios.post(`/api/brands/image/${newObj.brand_id}`,image);
         dispatch({
            type: SET_BRN_IMAGE,
            payload : {
               id : newObj.brand_id,
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
export const deletBrand = (id) => async dispatch => {
   
    dispatch({ type: SET_LOADING_BRANDS });

    try {
         await axios.delete(`/api/brands/${id}`);
         
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
        const res = await axios.get(`/api/brands/${id}`);

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

    const config = {
        headers: {
        'Content-Type': 'application/json'  
        }
    };
    const body = JSON.stringify(obj);

    try {

        let newObj = obj;

        await axios.patch(`/api/brands/${obj.brand_id}`, body, config);

        if(image){
        const resImage = await axios.post(`/api/brands/image/${obj.brand_id}`,image);
        newObj = {
            ...newObj,
            brand_image : resImage.data
        }
        }

        dispatch({
            type: UPDATE_BRAND,
            payload : newObj
        });
    }
    catch (error) {
        console.error(error)
    }
 }