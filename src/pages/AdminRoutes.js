import React from 'react';
import { useLocation } from 'react-router-dom';
// 
import Dashboard from './Dashboard';
import Products from './Products';
import AddProduct from '../components/products/AddProduct';
import Categories from './Categories';
import AddCategorie from '../components/categories/AddCategorie';

const AdminPanel = () => {
   
   const location = useLocation();


   switch(location.pathname){
      case "/app":
         return (
            <Dashboard />
         )
      // products
      case "/app/products":
         return (
            <Products />
         )
      case "/app/products/add-product":
         return (
            <AddProduct />
         )
      // categories
      case "/app/categories":
         return (
            <Categories />
         )
      case "/app/categories/add-categorie":
         return (
            <AddCategorie />
         )
      // case "/app/categories/edit-categorie/:id":
      //    return (
      //       <AddCategorie />
      //    )
      default:
         return (
            <Dashboard />
         )
   }
}

export default AdminPanel
