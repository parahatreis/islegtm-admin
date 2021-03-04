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
// Brands
import Brands from './pages/Brands';
import AddBrand from './components/brands/AddBrand'
import EditBrand from './components/brands/EditBrand'
// Stores
import Stores from './pages/Stores';
import AddStore from './components/stores/AddStore'
import EditStore from './components/stores/EditStore'
// Stores
import StoreAdmins from './pages/StoreAdmins';
import AddStoreAdmin from './components/store-admins/AddStoreAdmin'
import EditStoreAdmin from './components/store-admins/EditStoreAdmin'


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
    {
      key: "add-subcategorie",
      path: "/subcategories/add-subcategorie",
      component: AddSubCategorie,
      exact: true
    },
    {
      key: "edit-subcategorie",
      path: "/subcategories/edit-subcategorie/:id",
      component: EditSubCategorie,
      exact: true
    },
    // Brands
    {
      key: "brands",
      path: "/brands",
      component: Brands,
      exact: true
    },
    {
      key: "add-brand",
      path: "/brands/add-brand",
      component: AddBrand,
      exact: true
    },
    {
      key: "edit-brand",
      path: "/brands/edit-brand/:id",
      component: EditBrand,
      exact: true
    },
    // Stores
    {
      key: "stores",
      path: "/stores",
      component: Stores,
      exact: true
    },
    {
      key: "add-store",
      path: "/stores/add-store",
      component: AddStore,
      exact: true
    },
    {
      key: "edit-store",
      path: "/stores/edit-store/:id",
      component: EditStore,
      exact: true
    },
    // Store Admins
    {
      key: "store-admins",
      path: "/store-admins",
      component: StoreAdmins,
      exact: true
    },
    {
      key: "add-store-admin",
      path: "/store-admins/add-store-admin",
      component: AddStoreAdmin,
      exact: true
    },
    {
      key: "edit-store-admin",
      path: "/store-admins/edit-store-admin/:id",
      component: EditStoreAdmin,
      exact: true
    }
 ];


const Routing = () => {

   const privateArray = [
    //  product
      "/", "/products", "/products/add-product",
      // categories
      "/categories" , "/categories/add-categorie","/categories/edit-categorie/:id",
      // subcatrgories
      "/subcategories" , 
      "/subcategories/add-subcategorie","/subcategories/edit-subcategorie/:id",
      // brands
      "/brands" , 
      "/brands/add-brand","/brands/edit-brand/:id",
      // stores
      "/stores" , 
      "/stores/add-store","/stores/edit-store/:id",
      // stores
      "/store-admins" , 
      "/store-admins/add-store-admin","/store-admins/edit-store-admin/:id"
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
