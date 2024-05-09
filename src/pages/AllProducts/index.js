import React from "react"
import './allproducts.scss'

import { FaListUl } from "react-icons/fa";

export default function AllProducts(){
  return(
    <>
      <header>header</header>

      <main className="all-products">
        <aside>
          <h1>Collection</h1>
          <div>
            <p><FaListUl/> Filtros</p>
            <p>Reset all</p>
          </div>
          <p>Camisetas</p>
          <p>Blusas</p>
          <p>Moletons</p>
          <p>Bolsas</p>
          <h2>Size</h2>
          <p>S</p>
          <p>M</p>
          <p>L</p>
          <p>XL</p>
          <h2>Color</h2>
        </aside>

        <section>
          <div>
            <p>Price low to high</p>
          </div>
          <div>
            <div className="item">
              
            </div>
          </div>
        </section>
      </main>
    </>
  )
}