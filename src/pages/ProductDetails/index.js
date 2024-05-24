import React, { useEffect, useState } from "react"
import "./productdetails.scss"
import { Link } from "react-router-dom"
import { Breadcrumb, BreadcrumbItem } from "@chakra-ui/react"

import Header from "../../components/Header"
import Footer from "../../components/Footer"

import shirt1 from "../../assets/mockups/shirt4.png"
import seloPagar from "../../assets/seloPagarX.png"

import { RiShoppingBag4Line } from "react-icons/ri"
import { FaAngleRight } from "react-icons/fa"

export default function ProductDetails(){
  const [selectedSize, setSelectedSize] = useState(null)
  const [quantity, setQuantity] = useState(1)

  const handleSizeSelection = (size) => {
    setSelectedSize(size)
  }

  const handleIncrement = () => {
    setQuantity(quantity + 1)
  }

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  const sizes = ["PP", "P", "M", "G"]

  useEffect(() => {
    document.title = "Jesustyle | Detalhes do Produto"
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      <Header />

      <main className="product-details">
        <Breadcrumb className="breadcrumb" spacing="8px" separator={<FaAngleRight/>}>
          <BreadcrumbItem className="breadcrumb-item">
            <Link to={`/products`}>Produtos</Link>
          </BreadcrumbItem>
          <BreadcrumbItem className="breadcrumb-item">
            <Link className="active">Detalhes do Produto</Link>
          </BreadcrumbItem>
        </Breadcrumb>

        <section>
          <article>
            <img src={shirt1} alt="Image Product" />
          </article>

          <aside>
            <h1>Camiseta</h1>
            <p>Estilo e conforto em uma camiseta de qualidade.</p>
            <h2>R$77,00</h2>
            <span className="divider"></span>
            <div className="container-size">
              <h2>Tamanho</h2>
              <div>
                {sizes.map((size, index) => (
                  <p key={index} className={`size ${selectedSize === size ? "selected" : ""}`} onClick={() => handleSizeSelection(size)}>
                    {size}
                  </p>
                ))}
              </div>
            </div>
            <div className="container-add">
              <div className="add">
                <button onClick={handleDecrement}>-</button>
                <p>{quantity}</p>
                <button onClick={handleIncrement}>+</button>
              </div>
              <button className="add-cart"><RiShoppingBag4Line /> Adicionar ao Carrinho</button>
            </div>
            <Link to={`/payment`}><button className="buy" onClick={scrollToTop}>COMPRAR AGORA</button></Link>
            <img src={seloPagar}/>
          </aside>
        </section>
      </main>

      <Footer />
    </>
  )
}
