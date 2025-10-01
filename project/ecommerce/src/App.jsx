import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from './User/Login'
import ProductList from './User/ProductList'
import Payment from './User/Payment'
import Signup from './User/Signup'
import Profile from './User/Profile'
import { Route, Routes } from 'react-router-dom'
import CartPage from './User/CartPage'
import ViewOrders from './adminNavBar/ViewOrders'
import AddProduct from './adminNavBar/AddProduct'
import ViewProducts from './adminNavBar/ViewProducts'
import ViewUsers from './adminNavBar/ViewUsers'
import Edit from './adminNavBar/Edit'
import Order from './User/Order'


function App() {


  return (
    <>
    
    <Routes>
    <Route  path='/lg' element={<Login/>}/>
    <Route  path='/od' element={<Order/>}/>
     <Route  path='/ct' element={<CartPage/>}/>
     <Route  path='/py' element={<Payment/>}/>
     <Route  path='/' element={<ProductList/>}/>
     <Route  path='/pr' element={<Profile/>}/>
     <Route  path='/sg' element={<Signup/>}/>
      <Route  path='/ap' element={<AddProduct/>}/>
       <Route  path='/vo' element={<ViewOrders/>}/>
        <Route  path='/vp' element={<ViewProducts/>}/>
         <Route  path='/vu' element={<ViewUsers/>}/>
         <Route  path='/admin' element={<AddProduct/>}/>
         <Route  path='/edit/:id' element={<Edit/>}/>
          
      </Routes>
    </>
  )
}

export default App
