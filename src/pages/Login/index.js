import React, { useState } from "react"
import './login.scss'
import Modal from 'react-modal'
import { IoClose } from "react-icons/io5"
import { CgSpinner } from "react-icons/cg"

export default function Login({ isOpen, closeModal }) {
  const [user, setUser] = useState('')
  const [birthday, setBirthday] = useState('')
  const [CPF, setCPF] = useState('')
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
    setIsRegistering(true);
  }

  return (
    <Modal style={customStyles} isOpen={isOpen} onRequestClose={closeModal}>
      {isRegistering ? (
        <div className="register">
          <div>
            <p>Cadastre-se</p>
            <IoClose onClick={closeModal}/>
          </div>
          <form>
            <label>Nome completo:</label>
            <input type="text" onChange={(e) => setUser(e.target.value)} placeholder="Digite seu nome completo"/>
            <label>Data de nascimento:</label>
            <input type="date" onChange={(e) => setBirthday(e.target.value)}/>
            <label>CPF:</label>
            <input type="text" onChange={(e) => setCPF(e.target.value)} placeholder="Digite seu CPF"/>
            <label>Email:</label>
            <input type="email" onChange={(e) => setEmail(e.target.value)} placeholder="example@gmail.com"/>
            <label>Senha:</label>
            <input type="password" onChange={(e) => setPassword(e.target.value)} placeholder="********"/>
            <button type="submit">
              {loading ? <div className="spinner-button"><CgSpinner/></div> : "CADASTRAR"}
            </button>
            <a className="link">Já possui uma conta? <span onClick={() => setIsRegistering(false)}>Login</span></a>
          </form>
        </div>
      ) : (
        <div className="login">
          <div>
            <p>Login</p>
            <IoClose onClick={closeModal}/>
          </div>
          <form>
            <label>Email:</label>
            <input type="email" onChange={(e) => setEmail(e.target.value)} placeholder="example@gmail.com"/>
            <label>Senha:</label>
            <input type="password" onChange={(e) => setPassword(e.target.value)} placeholder="********"/>
            <a>Esqueceu a senha?</a>
            <button type="submit">
              {loading ? <div className="spinner-button"><CgSpinner/></div> : "ENTRAR"}
            </button>
            <a className="link">Ainda não possui uma conta? <span onClick={handleRegisterClick}>Cadastre-se</span></a>
          </form>
        </div>
      )}
    </Modal>
  )
}
