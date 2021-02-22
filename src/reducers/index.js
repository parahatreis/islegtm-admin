import { combineReducers } from 'redux';
import admins from './admins';
import products from './products';
import categories from './categories';

export default combineReducers({
   admins,
   products,
   categories
})