import React, { useState, useRef, useEffect } from "react"
import './header.scss'
import { Link } from "react-router-dom"

import Login from '../../pages/Login'
import Cart from '../Cart'

import logo from '../../assets/logos/transparent.png'

import { IoSearch, IoPersonOutline } from "react-icons/io5"
import { BsPersonCircle } from "react-icons/bs"
import { IoIosArrowDown, IoIosLogOut } from "react-icons/io"

export default function Header(){
  const [isOpenModalLogin, setIsOpenModalLogin] = useState(false)
  const notificationsRef = useRef(null)
  const dropdownRef = useRef(null)

  const handleOpenModalLogin = () => {
    setIsOpenModalLogin(true)
  }

  const handleCloseModal = () => {
    setIsOpenModalLogin(false)
  }

  useEffect(() => {
    const notifications = notificationsRef.current
    const dropdown = dropdownRef.current

    const handleClickOutside = (event) => {
      if (dropdown && !dropdown.contains(event.target) && notifications && !notifications.contains(event.target)) {
        dropdown.classList.add('hide')
        dropdown.classList.add('dropdown_wrapper--fade-in')
      }
    }

    const handleNotificationsClick = () => {
      if (dropdown) {
        dropdown.classList.remove('none')
        dropdown.classList.toggle('hide')
      }
    }

    document.addEventListener('click', handleClickOutside)
    notifications.addEventListener('click', handleNotificationsClick)

    return () => {
      document.removeEventListener('click', handleClickOutside)
      notifications.removeEventListener('click', handleNotificationsClick)
    }
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return(
    <header className="header">
      <div className="container-logo">
        <img src={logo}/>
        <Link to={`/products`} onClick={scrollToTop}>Loja</Link>
      </div>
      <div className="input">
        <input type="text" placeholder="Procurar produtos"/>
        <IoSearch/>
      </div>
      <nav>
        <Cart/>
        <button type="button" className="btn-login" onClick={handleOpenModalLogin}>Login</button>
        <p ref={notificationsRef}>Dryelle <BsPersonCircle className="avatar"/> <IoIosArrowDown/></p>
      </nav>

      <div ref={dropdownRef} className="dropdown_wrapper hide dropdown_wrapper--fade-in none">
        <div className="content">
          <Link><button type="button">Ver perfil <IoPersonOutline/></button></Link>
          <Link to={`/`}><button type="button" onClick={scrollToTop}>Sair <IoIosLogOut/></button></Link>
        </div>
      </div>

      {isOpenModalLogin && (
        <Login isOpen={isOpenModalLogin} closeModal={handleCloseModal}/>
      )}
    </header>
  )
}