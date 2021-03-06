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
   SET_PRODUCT_IMAGES,
   CHANGE_PRODUCT_STATUS
} from '../actions/types';


const initialState = {
   products: [],
   count_products: null,
   sortBy: null,
   page_number: 0,
   product_images : null,
   current_product : null,
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
      case CREATE_PRODUCT:
         return {
            ...state,
            products: [
               ...state.products,
               payload
            ],
            loading : false
         }
      case GET_CURRENT_PRODUCT:
         return {
            ...state,
            current_product: payload,
            loading : false
         }
      case UPDATE_PRODUCT:
         let index = state.products.findIndex((products) => {
            return products.product_id === payload.product_id
         });
         let catArr = state.products
         catArr[index] = payload;
         return {
            ...state,
            products : catArr,
            loading: false
            };
      case SET_PRODUCT_IMAGES:
         let i = state.products.findIndex((product) => {
            return product.product_id === payload.id
         });
         let newArr = state.products
         newArr[i].product_images = payload.images;
         return {
            ...state,
            products : newArr,
            loading: false
            };
      case CHANGE_PRODUCT_STATUS:
         let prIndex = state.products.findIndex((products) => {
            return products.product_id === payload.id
         });
         let changedArr = state.products;
         console.log(changedArr[prIndex])
         changedArr[prIndex].product_status = payload.status ;
         return {
            ...state,
            products : changedArr,
            loading: false
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