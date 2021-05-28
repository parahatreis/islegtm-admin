import {
   GET_USERS,
   SET_LOADING_USERS
} from '../actions/types';


const initialState = {
   users: [],
   loading : false
}

export default function usersReducer(state = initialState, action) {
   const { type, payload } = action;

   switch (type) {
      case SET_LOADING_USERS:
         return {
            ...state,
            loading: true
         }
      case GET_USERS:
         return {
            ...state,
            users: payload,
            loading : false
         }
      default:
         return state;
   }
}