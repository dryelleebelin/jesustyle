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

export default function Header() {
  const navigate = useNavigate() // Utilizando useNavigate para navegação programática
  const [isOpenModalLogin, setIsOpenModalLogin] = useState(false)
  const [userType, setUserType] = useState(null)
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

  useEffect(() => {
    const storedCredentials = localStorage.getItem('@jesustyle')

    if (storedCredentials) {
      try {
        const credentials = JSON.parse(storedCredentials)
        
        if (credentials.length === 2) {
          if (credentials[0] === 'client' && credentials[1] === 'client') {
            setUserType('client')
          } else if (credentials[0] === 'adm' && credentials[1] === 'adm') {
            setUserType('adm')
          }
        }
      } catch (error) {
        console.error("Error parsing credentials from localStorage", error)
      }
    } else {
      setUserType(null)
    }
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleLogout = () => {
    localStorage.removeItem('@jesustyle')
    setUserType(null)
    navigate('/') // Utilizando navigate para redirecionamento
    scrollToTop()
  }

  return (
    <header className="header">
      <div className="container-logo">
        <Link to={`/`}><img src={logo} onClick={scrollToTop} alt="Logo" /></Link>
        <Link to={`/products`} onClick={scrollToTop}>Loja</Link>
      </div>
      <div className="input">
        <input type="text" placeholder="Procurar produtos" />
        <IoSearch />
      </div>
      <nav>
        <Cart />
        {(userType === 'client' || userType === null) && (
          <button type="button" className="btn-login" onClick={handleOpenModalLogin}>
            Compre aqui <BsArrowRight />
          </button>
        )}
        {userType === 'adm' && (
          <p ref={notificationsRef}>
            Usuário <IoIosArrowDown />
          </p>
        )}
      </nav>

      <div ref={dropdownRef} className="dropdown_wrapper hide dropdown_wrapper--fade-in none">
        <div className="content">
          <Link className="mobile-only" to={`/products`}><button type="button" onClick={scrollToTop}>Loja <BsShop /></button></Link>
          <Link to={`/account`}><button type="button" onClick={scrollToTop}>Conta <IoPersonOutline /></button></Link>
          <button type="button" onClick={handleLogout}>Sair <IoIosLogOut/></button>
        </div>
      </div>

      {isOpenModalLogin && (
        <Login isOpen={isOpenModalLogin} closeModal={handleCloseModal} />
      )}
    </header>
  )
}
