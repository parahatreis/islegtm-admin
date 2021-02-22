import React from 'react';
// 
import './styles/style.scss';
import Routing from './routing'
// State
import { Provider } from 'react-redux';
import store from './store';
// import { loadUser } from './actions/adminsAction';
// import setAuthToken from './utils/setAuthToken'; 



// if (localStorage.adminToken) {
//   setAuthToken(localStorage.adminToken);
// }


const App = () => {

//   useEffect(() => {
//     store.dispatch(loadUser());
//  }, []);

  return (
    <Provider store={store} >
        <Routing />
    </Provider>
  )
}

export default App;
