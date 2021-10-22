import axios from 'axios';
import {
   GET_PRODUCTS,
   COUNT_PRODUCTS,
   SET_LOADING_PRODUCTS,
   PAGE_NUMBER,
   SET_SORTBY,
   CREATE_PRODUCT,
   GET_CURRENT_PRODUCT,
   UPDATE_PRODUCT,
   DELETE_PRODUCT,
   // SET_PRODUCT_IMAGES,
} from './types';



// Get Products
export const getProducts = (page = 0, order = null ) => async dispatch => {

   let sortBy = 'updatedAt:DESC';

   if (order !== null) sortBy = order
   
   dispatch({ type: SET_LOADING_PRODUCTS });
   try {
        const res = await axios.get(`/v1/products/admin`, {
            params: {
               page,
               limit: 10,
               sortBy,
            }
        });

        dispatch({
            type: COUNT_PRODUCTS,
            payload: res.data.count
        })
        dispatch({
            type: GET_PRODUCTS,
            payload: res.data.rows
        });

   } catch (error) {
      console.error('PRODUCTS',error)
   }
}


// Create createProduct
export const createProduct = (obj,image) => async dispatch => {

   dispatch({ type: SET_LOADING_PRODUCTS });

   const config = {
      headers: {
         'Content-Type': 'application/json'  
      }
   };
   const body = JSON.stringify(obj);

   try {

      let newObj = {}


      const res = await axios.post('/v1/products', body, config);
      newObj = res.data


      dispatch({
         type: CREATE_PRODUCT,
         payload : newObj
      });

      // Check image
      const hasImage = image.getAll('images')[0].name ? true : false;

      if(hasImage){
         await axios.post(`/v1/products/image/${newObj.product_id}`,image);
      }

      return 200;
   }
   catch (error) {
      console.error(error)
      return 500;
   }
 }

// Get Current Product
export const getCurrentProduct = (id) => async dispatch => {
   
   dispatch({ type: SET_LOADING_PRODUCTS });

   try {
        const res = await axios.get(`/v1/products/admin/${id}`);

        dispatch({
            type: GET_CURRENT_PRODUCT,
            payload: res.data
        });

   } catch (error) {
      console.error(error)
   }
}


// Update Product
export const editProduct = (obj,image) => async dispatch => {

   dispatch({ type: SET_LOADING_PRODUCTS });

   const config = {
      headers: {
         'Content-Type': 'application/json'  
      }
   };
   const body = JSON.stringify(obj);


   try {


      await axios.patch(`/v1/products/${obj.product_id}`, body, config);


      dispatch({
         type: UPDATE_PRODUCT,
         payload : obj
      });

      // Check image
      let hasImage = false
      if(image){
         hasImage = image.getAll('images')[0].name ? true : false;
      }

      if(hasImage){
         await axios.post(`/v1/products/image/${obj.product_id}`,image);
      }

      return 200;

   }
   catch (error) {
      console.error('UPDATE PRODUCTS --',error)
      return 500;
   }
 }
 



// Get Products By subcategorie_id for HomeProducts
// export const searchProducts = (data, page = 0, order = null) => async dispatch => {
   
//    let sortBy = null;

//    if (order) sortBy = order

//    dispatch({
//       type: SET_LOADING_PRODUCTS
//    });

//    try {
//       const res = await axios.get(`/v1/products/search`, {
//          params: {
//             search: data,
//             page,
//             limit: 5,
//             sortBy,
//          }
//       });

//       dispatch({
//          type: COUNT_PRODUCTS,
//          payload: res.data.count
//       })
//       dispatch({
//          type: GET_PRODUCTS,
//          payload: res.data.rows
//       });

//    } catch (error) {
//       console.error(error)
//    }
// }



// // Get Product By Id
// export const getProductById = (id) => async dispatch => {

//    dispatch({ type: SET_LOADING_PRODUCTS });


//    try {
//       const res = await axios.get(`/v1/products/${id}`);

//       dispatch({
//          type: CURRENT_PRODUCT,
//          payload: res.data
//       })

//    } catch (error) {
//       console.error('Details',error)
//    }
// }


// DELETE Product
export const deleteProduct = (id) => async dispatch => {
   
   dispatch({ type: SET_LOADING_PRODUCTS });
   try {
        await axios.delete(`/v1/products/${id}`);
        dispatch({
            type: DELETE_PRODUCT,
            payload: id
        });

      return 200;

   } catch (error) {
      console.error(error);
      return 500;
   }
}



// Set SortBy state
export const setSortBy = (val) => async dispatch => {
   dispatch({
      type: SET_SORTBY,
      payload : val
   });
}

// Set SortBy state
export const setPageNumber = (num) => async dispatch => {
   dispatch({
      type: PAGE_NUMBER,
      payload: Number(num)
   });
}