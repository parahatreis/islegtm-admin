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
      const res = await axios.get('/v1/home_subcategories');

      dispatch({
         type: GET_HOME_SUBCATEGORIES,
         payload : res.data
      })

      console.log(res.data)
   }
   catch (error) {
      console.error(error)
   }
}