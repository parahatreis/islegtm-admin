import { combineReducers } from 'redux';
import admins from './admins';
import products from './products';
import categories from './categories';
import subcategories from './subcategories';

export default combineReducers({
   admins,
   products,
   categories,
   subcategories
})