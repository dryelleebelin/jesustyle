import React from "react"
import './footer.scss'

import whiteLogo from '../../assets/logos/white.png'

import { FaInstagram, FaYoutube, FaSpotify } from "react-icons/fa"
import { IoMdMail } from "react-icons/io"

export default function Footer(){
  return(
    <footer className="footer">
      <div className="footer-content">
        <img src={whiteLogo}/>
        <p>© 2024 Jesustyle. Todos os direitos reservados.</p>
        <div className="footer-links">
          <a href="#">Termos de Serviço</a>
          <a href="#">Política de Privacidade</a>
        </div>
        <div className="socials">
          <a href="https://www.instagram.com/jesustyle.br/" target="_blank" rel="noopener noreferrer"><FaInstagram/></a>
          <a href="https://www.youtube.com/channel/UCcT7mMwhBDrGYOGB2cX59zQ" target="_blank" rel="noopener noreferrer"><FaYoutube/></a>
          {/* <a><FaSpotify/></a> */}
          <a href="mailto:contatojesustyle@gmail.com" target="_blank" rel="noopener noreferrer"><IoMdMail/></a>
        </div>
      </div>
    </footer>
  )
}