import { combineReducers } from 'redux';
import admins from './admins';
import products from './products';
import categories from './categories';
import subcategories from './subcategories';
import brands from './brands';
import stores from './stores';

export default combineReducers({
   admins,
   products,
   categories,
   subcategories,
   brands,
   stores
})