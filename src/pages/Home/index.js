import React from "react"
import './home.scss'

import transparentLogo from '../../images/logos/transparent.png'
import whiteLogo from '../../images/logos/white.png'
import wallpaper from '../../images/wallpaper.jpg'
import model1 from '../../images/mockups/person8.png'
import model2 from '../../images/mockups/shirt.png'
import model3 from '../../images/mockups/bag.png'
import model4 from '../../images/mockups/shirt1.png'

import { BsArrowRight } from "react-icons/bs"
import { FaInstagram, FaTiktok, FaFacebook, FaPinterest, FaYoutube } from "react-icons/fa"

export default function Home(){
  return(
    <div className="home">
      <header>
        <img src={transparentLogo} alt="Logo Jesustyle"/>
        <nav>
          <a href="#">Propósito</a>
          <a href="#">Ações</a>
          <a href="#">Podcast</a>
          <a href="#">Loja</a>

          <button>Login <BsArrowRight/></button>
        </nav>
      </header>

      <main>
        <img src={wallpaper} alt="Wallpaper"/>
      </main>

      
      <section className="purpose">

      </section>
      
      <section className="actions">

      </section>

      <section className="podcast">

      </section>

      <section className="store">
        <article className="box1">
          <div className="content">
            <p>Jesus te fez style</p>
            <span>collection 2024</span>
            <button>Comprar</button>
          </div>
          <div className="image">
            <img src={model2} alt="Model"/>
            <span>Nova coleção <BsArrowRight/></span>
          </div>
        </article>

        <article className="box2">
          <img src={model4} alt="Model"/>
          <img src={model3} alt="Model"/>
        </article>

        <article className="box3">
          <p>#AcoesComEsteLook <BsArrowRight/></p>
          <img src={model1} alt="Model"/>
        </article>
      </section>

      <footer>
        <section className="top">
          <img src={whiteLogo} alt="Logo Jesustyle"/>
          <div className="links-column">
            <h2>Navegação</h2>
            <a href="#">Propósito</a>
            <a href="#">Ações</a>
            <a href="#">Podcast</a>
            <a href="#">Loja</a>
          </div>
          <div className="links-column socials-column">
            <h2>Redes Sociais</h2>
            <p>Siga-me nas redes sociais para obter os mais recentes vídeos e postagens incríveis.</p>
            <div className="socials">
              <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer"><FaInstagram/></a>
              <a href="https://www.tiktok.com/" target="_blank" rel="noopener noreferrer"><FaTiktok/></a>
              <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer"><FaFacebook/></a>
              <a href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer"><FaYoutube/></a>
              <a href="https://www.pinterest.com/" target="_blank" rel="noopener noreferrer"><FaPinterest/></a>
            </div>
          </div>
        </section>

        <section className="bottom">
          <p className="copyright">© 2024 Todos os direitos reservados</p>
          <div className="legal">
            <a href="#">Contato</a>
            <a href="#">Termos</a>
            <a href="#">Privacidade</a>
          </div>
        </section>
      </footer>
    </div>
  )
}