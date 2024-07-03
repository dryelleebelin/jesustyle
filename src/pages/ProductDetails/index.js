import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import "./productdetails.scss"
import { Link } from "react-router-dom"
import { Breadcrumb, BreadcrumbItem } from "@chakra-ui/react"

import Header from "../../components/Header"
import Footer from "../../components/Footer"

import seloPagar from "../../assets/seloPagarX.png"

import { RiShoppingBag4Line } from "react-icons/ri"
import { FaAngleRight } from "react-icons/fa"
import { Spinner } from '@chakra-ui/react'

import { products } from "../AllProducts"

export default function ProductDetails(){
  const { id } = useParams()
  const [product, setProduct] = useState(null)

  const [selectedSize, setSelectedSize] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const [hoveredItemId, setHoveredItemId] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchProduct(){
      try{
        const foundProduct = products.find(product => product.id === parseInt(id))
        setProduct(foundProduct)

        document.title = `Jesustyle | Detalhes do Produto - ${foundProduct ? foundProduct.name : ""}`

      } catch(error){

      } finally{
        setLoading(false)
      }
    }

    fetchProduct()
  }, [id])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

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

        {!product ? (
          <div className="spinner-page">
            <Spinner className="spinner" speed='0.70s'/>
          </div>
        ) : (
          <section>
            <article>
              {product.discountPrice > 0 && (
                <span className="discount-percentage">{product.discountPercentage}% OFF</span>
              )}
              <img src={hoveredItemId === product.id && product.hoverSrc ? product.hoverSrc : product.src} onMouseEnter={() => setHoveredItemId(product.id)} onMouseLeave={() => setHoveredItemId(null)} />
            </article>

            <aside>
              <h1>{product.name}</h1>
              <p>{product.description}</p>
              {product.discountPrice > 0 ? (
                <>
                  <h2 className="discountPrice">R$ {parseFloat(product.originalPrice).toFixed(2).replace('.', ',')}</h2>
                  <h2>R$ {parseFloat(product.discountPrice).toFixed(2).replace('.', ',')}</h2>
                </>
              ) : (
                <h2 style={{ margin: '1vh 0 '}}>R$ {parseFloat(product.originalPrice).toFixed(2).replace('.', ',')}</h2>
              )}
              <span className="divider"></span>
              <div className="container-size">
                <h2>Tamanho</h2>
                <div>
                  {product.size.map((size, index) => (
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
        )}
      </main>

      <Footer />
    </>
  )
}
