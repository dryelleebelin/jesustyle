import React, { useEffect, useState, useRef } from "react"
import './home.scss'
import { Link, useNavigate } from "react-router-dom"

import Login from "../Login"
import CarouselActions from "../../components/CarouselActions"

import transparentLogo from '../../assets/logos/transparent.png'
import whiteLogo from '../../assets/logos/white.png'
import horizontalVideo from '../../assets/videos/horizontalTeaser.mp4'
import verticalVideo from '../../assets/videos/horizontalTeaser.mp4'
import esThiagoKarine from '../../assets/estudio/esMoletomJesusSavesTK.jpg'
import esThiagoKarine2 from '../../assets/estudio/esMoletomJesusSavesTK2.jpg'
import esThiagoKarine3 from '../../assets/estudio/esCamisetaJesusLovesTK.jpg'
import img1 from '../../assets/home/img1.jpg'
import img2 from '../../assets/home/img2.jpg'
import img3 from '../../assets/home/img3.jpg'
import img4 from '../../assets/home/img4.jpg'
import img5 from '../../assets/home/img5.jpg'
import img6 from '../../assets/home/img6.jpg'
import img7 from '../../assets/home/img7.png'
import img8 from '../../assets/home/img8.png'
import img9 from '../../assets/home/img9.png'
import img10 from '../../assets/home/img10.jpeg'
import img11 from '../../assets/home/img11.jpeg'
import img12 from '../../assets/home/img12.jpeg'
import img13 from '../../assets/home/img13.jpeg'
import logoKiliquinha from '../../assets/home/instituto_kiliquinha_logo.png'
import bandeira from '../../assets/home/bandeira.jpg'
import CamisetaGodisGoodFront from '../../assets/products/CamisetaGodisGoodFront.png'
import CamisetaGodisGoodBack from '../../assets/products/CamisetaGodisGoodBack.png'
import CamisetaTrustInTheLordFront from '../../assets/products/CamisetaTrustInTheLordFront.png'
import CamisetaTrustInTheLordBack from '../../assets/products/CamisetaTrustInTheLordBack.png'
import CalcaMoletomJesusSaves from '../../assets/products/CalcaMoletomJesusSaves.png'
import MoletomGolaCarecaJesusSaves from '../../assets/products/MoletomGolaCarecaJesusSaves.png'
import CamisetaJesusLovesYouFront from '../../assets/products/CamisetaJesusLovesYouFront.png'
import CamisetaJesusLovesYouBack from '../../assets/products/CamisetaJesusLovesYouBack.png'
import MoletomLikeJesusBack from '../../assets/products/MoletomLikeJesusBack.png'
import MoletomLikeJesusFront from '../../assets/products/MoletomLikeJesusFront.png'
import iconBackground from '../../assets/icons/inverse-transparent-background.png'
import iconBlueBackground from '../../assets/icons/accent1-background.png'
import logoBackground from '../../assets/logos/white-background.png'

import { BsArrowRight } from "react-icons/bs"
import { FaInstagram, FaYoutube, FaSpotify, FaVolumeMute, FaVolumeUp } from "react-icons/fa"
import { IoMdMail } from "react-icons/io"

