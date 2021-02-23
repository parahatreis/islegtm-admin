import axios from 'axios';
import {
    GET_SUBCATEGORIES,
    SET_LOADING_SUBCATEGORIES,
    CREATE_SUBCATEGORIE,
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


// // GET ALL Categories
// export const createCategorie = (categorie_name,image) => async dispatch => {

//     dispatch({ type: SET_LOADING_SUBCATEGORIES });

//     const config = {
//         headers: {
//            'Content-Type': 'application/json'  
//         }
//      };

//      const body = JSON.stringify({ categorie_name });
//     try {

//       let obj = {}
//         const res = await axios.post('/api/categories', body, config);
//         const resImage = await axios.post(`/api/categories/image/${res.data.categorie_id}`,image);
//         obj = res.data
//         obj = {
//            ...obj,
//            categorie_image : resImage.data
//         }
//          dispatch({
//             type: CREATE_CATEGORIE,
//             payload : obj
//          });
//     }
//     catch (error) {
//        console.error(error)
//     }
//  }
 


//  // DELETE Categorie
// export const deleteCategorie = (id) => async dispatch => {
   
//     dispatch({ type: SET_LOADING_SUBCATEGORIES });

//     try {
//          await axios.delete(`/api/categories/${id}`);
         
//          dispatch({
//              type: DELETE_CATEGORIE,
//              payload: id
//          });
 
//     } catch (error) {
//        console.error(error)
//     }
//  }

// // Get Current Categorie
// export const getCurrentCategorie = (id) => async dispatch => {
   
//    dispatch({ type: SET_LOADING_SUBCATEGORIES });

//    try {
//         const res = await axios.get(`/api/categories/${id}`);
//         dispatch({
//             type: GET_CURRENT_CATEGORIE,
//             payload: res.data
//         });

//    } catch (error) {
//       console.error(error)
//    }
// }


//  // Edit Categorie
// export const editCategorie = (obj,image = null) => async dispatch => {

//    console.log(obj)

//       const config = {
//          headers: {
//             'Content-Type': 'application/json'  
//          }
//       };
//       const body = JSON.stringify(obj);

//       try {

//          let newObj = obj;

//          await axios.patch(`/api/categories/${obj.categorie_id}`, body, config);

//          if(image){
//             const resImage = await axios.post(`/api/categories/image/${obj.categorie_id}`,image);
//             newObj = {
//                ...newObj,
//                categorie_image : resImage.data
//             }
//          }

//          dispatch({
//             type: UPDATE_CATEGORIE,
//             payload : newObj
//          });
//       }
//       catch (error) {
//          console.error(error)
//       }
//  }