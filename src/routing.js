import React from 'react'
import { BrowserRouter as Router, Route, Switch ,Redirect} from 'react-router-dom';
// components
import Register from './pages/Register'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import SideBar from './components/layouts/Sidebar'
// products
import Products from './pages/Products'
import AddProduct from './components/products/AddProduct'
// categories
import Categories from './pages/Categories';
import AddCategorie from './components/categories/AddCategorie'
import EditCategorie from './components/categories/EditCategorie'
// subcategories
import SubCategories from './pages/SubCategories';
import AddSubCategorie from './components/subcategories/AddSubCategorie'
import EditSubCategorie from './components/subcategories/EditSubCategorie'


const publicRoutes = [
   {
     key: "login",
     path: "/login",
     component: Login,
     exact: true
   },
   {
     key: "signup",
     path: "/signup",
     component: Register,
     exact: true
   },
 ];
 
 const privateRoutes = [
   {
     key: "home",
     path: "/",
     component: Dashboard,
     exact: true
   },
   {
     key: "products",
     path: "/products",
     component: Products,
     exact: true
   },
   {
     key: "add-product",
     path: "/products/add-product",
     component: AddProduct,
     exact: true
   },
  //  categories
   {
      key: "categories",
      path: "/categories",
      component: Categories,
      exact: true
    },
    {
      key: "add-categorie",
      path: "/categories/add-categorie",
      component: AddCategorie,
      exact: true
    },
    {
      key: "edit-categorie",
      path: "/categories/edit-categorie/:id",
      component: EditCategorie,
      exact: true
    },
    // Subca
    {
      key: "subcategories",
      path: "/subcategories",
      component: SubCategories,
      exact: true
    },
    // {
    //   key: "add-subcategorie",
    //   path: "/subcategories/add-subcategorie",
    //   component: AddSubCategorie,
    //   exact: true
    // },
    // {
    //   key: "edit-subcategorie",
    //   path: "/subcategories/edit-subcategorie/:id",
    //   component: EditSubCategorie,
    //   exact: true
    // }
 ];


const Routing = () => {

   const privateArray = [
    //  product
      "/", "/products", "/products/add-product",
      // categories
      "/categories" , "/categories/add-categorie","/categories/edit-categorie/:id",
      // subcatrgories
      "/subcategories" , 
      // "/subcategories/add-subcategorie","/subcategories/edit-subcategorie/:id"
   ]

   return (
      <Router>
          <Switch>
            <Route exact path={privateArray}>
               <main>
                  <SideBar />
                  <Switch>
                     <div className="inside-main">
                     {privateRoutes.map(privateRouteProps => (
                        <Route {...privateRouteProps} />
                     ))}
                     </div>
                  </Switch>
                </main>
            </Route>

            <Route exact path={["/login", "/signup"]}>
              {/* <LayoutAnonymous> */}
              <h1>
                <Switch>
                  {publicRoutes.map(publicRouteProps => (
                    <Route {...publicRouteProps} />
                  ))}
                </Switch>
                </h1>
              {/* </LayoutAnonymous> */}
            </Route>

            <Route path="*">
              {/* <LayoutAnonymous> */}
                <Switch>
                  <Route render={() => <p>Not found</p>} />
                </Switch>
              {/* </LayoutAnonymous> */}
            </Route>
          </Switch>
        </Router>
   )
}

export default Routing
