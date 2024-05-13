import React, { useEffect, useState } from "react"
import './home.scss'
import { Link } from "react-router-dom"

import Login from "../Login"

import transparentLogo from '../../assets/logos/transparent.png'
import whiteLogo from '../../assets/logos/white.png'
import video from '../../assets/FilmeJesusStyle2.mp4'
import model1 from '../../assets/mockups/person8.png'
import model2 from '../../assets/mockups/shirt.png'
import model3 from '../../assets/mockups/bag.png'
import model4 from '../../assets/mockups/shirt1.png'

import { BsArrowRight } from "react-icons/bs"
import { FaInstagram, FaTiktok, FaFacebook, FaYoutube } from "react-icons/fa"

export default function Home(){
  const [isOpenModalLogin, setIsOpenModalLogin] = useState(false)
  const [isHeaderBlurred, setIsHeaderBlurred] = useState(false)

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

  useEffect(() => {
    document.title = "Jesustyle | Inspire-se com Jesustyle"

    const handleScroll = () => {
      const scrollPosition = window.scrollY
      const windowHeight = window.innerHeight

      if (scrollPosition >= windowHeight) {
        setIsHeaderBlurred(true)
      } else {
        setIsHeaderBlurred(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])
  
  return(
    <div className="home">
      <header className={`${isHeaderBlurred ? 'blurred' : ''}`}>
        <img src={transparentLogo} alt="Logo Jesustyle" onClick={scrollToTop}/>
        <nav>
          <a onClick={() => scrollTo('purpose')}>Propósito</a>
          <a onClick={() => scrollTo('actions')}>Ações</a>
          <a onClick={() => scrollTo('podcast')}>Podcast</a>
          <a onClick={() => scrollTo('store')}>Loja</a>

          <button type="button" onClick={handleOpenModalLogin}>Login <BsArrowRight/></button>
        </nav>
      </header>

      <main>
        <video autoPlay loop>
          <source src={video} type="video/mp4"/>
        </video>
      </main>

      <span id="purpose"/>

      <section className="purpose">
        <img src={transparentLogo} alt="Logo Jesustyle"/>
        <aside>
          <h2>Nossa missão</h2>
          <p>Na JESUSTYLE, nossa jornada começou com um chamado simples, mas poderoso. Guiados por uma convicção profunda e uma fé inabalável, buscamos honrar a mensagem de amor e esperança que encontramos em Jesus Cristo. Como fundador e CEO, Thiago lidera nosso movimento, unindo um grupo dedicado de indivíduos por um propósito maior que nós mesmos.</p>
          <p>Nossa missão é clara e inabalável, moldada pelas verdades eternas da Bíblia. Somos chamados a ser o sal da terra, despertando uma sede por Jesus Cristo em todos aqueles que encontramos. Através da moda streetwear com propósito, inspiramos uma geração a abraçar sua identidade em Cristo e a viver de acordo com os valores do Reino.</p>
          <p>Além disso, nos comprometemos em ser agentes de mudança positiva em nossa comunidade, de eventos de serviço a iniciativas que promovem a fé e o amor ao próximo.</p>
          <p>Na JESUSTYLE, nossa humildade vem da compreensão de que somos instrumentos nas mãos de Deus. Enquanto Thiago lidera o caminho, permanecemos fiéis à nossa missão: espalhar a mensagem de Jesus Cristo através da moda, da comunidade e do serviço, deixando um impacto duradouro em um mundo que tanto precisa de esperança e luz. Esta é a nossa missão. <strong>Esta é a JESUSTYLE.</strong></p>
        </aside>
      </section>

      <span id="actions"/>
      
      <section className="actions">
        <h2>Ações</h2>
      </section>

      <span id="podcast"/>

      <section className="podcast">
        <h2>Podcast</h2>
      </section>

      <span id="store"/>

      <section className="store">
        <article className="box1">
          <div className="content">
            <p>Jesus te fez style</p>
            <span>collection 2024</span>
            <button>Comprar</button>
          </div>
          <div className="image">
            <img src={model2} alt="Model"/>
            <Link to={`/products`}>Shop collection <BsArrowRight/></Link>
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
            <a onClick={() => scrollTo('purpose')}>Propósito</a>
            <a onClick={() => scrollTo('actions')}>Ações</a>
            <a onClick={() => scrollTo('podcast')}>Podcast</a>
            <a onClick={() => scrollTo('store')}>Loja</a>
          </div>
          <div className="links-column socials-column">
            <h2>Redes Sociais</h2>
            <p>Siga-me nas redes sociais para obter os mais recentes vídeos e postagens incríveis.</p>
            <div className="socials">
              <a href="https://www.instagram.com/jesustyle.br/" target="_blank" rel="noopener noreferrer"><FaInstagram/></a>
              {/* <a href="https://www.tiktok.com/" target="_blank" rel="noopener noreferrer"><FaTiktok/></a>
              <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer"><FaFacebook/></a> */}
              <a href="https://www.youtube.com/channel/UCcT7mMwhBDrGYOGB2cX59zQ" target="_blank" rel="noopener noreferrer"><FaYoutube/></a>
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

      {isOpenModalLogin && (
        <Login isOpen={isOpenModalLogin} closeModal={handleCloseModal}/>
      )}
    </div>
  )
}