import React from "react"
import './home.scss'

import logo from '../../images/logos/white.png'
import wallpaper from '../../images/wallpaper.jpg'
import model1 from '../../images/mockups/person8.png'
import model2 from '../../images/mockups/shirt.png'
import model3 from '../../images/mockups/bag.png'
import model4 from '../../images/mockups/shirt1.png'

import { BsArrowRight } from "react-icons/bs"

export default function Home(){
  return(
    <div className="home">
      <header>
        <img src={logo} alt="Logo Jesustyle"/>
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

      </footer>
    </div>
  )
}