import axios from 'axios';
import {
   GET_BANNERS,
   SET_LOADING_BANNERS,
   DELETE_BANNER,
   GET_CURRENT_BANNER
} from './types';
import {setAlert} from './alertsAction'



// GET ALL Banners
export const getBanners = () => async dispatch => {

   dispatch({ type: SET_LOADING_BANNERS });

   try {
      const res = await axios.get('/v1/banners');

      dispatch({
         type: GET_BANNERS,
         payload : res.data
      })
   }
   catch (error) {
      console.error(error)
   }
}


// Create Categories
export const createBanner = (obj,image) => async dispatch => {

   dispatch({ type: SET_LOADING_BANNERS });

   const config = {
   headers: {
      'Content-Type': 'application/json'  
   }
   };

   const body = JSON.stringify(obj);

   try {

      let newObj = {}

      const res = await axios.post('/v1/banners', body, config);
      newObj = res.data

      // Check image
      const hasImage = image.get('image').name ? true : false;

      if(hasImage){
         await axios.post(`/v1/banners/image/${newObj.banner_id}`,image);
      }

      return window.location.href = '/banners'

   }
   catch (error) {
      const errors = error.response.data.msg;
      dispatch(setAlert(errors, 'error'))
      console.error(error)
   }
 }
 


 // DELETE Banner
export const deleteBanner = (id) => async dispatch => {
   
    dispatch({ type: SET_LOADING_BANNERS });

    try {
         await axios.delete(`/v1/banners/${id}`);
         
         dispatch({
             type: DELETE_BANNER,
             payload: id
         });
 
    } catch (error) {
       console.error(error)
    }
 }

// Get Current Banner
export const getCurrentBanner = (id) => async dispatch => {
   
   dispatch({ type: SET_LOADING_BANNERS });

   try {
        const res = await axios.get(`/v1/banners/${id}`);
        dispatch({
            type: GET_CURRENT_BANNER,
            payload: res.data
        });

   } catch (error) {
      console.error(error)
   }
}


 // Edit Banner
export const editBanner = (obj,image = null) => async dispatch => {
   const config = {
      headers: {
         'Content-Type': 'application/json'  
      }
   };
   const body = JSON.stringify(obj);

   try {

      await axios.patch(`/v1/banners/${obj.banner_id}`, body, config);

      // Check image
      const hasImage = image.get('image').name ? true : false;

      if(hasImage){
         await axios.post(`/v1/banners/image/${obj.banner_id}`,image);
      }

      return window.location.href = '/banners'

   }
   catch (error) {
      console.error(error)
   }
 }