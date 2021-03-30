import {
    GET_SUBCATEGORIES,
    SET_LOADING_SUBCATEGORIES,
    CREATE_SUBCATEGORIE,
    DELETE_SUBCATEGORIE,
    GET_CURRENT_SUBCATEGORIE,
    UPDATE_SUBCATEGORIE,
    SET_SUB_IMAGE
 } from '../actions/types';
 
 
 const initialState = {
    subcategories: [],
    current_subcategorie : null,
    loading : false
 }
 
 export default function subcategoriesReducer(state = initialState, action) {
   const { type, payload } = action;

   switch (type) {
      case SET_LOADING_SUBCATEGORIES:
         return {
            ...state,
            loading: true
         }
      case GET_SUBCATEGORIES:
         return {
            ...state,
            subcategories: payload,
            loading : false
         }
      case GET_CURRENT_SUBCATEGORIE:
            return {
               ...state,
               current_subcategorie: payload,
               loading : false
            }
      case CREATE_SUBCATEGORIE:
         return {
            ...state,
            subcategories: [
               ...state.subcategories,
               payload
            ],
            loading : false
         }
      case UPDATE_SUBCATEGORIE:
         let index = state.subcategories.findIndex((subcategorie) => {
            return subcategorie.subcategorie_id === payload.subcategorie_id
         });
         let catArr = state.subcategories
         catArr[index] = payload;
         return {
            ...state,
            subcategories : catArr,
            loading: false
            };
      case SET_SUB_IMAGE:
         let i = state.subcategories.findIndex((subcategorie) => {
            return subcategorie.subcategorie_id === payload.id
         });
         let newArr = state.subcategories
         newArr[i].subcategorie_image = payload.image;
         return {
            ...state,
            subcategories : newArr,
            loading: false
            };
      case DELETE_SUBCATEGORIE:
         return {
            ...state,
            subcategories: state.subcategories.filter((subcategorie) => {
               return subcategorie.subcategorie_id !== payload
            }),
            loading: false
            };
      default:
         return state;
      }
 }