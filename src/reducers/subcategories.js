import {
    GET_SUBCATEGORIES,
    SET_LOADING_SUBCATEGORIES,
    CREATE_SUBCATEGORIE,
    DELETE_SUBCATEGORIE,
    GET_CURRENT_SUBCATEGORIE,
    UPDATE_SUBCATEGORIE
 } from '../actions/types';
 
 
 const initialState = {
    subcategories: [],
    current_subcategorie : {},
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
               current_categorie: payload,
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
               return subcategorie.categorie_id === payload.categorie_id
            });
            let catArr = state.subcategories
            catArr[index] = payload;
            return {
               ...state,
               subcategories : catArr,
               loading: false
             };
         case DELETE_SUBCATEGORIE:
            return {
               ...state,
               subcategories: state.subcategories.filter((subcategorie) => {
                  return subcategorie.categorie_id !== payload
               }),
               loading: false
             };
      default:
         return state;
      }
 }