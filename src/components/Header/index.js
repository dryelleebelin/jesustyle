import React, { useState, useRef, useEffect } from "react"
import './header.scss'
import { Link, useNavigate } from "react-router-dom"

import Login from '../../pages/Login'
import Cart from '../Cart'

import logo from '../../assets/logos/transparent.png'

import { IoSearch, IoPersonOutline } from "react-icons/io5"
import { BsShop } from "react-icons/bs"
import { BsArrowRight } from "react-icons/bs"
import { IoIosArrowDown, IoIosLogOut } from "react-icons/io"

export default function Header({ onSearch }) {
  const navigate = useNavigate()
  
  const [isOpenModalLogin, setIsOpenModalLogin] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const notificationsRef = useRef(null)
  const dropdownRef = useRef(null)

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
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

    if (notifications) {
      document.addEventListener('click', handleClickOutside)
      notifications.addEventListener('click', handleNotificationsClick)
    }

    return () => {
      if (notifications) {
        document.removeEventListener('click', handleClickOutside)
        notifications.removeEventListener('click', handleNotificationsClick)
      }
    }
  }, [notificationsRef.current, dropdownRef.current])

  async function handleLogout(){
    try{

    } catch(error){
      
    }
  }

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value)
    onSearch(event.target.value)
  }

  return (
    <header className="header">
      <div className="container-logo">
        <Link to={`/`}><img src={logo} onClick={scrollToTop} alt="Logo" /></Link>
        <Link to={`/products`} onClick={scrollToTop}>Loja</Link>
      </div>
      <div className="input">
        <input type="text" placeholder="Procurar produtos" value={searchTerm} onChange={handleSearchChange}/>
        <IoSearch/>
      </div>
      <nav>
        <Cart/>
        <button type="button" className="btn-login" onClick={() => {setIsOpenModalLogin(true)}}>Compre aqui <BsArrowRight /></button>
        <p ref={notificationsRef}>Usuário <IoIosArrowDown/></p>
      </nav>

      <div ref={dropdownRef} className="dropdown_wrapper hide dropdown_wrapper--fade-in none">
        <div className="content">
          <Link className="mobile-only" to={`/products`}><button type="button" onClick={scrollToTop}>Loja <BsShop /></button></Link>
          <Link to={`/account`}><button type="button" onClick={scrollToTop}>Conta <IoPersonOutline /></button></Link>
          <button type="button" onClick={handleLogout}>Sair <IoIosLogOut/></button>
        </div>
      </div>

      {isOpenModalLogin && ( <Login isOpen={isOpenModalLogin} closeModal={() => {setIsOpenModalLogin(false)}} /> )}
    </header>
  )
}