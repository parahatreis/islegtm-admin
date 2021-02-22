import axios from 'axios';
import {
   GET_PRODUCTS,
   COUNT_PRODUCTS,
   SET_LOADING_PRODUCTS,
   PAGE_NUMBER,
   SET_SORTBY,
   DELETE_PRODUCT
} from './types';



// Get Products
export const getProducts = (page = 0, order = null ) => async dispatch => {

   let sortBy = 'createdAt:desc';

   if (order) sortBy = order

   
   dispatch({ type: SET_LOADING_PRODUCTS });
   try {
        const res = await axios.get(`/api/products`, {
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
      console.log(error)
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
//       const res = await axios.get(`/api/products/search`, {
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
//       console.log(error)
//    }
// }



// // Get Product By Id
// export const getProductById = (id) => async dispatch => {

//    dispatch({ type: SET_LOADING_PRODUCTS });


//    try {
//       const res = await axios.get(`/api/products/${id}`);

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
        await axios.delete(`/api/products/${id}`);
        dispatch({
            type: DELETE_PRODUCT,
            payload: id
        });

   } catch (error) {
      console.log(error)
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