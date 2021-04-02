import {
   GET_BANNERS,
   SET_LOADING_BANNERS,
   DELETE_BANNER,
   GET_CURRENT_BANNER
 } from '../actions/types';
 
 
 const initialState = {
    banners: [],
    current_banner : {},
    loading : false
 }
 
 export default function bannersReducer(state = initialState, action) {
    const { type, payload } = action;
 
    switch (type) {
      case SET_LOADING_BANNERS:
         return {
            ...state,
            loading: true
         }
      case GET_BANNERS:
         return {
            ...state,
            banners: payload,
            loading : false
         }
      case GET_CURRENT_BANNER:
         return {
            ...state,
            current_banner: payload,
            loading : false
         }
      case DELETE_BANNER:
         return {
            ...state,
            banners: state.banners.filter((banner) => {
               return banner.banner_id !== payload
            }),
            loading: false
         };
      default:
         return state;
      }
 }