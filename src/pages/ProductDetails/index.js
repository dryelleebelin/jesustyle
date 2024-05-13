import React, { useEffect, useState } from "react"
import './productdetails.scss'

import shirt1 from '../../assets/mockups/shirt4.png'
import seloPagar from '../../assets/seloPagarX.png'

import { RiShoppingBag4Line } from "react-icons/ri"
import { Link } from "react-router-dom"

export default function ProductDetails(){
  const [selectedSize, setSelectedSize] = useState(null)

  const handleSizeSelection = (size) => {
    setSelectedSize(size)
  }

  const sizes = ["S", "M", "L", "XL"]

  useEffect(() => {
    document.title = "Jesustyle | Detalhes do Produto"
  }, [])

  return(
    <>
      <main className="product-details">
        <article>
          <img src={shirt1} alt="Image Product"/>
        </article>

        <aside>
          <h1>Camiseta</h1>
          <p>Estilo e conforto em uma camiseta de qualidade.</p>
          <h2>R$77,00</h2>
          <span className="divider"></span>
          <div className="container-size">
            <h2>Size</h2>
            <div>
              {sizes.map((size, index) => (
                <p key={index} className={`size ${selectedSize === size ? "selected" : ""}`} onClick={() => handleSizeSelection(size)}>{size}</p>
              ))}
            </div>
          </div>
          <div className="container-add">
            <div className="add">
              <button>-</button>
              <p>1</p>
              <button>+</button>
            </div>
            <button className="add-cart"><RiShoppingBag4Line/> add to cart</button>
          </div>
          <Link to={`/payment`}><button className="buy">buy now</button></Link>
          <img src={seloPagar}/>
        </aside>
      </main>
    </>
  )
}