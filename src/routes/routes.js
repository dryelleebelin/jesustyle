import React from "react"
import { Routes, Route } from 'react-router-dom'

import Home from "../pages/Home"
import AllProducts from "../pages/AllProducts"

export default function RoutesApp(){
  return(
    <Routes>
      <Route exact path="/" element={<Home/>}/>
      <Route exact path="/products" element={<AllProducts/>}/>
    </Routes>
  )
}