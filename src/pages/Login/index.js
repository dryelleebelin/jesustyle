import React, { useState } from "react"
import './login.scss'
import Modal from 'react-modal'
import { useNavigate } from "react-router-dom"

import { IoClose } from "react-icons/io5"
import { CgSpinner } from "react-icons/cg"

export default function Login({ isOpen, closeModal }){
  const navigate = useNavigate()
  const [user, setUser] = useState('')
  const [birthday, setBirthday] = useState('')
  const [address, setAddress] = useState('')
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

  return (
    <Modal style={customStyles} isOpen={isOpen} onRequestClose={closeModal}>
      {isRegistering ? (
        <div className="register">
          <div>
            <p>Cadastre-se</p>
            <IoClose onClick={closeModal}/>
          </div>
          <form onSubmit={(e) => {e.preventDefault(); navigate('/products'); scrollToTop();}}>
            <label>Nome completo:</label>
            <input type="text" onChange={(e) => setUser(e.target.value)} placeholder="Digite seu nome completo"/>
            <label>Data de nascimento:</label>
            <input type="date" onChange={(e) => setBirthday(e.target.value)}/>
            <label>Email:</label>
            <input type="email" onChange={(e) => setEmail(e.target.value)} placeholder="Digite seu email"/>
            <label>Senha:</label>
            <input type="password" onChange={(e) => setPassword(e.target.value)} placeholder="********"/>
            <button type="submit">
              {loading ? <div className="spinner-button"><CgSpinner/></div> : "CADASTRAR"}
            </button>
            <a className="link">Já possui uma conta? <span onClick={() => setIsRegistering(false)}>Login</span></a>
          </form>
        </div>
      ) : (
        <>
          {forgotPassword ? (
            <div className="forgot-password login">
              <div>
                <p>Login</p>
                <IoClose onClick={closeModal}/>
              </div>
              <p>Nos conte algumas informações sobre sua conta.</p>
              <form onSubmit={(e) => {e.preventDefault(); closeModal();}}>
                <label>Email:</label>
                <input type="email" onChange={(e) => setEmail(e.target.value)} placeholder="Digite seu email"/>
                <button type="submit">
                  {loading ? <div className="spinner-button"><CgSpinner/></div> : "ENVIAR"}
                </button>
                <a className="link" onClick={handleBackToLoginClick}>Voltar para login</a>
              </form>
            </div>
          ) : (
            <div className="login">
              <div>
                <p>Login</p>
                <IoClose onClick={closeModal}/>
              </div>
              <form onSubmit={(e) => {e.preventDefault(); navigate('/products'); scrollToTop();}}>
                <label>Email:</label>
                <input type="email" onChange={(e) => setEmail(e.target.value)} placeholder="Digite seu email"/>
                <label>Senha:</label>
                <input type="password" onChange={(e) => setPassword(e.target.value)} placeholder="********"/>
                <a onClick={handleForgotPasswordClick}>Esqueceu a senha?</a>
                <button type="submit">
                  {loading ? <div className="spinner-button"><CgSpinner/></div> : "ENTRAR"}
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
