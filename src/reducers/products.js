import {
   GET_PRODUCTS,
   COUNT_PRODUCTS,
   SET_LOADING_PRODUCTS,
   SET_SORTBY,
   PAGE_NUMBER,
   DELETE_PRODUCT
} from '../actions/types';


const initialState = {
   products: [],
   count_products: null,
   sortBy: null,
   page_number: 0,
   loading: false,
}

export default function productsReducer(state = initialState, action) {
   const { type, payload } = action;

   switch (type) {
      case SET_LOADING_PRODUCTS:
         return {
            ...state,
            loading: true
         }
      case GET_PRODUCTS:
         return {
            ...state,
            products : payload,
            loading: false
         }
      case COUNT_PRODUCTS:
         return {
            ...state,
            count_products: payload,
         }
      case SET_SORTBY:
         return {
            ...state,
            sortBy: payload,
         }
      case PAGE_NUMBER:
         return {
            ...state,
            page_number: payload,
         };
      case DELETE_PRODUCT:
         return {
            ...state,
            products: state.products.filter((product) => {
               return product.product_id !== payload
            }),
            loading: false
          };
      default:
         return state;
   }
}