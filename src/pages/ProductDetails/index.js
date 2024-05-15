import React, { useEffect, useState } from "react"
import './productdetails.scss'
import { Link } from "react-router-dom"
import { Breadcrumb, BreadcrumbItem } from '@chakra-ui/react'

import Header from '../../components/Header'
import Footer from '../../components/Footer'

import shirt1 from '../../assets/mockups/shirt4.png'
import seloPagar from '../../assets/seloPagarX.png'

import { RiShoppingBag4Line } from "react-icons/ri"
import { FaAngleRight } from "react-icons/fa"

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
      <Header/>

      <main className="product-details">
        <Breadcrumb className="breadcrumb" spacing='8px' separator={<FaAngleRight/>}>
          <BreadcrumbItem className="breadcrumb-item">
            <Link to={`/products`}>Products</Link>
          </BreadcrumbItem>

          <BreadcrumbItem className="breadcrumb-item">
            <Link className="active">Product Detail</Link>
          </BreadcrumbItem>
        </Breadcrumb>

        <section>
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
        </section>
      </main>

      <Footer/>
    </>
  )
}