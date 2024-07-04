import React, { useState } from "react"
import './login.scss'
import Modal from 'react-modal'
import { useNavigate } from "react-router-dom"
import { Spinner } from '@chakra-ui/react'
import axios from 'axios'

import { IoClose } from "react-icons/io5"
import { FaEye, FaEyeSlash } from "react-icons/fa"

export default function Login({ isOpen, closeModal }){
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [birthday, setBirthday] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loadingButton, setLoadingButton] = useState(false)
  const [forgotPassword, setForgotPassword] = useState(false)
  const [isRegistering, setIsRegistering] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const customStyles = {
    content: {
      top: '50%',
      bottom: 'auto',
      left: '50%',
      right: 'auto',
      padding: '0',
      backgroundColor: 'transparent',
      transform: 'translate(-50%, -50%)'
    }
  }

  const handleRegisterClick = () => {
    setIsRegistering(true)
  }

  const handleForgotPasswordClick = () => {
    setForgotPassword(true)
  }

  const handleBackToLoginClick = () => {
    setForgotPassword(false)
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }  

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function handleLogin(){
    if (email === '' || password === ''){
      alert("Por favor preencha todos os campos")
      return
    }

    setLoadingButton(true)
    navigate('/products')
    scrollToTop()
    setLoadingButton(false)
  }

  return (
    <Modal style={customStyles} isOpen={isOpen} onRequestClose={closeModal}>
      {isRegistering ? (
        <div className="register">
          <div>
            <p>Cadastre-se</p>
            <IoClose onClick={closeModal}/>
          </div>
          <form onSubmit={(e) => e.preventDefault()}>
            <label>Nome completo:</label>
            <input type="text" onChange={(e) => setUsername(e.target.value)} placeholder="Digite seu nome completo"/>
            <label>Data de nascimento:</label>
            <input type="date" onChange={(e) => setBirthday(e.target.value)}/>
            <label>Email:</label>
            <input type="email" onChange={(e) => setEmail(e.target.value)} placeholder="Digite seu email"/>
            <label>Senha:</label>
            <div className="password-container">
              <input type={showPassword ? "text" : "password"} onChange={(e) => setPassword(e.target.value)} placeholder="********"/>
              <span onClick={togglePasswordVisibility}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            <button type="button">
              {loadingButton ? <Spinner className="spinner-button" speed='0.70s'/> : "CADASTRAR"}
            </button>
            <a className="link">Já possui uma conta? <span onClick={() => setIsRegistering(false)}>Entrar</span></a>
          </form>
        </div>
      ) : (
        <>
          {forgotPassword ? (
            <div className="forgot-password login">
              <div>
                <p>Redefinir senha</p>
                <IoClose onClick={closeModal}/>
              </div>
              <p>Nos conte algumas informações sobre sua conta.</p>
              <form onSubmit={(e) => {e.preventDefault(); closeModal();}}>
                <label>Email:</label>
                <input type="email" onChange={(e) => setEmail(e.target.value)} placeholder="Digite seu email"/>
                <button type="submit">
                  {loadingButton ? <Spinner className="spinner-button" speed='0.70s'/> : "ENVIAR"}
                </button>
                <a className="link" onClick={handleBackToLoginClick}>Voltar para acessar conta</a>
              </form>
            </div>
          ) : (
            <div className="login">
              <div>
                <p>Entrar</p>
                <IoClose onClick={closeModal}/>
              </div>
              <form onSubmit={(e) => e.preventDefault()}>
                <label>Email:</label>
                <input type="email" onChange={(e) => setEmail(e.target.value)} placeholder="Digite seu email"/>
                <label>Senha:</label>
                <div className="password-container">
                  <input type={showPassword ? "text" : "password"} onChange={(e) => setPassword(e.target.value)} placeholder="********"/>
                  <span onClick={togglePasswordVisibility}>
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
                <a onClick={handleForgotPasswordClick}>Esqueceu a senha?</a>
                <button type="button" onClick={handleLogin}>
                  {loadingButton ? <Spinner className="spinner-button" speed='0.70s'/> : "ENTRAR"}
                </button>
                <a className="link">Ainda não possui uma conta? <span onClick={handleRegisterClick}>Cadastre-se</span></a>
              </form>
            </div>
          )}
        </>
      )}
    </Modal>
  )
}
