import React, {useEffect} from 'react';
import axios from 'axios'
// 
import './styles/style.scss';
import Routing from './router/routing'
// State
import { Provider } from 'react-redux';
import store from './store';
import { loadAdmin, logout } from './actions/adminsAction';
import setAuthToken from './utils/setAuthToken'; 
import Alerts from './components/layouts/Alerts'
import apiPath from './utils/apiPath'


const App = () => {

  useEffect(() => {
    
    axios.defaults.baseURL = apiPath();
    axios.defaults.headers.common['Authorization'] = 'AUTH TOKEN';
    axios.defaults.headers.post['Content-Type'] = 'application/json';

    // check for token in LS
    if (localStorage.adminToken) {
      setAuthToken(localStorage.adminToken);
    }    
    store.dispatch(loadAdmin());

    // log user out from all tabs if they log out in one tab
    window.addEventListener('storage', () => {
      if (!localStorage.adminToken) store.dispatch(logout());
    });
  }, []);

  return (
   <Provider store={store} >
      <Alerts />
      <Routing />
   </Provider>
  )
}

export default App;
