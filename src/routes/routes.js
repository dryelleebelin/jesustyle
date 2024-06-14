import React from "react"
import { Routes, Route } from 'react-router-dom'

import Home from "../pages/Home"
import AllProducts from "../pages/AllProducts"
import ProductDetails from "../pages/ProductDetails"
import Payment from "../pages/Payment"
import Account from "../pages/Account"

import Private from "./private"

export default function RoutesApp(){
  return(
    <Routes>
      <Route path="*" element={<Home/>}/>
      <Route exact path="/" element={<Home/>}/>

      <Route path="/products" element={<AllProducts/>}/>
      <Route path="/product/:productId" element={<ProductDetails/>}/>
      
      <Route path="/payment" element={<Private><Payment/></Private>}/>
      <Route path="/account" element={<Private><Account/></Private>}/>
    </Routes>
  )
}