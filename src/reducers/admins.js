/* eslint-disable default-case */
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    ADMIN_LOADED,
    AUTH_ERROR,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    LOGOUT,
    SET_LOADING_AUTH
 } from '../actions/types';
 
 const initialState = {
    token: localStorage.getItem('adminToken'),
    isAuthenticated: null,
    loading: false,
    admin : null
 };
 
 export default function adminsReducer(state = initialState, action) {
 
    const {
       type,
       payload
    } = action;
 
    switch (type) {
 
       case ADMIN_LOADED:
          return {
             ...state,
             isAuthenticated: true,
             loading: false,
             admin : payload
          }
       case REGISTER_SUCCESS:
       case LOGIN_SUCCESS:
          localStorage.setItem('adminToken', payload.token);
          console.log(payload.token)
          return {
             ...state,
             ...payload,
             isAuthenticated: true,
             loading : false
          }
       case REGISTER_FAIL:
       case AUTH_ERROR:
       case LOGIN_FAIL:
       case LOGOUT:
          localStorage.removeItem('adminToken');
          return {
             ...state,
             token: null,
             admin : null,
             isAuthenticated: false,
             loading: false
          }
       case SET_LOADING_AUTH:
          return {
             ...state,
             loading : true
          }
       default:
          return state;
 
    }
 }
 