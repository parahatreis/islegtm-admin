import {
    GET_CATEGORIES,
    SET_LOADING_CATEGORIES,
    CREATE_CATEGORIE,
    DELETE_CATEGORIE,
    GET_CURRENT_CATEGORIE,
    UPDATE_CATEGORIE
 } from '../actions/types';
 
 
 const initialState = {
    categories: [],
    current_categorie : {},
    loading : false
 }
 
 export default function categoriesReducer(state = initialState, action) {
    const { type, payload } = action;
 
    switch (type) {
      case SET_LOADING_CATEGORIES:
         return {
            ...state,
            loading: true
         }
      case GET_CATEGORIES:
         return {
            ...state,
            categories: payload,
            loading : false
         }
      case GET_CURRENT_CATEGORIE:
            return {
               ...state,
               current_categorie: payload,
               loading : false
            }
      case CREATE_CATEGORIE:
         return {
            ...state,
            categories: [
               ...state.categories,
               payload
            ],
            loading : false
         }
         case UPDATE_CATEGORIE:
            state.categories.forEach((categorie) => {
               if(categorie.categorie_id === payload.categorie_id){
                  categorie.categorie_name = payload.categorie_name;
                  console.log(payload.categorie_image)
                  categorie.categorie_image = payload.categorie_image;
               }
            })
            return {
               ...state,
               loading: false
             };
         case DELETE_CATEGORIE:
            return {
               ...state,
               categories: state.categories.filter((categorie) => {
                  return categorie.categorie_id !== payload
               }),
               loading: false
             };
      default:
         return state;
      }
 }