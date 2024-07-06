import React, { useEffect, useState, useRef } from "react"
import './home.scss'
import { Link } from "react-router-dom"

import Login from "../Login"
import CarouselActions from "../../components/CarouselActions"

import transparentLogo from '../../assets/logos/transparent.png'
import whiteLogo from '../../assets/logos/white.png'
import horizontalVideo from '../../assets/videos/horizontalTeaser.mp4'
import verticalVideo from '../../assets/videos/horizontalTeaser.mp4'
import model1 from '../../assets/mockups/person8.png'
import model2 from '../../assets/mockups/shirt.png'
import model3 from '../../assets/mockups/bag.png'
import model4 from '../../assets/mockups/shirt1.png'
import purpose1 from '../../assets/purpose1.png'
import purpose2 from '../../assets/purpose2.jpg'
import purpose3 from '../../assets/purpose3.jpg'
import purposeCollage from '../../assets/purposeCollage.png'

import { BsArrowRight, BsFillArrowUpSquareFill } from "react-icons/bs"
import { FaInstagram, FaYoutube, FaSpotify, FaVolumeMute, FaVolumeUp } from "react-icons/fa"
import { IoMdMail } from "react-icons/io"

export default function Home() {
  const [isOpenModalLogin, setIsOpenModalLogin] = useState(false)
  const [isHeaderBlurred, setIsHeaderBlurred] = useState(false)
  const [isSoundEnabled, setIsSoundEnabled] = useState(false)
  const videoRef = useRef(null)
  const [buttonToTop, setButtonToTop] = useState(false)

  const handleOpenModalLogin = () => {
    setIsOpenModalLogin(true)
  }

  const handleCloseModal = () => {
    setIsOpenModalLogin(false)
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const scrollTo = (id) => document.getElementById(id).scrollIntoView({ behavior: 'smooth' })

  const toggleSound = () => {
    setIsSoundEnabled(prevState => !prevState)
    if (videoRef.current) {
      videoRef.current.muted = !isSoundEnabled
    }
  }

  useEffect(() => {
    document.title = "Jesustyle | Inspire-se com Jesustyle"
  }, [])

  return (
    <div className="home">
      <header className={`${isHeaderBlurred ? 'blurred' : ''}`}>
        <img src={transparentLogo} alt="Logo Jesustyle" onClick={scrollToTop}/>
        <nav>
          <a onClick={() => scrollTo('purpose')}>Propósito</a>
          <a onClick={() => scrollTo('store')}>Loja</a>
          <a onClick={() => scrollTo('podcast')}>Podcast</a>
          <a onClick={() => scrollTo('actions')}>Ações</a>
          <button type="button" onClick={handleOpenModalLogin}>Compre aqui <BsArrowRight/></button>
        </nav>
      </header>

      <main>
        <video className="horizontalVideo" ref={videoRef} autoPlay muted={!isSoundEnabled} loop>
          <source src={horizontalVideo} type="video/mp4"/>
        </video>
        <video className="verticalVideo" ref={videoRef} autoPlay muted={!isSoundEnabled} loop>
          <source src={verticalVideo} type="video/mp4"/>
        </video>
        <div onClick={toggleSound}>
          {isSoundEnabled ? <FaVolumeUp /> : <FaVolumeMute />}
        </div>
      </main>

      <span id="purpose"/>
      <section className="purpose">

      </section>

      <span id="store"/>
      <section className="store">

      </section>

      <span id="podcast"/>
      <section className="podcast">
        <div className="container">
          <h1>Podcasts</h1>
          <CarouselActions/>
        </div>
      </section>

      <span id="actions"/>
      <section className="actions">
        
      </section>

      <footer>
        <section className="top">
          <img src={whiteLogo} onClick={scrollToTop}/>
          <div className="links-column">
            <h2>Navegação</h2>
            <a onClick={() => scrollTo('purpose')}>Propósito</a>
            <a onClick={() => scrollTo('store')}>Loja</a>
            <a onClick={() => scrollTo('podcast')}>Podcast</a>
            <a onClick={() => scrollTo('actions')}>Ações</a>
          </div>
          <div className="links-column socials-column">
            <h2>Redes Sociais</h2>
            <p>Faça parte das nossas redes sociais e acompanhe as novidades, vídeos e promoções exclusivas!</p>
            <div className="socials">
              <a href="https://www.instagram.com/jesustyle.br/" target="_blank" rel="noopener noreferrer"><FaInstagram/></a>
              <a href="https://www.youtube.com/channel/UCcT7mMwhBDrGYOGB2cX59zQ" target="_blank" rel="noopener noreferrer"><FaYoutube/></a>
              <a><FaSpotify/></a>
              <a href="mailto:contatojesustyle@gmail.com" target="_blank" rel="noopener noreferrer"><IoMdMail/></a>
            </div>
          </div>
        </section>

        <section className="bottom">
          <p className="copyright">© 2024 Jesustyle. Todos os direitos reservados</p>
          <div className="legal">
            <a href="#">Termos</a>
            <a href="#">Privacidade</a>
          </div>
        </section>
      </footer>

      {isOpenModalLogin && (
        <Login isOpen={isOpenModalLogin} closeModal={handleCloseModal}/>
      )}

      {buttonToTop && (<BsFillArrowUpSquareFill className='to-top' onClick={scrollToTop}/>)}
    </div>
  )
}
