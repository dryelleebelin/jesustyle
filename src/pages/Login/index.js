import React, { useState } from "react"
import './login.scss'
import Modal from 'react-modal'
import { useNavigate } from "react-router-dom"
import { Spinner } from '@chakra-ui/react'

import { IoClose } from "react-icons/io5"
import { CgSpinner } from "react-icons/cg"

export default function Login({ isOpen, closeModal }){
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [birthday, setBirthday] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [forgotPassword, setForgotPassword] = useState(false)
  const [isRegistering, setIsRegistering] = useState(false)

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

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function handleLogin(){
    if (email === '' || password === ''){
      alert("Por favor preencha todos os campos")
      return
    }

    setLoading(true)
    navigate('/products')
    scrollToTop()
    setLoading(false)
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
            <input type="password" onChange={(e) => setPassword(e.target.value)} placeholder="********"/>
            <button type="button">
              {loading ? <div className="spinner-button"><CgSpinner/></div> : "CADASTRAR"}
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
                  {loading ? <div className="spinner-button"><CgSpinner/></div> : "ENVIAR"}
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
                <input type="password" onChange={(e) => setPassword(e.target.value)} placeholder="********"/>
                <a onClick={handleForgotPasswordClick}>Esqueceu a senha?</a>
                <button type="button" onClick={handleLogin}>
                  {loading ? <Spinner className="spinner-button" speed='0.70s'/> : "ENTRAR"}
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
