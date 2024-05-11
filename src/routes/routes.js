import React from "react"
import { Routes, Route } from 'react-router-dom'

import Home from "../pages/Home"
import AllProducts from "../pages/AllProducts"
import ProductDetails from "../pages/ProductDetails"

export default function RoutesApp(){
  return(
    <Routes>
      <Route exact path="/" element={<Home/>}/>
      <Route path="/products" element={<AllProducts/>}/>
      <Route path="/product/:productId" element={<ProductDetails/>} />
    </Routes>
  )
}