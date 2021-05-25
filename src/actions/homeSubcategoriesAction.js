import axios from 'axios';
import {
    GET_HOME_SUBCATEGORIES,
    SET_LOADING_HOME_SUBCATEGORIES,
    CREATE_HOME_SUBCATEGORIES,
    DELETE_HOME_SUBCATEGORIES,
    UPDATE_HOME_SUBCATEGORIE
} from './types';


// GET ALL Home SubCategories
export const getHomeSubs = () => async dispatch => {

   dispatch({ type: SET_LOADING_HOME_SUBCATEGORIES });

   try {
      const res = await axios.get('/v1/home_subcategories',{
         params : {
            except_products : 1
         } 
      });

      dispatch({
         type: GET_HOME_SUBCATEGORIES,
         payload : res.data
      })
   }
   catch (error) {
      console.error(error)
   }
}

// GET ALL Home SubCategories
export const addHomeSubcategorie = (id) => async dispatch => {

   dispatch({ type: SET_LOADING_HOME_SUBCATEGORIES });

   const config = {
      headers: {
         'Content-Type': 'application/json'  
      }
   };
   const obj = {
      subcategorie_id : id
   }
   const body = JSON.stringify(obj);

   try {
      const res = await axios.post('/v1/home_subcategories',body,config);


      dispatch({ type: CREATE_HOME_SUBCATEGORIES, payload : res.data });
      
      return 200;
   }
   catch (error) {
      console.error(error)
      return 500;
   }

}


 // DELETE HomeSubcat
 export const deleteHomeSubcat = (id) => async dispatch => {
   
   dispatch({ type: SET_LOADING_HOME_SUBCATEGORIES });

   try {
      await axios.delete(`/v1/home_subcategories/${id}`);
      dispatch({ type: DELETE_HOME_SUBCATEGORIES, payload : id });
      return 200;

   } catch (error) {
      console.error(error);
      return 500;
   }
}

// GET ALL Home SubCategories
export const editHomeSubcategorie = (id,home_id) => async dispatch => {

   dispatch({ type: SET_LOADING_HOME_SUBCATEGORIES });

   const config = {
      headers: {
         'Content-Type': 'application/json'  
      }
   };
   const obj = {
      subcategorie_id : id
   }
   const body = JSON.stringify(obj);

   try {
      const res = await axios.patch(`/v1/home_subcategories/${home_id}`,body,config);

      dispatch({ type: UPDATE_HOME_SUBCATEGORIE, payload : res.data });

      return 200;
   }
   catch (error) {
      console.error(error);
      return 500;
   }

}