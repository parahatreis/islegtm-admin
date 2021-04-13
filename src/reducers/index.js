import { combineReducers } from 'redux';
import admins from './admins';
import products from './products';
import categories from './categories';
import subcategories from './subcategories';
import brands from './brands';
import stores from './stores';
import store_admins from './store_admins';
import banners from './banners';
import home from './home';
import sizes from './sizes';
import orders from './orders';

export default combineReducers({
   admins,
   products,
   categories,
   subcategories,
   brands,
   stores,
   store_admins,
   banners,
   home,
   sizes,
   orders
})