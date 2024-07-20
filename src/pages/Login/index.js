import React, { useState, useEffect } from "react"
import './login.scss'
import { useNavigate } from "react-router-dom"
import { Spinner } from '@chakra-ui/react'
import { toast } from 'react-toastify'
import axios from 'axios'

import Modal from 'react-modal'

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
  const [resetPasswordSuccess, setResetPasswordSuccess] = useState(false)

  const customStyles = {
    content: {
      top: '50%',
      bottom: 'auto',
      left: '50%',
      right: 'auto',
      padding: '0',
      backgroundColor: 'transparent',
      transform: 'translate(-50%, -50%)',
      zIndex: 9
    }
  }  

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return regex.test(email)
  }

  async function handleLogin(){
    if (email === '' || password === ''){
      toast.warning("Por favor preencha todos os campos.")
      return
    }

    try{
      setLoadingButton(true)

      navigate('/products')
      scrollToTop()
      closeModal()

    } catch(error){
      toast.error("Erro ao fazer login. Verifique suas credenciais.")

    } finally{
      setLoadingButton(false)
    }
  }

  async function handleRegister(){
    if (username === '' || birthday === '' || email === '' || password === ''){
      toast.warning("Por favor preencha todos os campos.")
      return
    }

    if (!validateEmail(email)) {
      toast.warning("Por favor insira um email válido.")
      return
    }

    try{
      setLoadingButton(true)

      navigate('/products')
      scrollToTop()
      closeModal()

    } catch(error){
      toast.error("Erro ao fazer cadastro. Tente novamente.")

    } finally{
      setLoadingButton(false)
    }
  }

  async function handleForgotPassword(){
    if (email === '') {
      toast.warning("Por favor preencha o campo de email.")
      return
    }

    if (!validateEmail(email)) {
      toast.warning("Por favor insira um email válido.")
      return
    }

    try{
      setLoadingButton(true)

      setResetPasswordSuccess(true)

    } catch(error){
      toast.error("Erro ao enviar email de recuperação. Tente novamente.")

    } finally {
      setLoadingButton(false)
    }
  }

  useEffect(() => {
    return () => {
      setResetPasswordSuccess(false)
    }
  }, [])

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
              <span onClick={() => {setShowPassword(!showPassword)}}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            <button type="button" onClick={handleRegister}>
              {loadingButton ? <Spinner className="spinner-button" speed='0.70s'/> : "CADASTRAR"}
            </button>
            <a className="link">Já possui uma conta? <span onClick={() => setIsRegistering(false)}>Entrar</span></a>
          </form>
        </div>
      ) : (
        <>
          {forgotPassword ? (
            <>
              {resetPasswordSuccess ? (
                <div className="forgot-password-success forgot-password login">
                  <div>
                    <p></p>
                    <IoClose onClick={closeModal}/>
                  </div>
                  <h2>O email de recuperação foi enviado com sucesso!</h2>
                  <p>Verifique sua caixa de entrada para encontrar as instruções necessárias.</p>
                </div>
              ) : (
                <div className="forgot-password login">
                  <div>
                    <p>Redefinir senha</p>
                    <IoClose onClick={closeModal}/>
                  </div>
                  <p>Nos conte algumas informações sobre sua conta.</p>
                  <form onSubmit={(e) => e.preventDefault()}>
                    <label>Email:</label>
                    <input type="email" onChange={(e) => setEmail(e.target.value)} placeholder="Digite seu email"/>
                    <button type="button" onClick={handleForgotPassword}>
                      {loadingButton ? <Spinner className="spinner-button" speed='0.70s'/> : "ENVIAR"}
                    </button>
                    <a className="link" onClick={() => {setForgotPassword(false)}}>Voltar para acessar conta</a>
                  </form>
                </div>
              )}
            </>
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
                  <span onClick={() => {setShowPassword(!showPassword)}}>
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
                <a onClick={() => {setForgotPassword(true)}}>Esqueceu a senha?</a>
                <button type="button" onClick={handleLogin}>
                  {loadingButton ? <Spinner className="spinner-button" speed='0.70s'/> : "ENTRAR"}
                </button>
                <a className="link">Ainda não possui uma conta? <span onClick={() => {setIsRegistering(true)}}>Cadastre-se</span></a>
              </form>
            </div>
          )}
        </>
      )}
    </Modal>
  )
}
