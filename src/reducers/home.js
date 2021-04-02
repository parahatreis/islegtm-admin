import {
    GET_HOME_SUBCATEGORIES,
    SET_LOADING_HOME_SUBCATEGORIES,
    CREATE_HOME_SUBCATEGORIES,
    DELETE_HOME_SUBCATEGORIES,
    UPDATE_HOME_SUBCATEGORIE
  } from '../actions/types';
  
  
  const initialState = {
     home_subcategories: [],
     current_home_subcategorie : null,
     loading : false
  }
  
  export default function homeSubcategoriesReducer(state = initialState, action) {
    const { type, payload } = action;
 
    switch (type) {
       case SET_LOADING_HOME_SUBCATEGORIES:
          return {
             ...state,
             loading: true
          }
       case GET_HOME_SUBCATEGORIES:
          return {
             ...state,
             home_subcategories: payload,
             loading : false
          }
       case CREATE_HOME_SUBCATEGORIES:
          return {
             ...state,
             home_subcategories: [
                ...state.home_subcategories,
                payload
             ],
             loading : false
          }
       case UPDATE_HOME_SUBCATEGORIE:
          let index = state.home_subcategories.findIndex((home_subcategorie) => {
             return home_subcategorie.home_subcategorie_id === payload.home_subcategorie_id
          });
          let catArr = state.home_subcategories
          catArr[index] = payload;
          return {
             ...state,
             home_subcategories : catArr,
             loading: false
             };
       case DELETE_HOME_SUBCATEGORIES:
          return {
             ...state,
             home_subcategories: state.home_subcategories.filter((home_subcategorie) => {
                return home_subcategorie.home_subcategorie_id !== payload
             }),
             loading: false
             };
       default:
          return state;
       }
  }