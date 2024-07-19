import React from "react"
import { BrowserRouter } from 'react-router-dom'
import RoutesApp from './routes/routes'

import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
import './global.scss'

export default function App(){
  return(
    <BrowserRouter>
      <ToastContainer autoClose={3000} toastClassName="custom-toast-container"/>
      <RoutesApp/>
    </BrowserRouter>
  )
}