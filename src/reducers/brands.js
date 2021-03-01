import {
    GET_BRANDS,
    SET_LOADING_BRANDS,
    CREATE_BRAND,
    SET_BRN_IMAGE,
    DELETE_BRAND,
    GET_CURRENT_BRAND,
    UPDATE_BRAND
 } from '../actions/types';
 
 
 const initialState = {
    brands: [],
    current_brand : null,
    loading : false
 }
 
 export default function brandsReducer(state = initialState, action) {
   const { type, payload } = action;

   switch (type) {
      case SET_LOADING_BRANDS:
         return {
            ...state,
            loading: true
         }
      case GET_BRANDS:
         return {
            ...state,
            brands: payload,
            loading : false
         }
      case GET_CURRENT_BRAND:
            return {
               ...state,
               current_brand: payload,
               loading : false
            }
      case CREATE_BRAND:
         return {
            ...state,
            brands: [
               ...state.brands,
               payload
            ],
            loading : false
         }
      case UPDATE_BRAND:
         let index = state.brands.findIndex((brand) => {
            return brand.brand_id === payload.brand_id
         });
         let catArr = state.brands
         catArr[index] = payload;
         return {
            ...state,
            brands : catArr,
            loading: false
            };
      case SET_BRN_IMAGE:
         let i = state.brands.findIndex((brand) => {
            return brand.brand_id === payload.id
         });
         let newArr = state.brands
         newArr[i].brand_image = payload.image;
         return {
            ...state,
            brands : newArr,
            loading: false
            };
      case DELETE_BRAND:
         return {
            ...state,
            brands: state.brands.filter((brand) => {
               return brand.brand_id !== payload
            }),
            loading: false
            };
      default:
         return state;
      }
 }