export default function Home(){
  const [isOpenModalLogin, setIsOpenModalLogin] = useState(false)
  const [isHeaderBlurred, setIsHeaderBlurred] = useState(false)
  const [isSoundEnabled, setIsSoundEnabled] = useState(false)
  const videoRef = useRef(null)
  const navigate = useNavigate()

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

  const handleImageClick = (id) => {
    navigate(`/product/${id}`)
  }

  useEffect(() => {
    document.title = "Jesustyle | Inspire-se com Jesustyle"

    const handleScroll = () => {
      const scrollPosition = window.scrollY
      const windowHeight = window.innerHeight

      if(scrollPosition >= windowHeight) {
        setIsHeaderBlurred(true)
      } else{
        setIsHeaderBlurred(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <div className="home">
      <header className={`${isHeaderBlurred ? 'blurred' : ''}`}>
        <img src={transparentLogo} alt="Logo Jesustyle" onClick={scrollToTop}/>
        <nav>
          <a onClick={() => scrollTo('store')}>Loja</a>
          <a onClick={() => scrollTo('purpose')}>Propósito</a>
          {/* <a onClick={() => scrollTo('actions')}>Ações</a> */}
          {/* <a onClick={() => scrollTo('podcast')}>Podcast</a> */}
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

      <span id="store"/>
      <section className="store">
        <img className="background" src={iconBackground}/>
        <h1>LOJA</h1>
        <article>
          <img src={CamisetaGodisGoodFront} onClick={() => { handleImageClick(2); scrollToTop(); }}/>
          <img src={CamisetaGodisGoodBack} onClick={() => { handleImageClick(2); scrollToTop(); }}/>
          <img src={CamisetaTrustInTheLordFront} onClick={() => { handleImageClick(1); scrollToTop(); }}/>
          <img src={CamisetaTrustInTheLordBack} onClick={() => { handleImageClick(1); scrollToTop(); }}/>
          <img src={CamisetaJesusLovesYouFront} onClick={() => { handleImageClick(3); scrollToTop(); }}/>
          <img src={CamisetaJesusLovesYouBack} onClick={() => { handleImageClick(3); scrollToTop(); }}/>
          <img src={CalcaMoletomJesusSaves} onClick={() => { handleImageClick(7); scrollToTop(); }}/>
          <img src={MoletomGolaCarecaJesusSaves} onClick={() => { handleImageClick(6); scrollToTop(); }}/>
          <img src={MoletomLikeJesusBack} onClick={() => { handleImageClick(4); scrollToTop(); }}/>
          <img src={MoletomLikeJesusFront} onClick={() => { handleImageClick(4); scrollToTop(); }}/>
        </article>
        <Link to={`/products`} onClick={scrollToTop}><h1>COMPRE AGORA <BsArrowRight/></h1></Link>
      </section>

      <span id="purpose"/>
      <section className="purpose">
        <img className="background" src={iconBlueBackground}/>
        <h1>PROPÓSITO</h1>
        <p>Na Jesustyle, acreditamos que cada peça de roupa pode contar uma história. Nosso propósito é unir estilo e valores cristãos para inspirar e transformar vidas. Cada coleção é desenhada com mensagens significativas que refletem a fé e o amor de Jesus Cristo. Vista-se com propósito e faça parte de um movimento que espalha esperança e luz ao mundo.</p>
        <aside>
          <img src={esThiagoKarine2}/>
          <img src={esThiagoKarine3}/>
          <img src={esThiagoKarine}/>
        </aside>
      </section>

      {/* <span id="actions"/>
      <section className="actions">
        <img className="background" src={logoBackground}/>
        <h1>AÇÕES</h1>
        <p>Nossos fundadores têm se dedicado a ações sociais significativas:</p>
        <article>
          <p>Ajuda às vítimas de enchentes em Canoas/RS: Levaram mais de 10 caminhões de suprimentos para as áreas afetadas.</p>
          <p>Feira de adoção de cachorros resgatados: Realizada em São Paulo, doou cerca de 40 animais resgatados das enchentes no Rio Grande do Sul.</p>
          <p>Apoio a institutos de acolhimento: Entregaram mais de meia tonelada de suprimentos para a Associação Tia Marly em São Paulo, beneficiando diversas crianças.</p>
        </article>
        <aside>
          <div>
            <img src={img4}/>
            <img src={bandeira}/>
            <img src={img5}/>
            <img src={img6}/>
          </div>
          <div>
            <img src={img10}/>
            <img src={img11}/>
            <img src={img12}/>
            <img src={img13}/>
          </div>
          <div>
            <img src={img7}/>
            <img src={logoKiliquinha}/>
            <img src={img8}/>
            <img src={img9}/>
          </div>
        </aside>
      </section> */}

      {/* <span id="podcast"/>
      <section className="podcast">
        <div className="container">
          <h1>PODCASTS</h1>
          <CarouselActions/>
        </div>
      </section> */}

      <footer>
        <section className="top">
          <img src={whiteLogo} onClick={scrollToTop}/>
          <div className="links-column">
            <h2>Navegação</h2>
            <a onClick={() => scrollTo('store')}>Loja</a>
            <a onClick={() => scrollTo('purpose')}>Propósito</a>
            {/* <a onClick={() => scrollTo('actions')}>Ações</a> */}
            {/* <a onClick={() => scrollTo('podcast')}>Podcast</a> */}
          </div>
          <div className="links-column socials-column">
            <h2>Redes Sociais</h2>
            <p>Faça parte das nossas redes sociais e acompanhe as novidades, vídeos e promoções exclusivas!</p>
            <div className="socials">
              <a href="https://www.instagram.com/jesustyle.br/" target="_blank" rel="noopener noreferrer"><FaInstagram/></a>
              <a href="https://www.youtube.com/channel/UCcT7mMwhBDrGYOGB2cX59zQ" target="_blank" rel="noopener noreferrer"><FaYoutube/></a>
              {/* <a><FaSpotify/></a> */}
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
    </div>
  )
}
