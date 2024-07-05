import React, { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import "./productdetails.scss"
import { Breadcrumb, BreadcrumbItem, useDisclosure } from "@chakra-ui/react"
import { toast } from 'react-toastify'
import axios from 'axios'

import Header from "../../components/Header"
import Footer from "../../components/Footer"

import seloPagar from "../../assets/seloPagarX.png"

import { FaAngleRight } from "react-icons/fa"
import { Spinner } from '@chakra-ui/react'

import { products } from "../AllProducts"

export default function ProductDetails(){
  const { id } = useParams()
  const [product, setProduct] = useState(null)

  const [selectedSize, setSelectedSize] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const [hoveredItemId, setHoveredItemId] = useState(null)
  const { isOpen, onOpen } = useDisclosure()
  const [loading, setLoading] = useState(true)
  const [loadingButton, setLoadingButton] = useState(false)

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

  async function handleAddToCart(){
    if (!selectedSize) {
      toast.warning("Por favor, selecione um tamanho antes de adicionar ao carrinho.")
      return
    }
  
    try{
      setLoadingButton(true)
      
      const itemToAdd = {
        id: product.id,
        name: product.name,
        price: product.discountPrice > 0 ? product.discountPrice : product.originalPrice,
        quantity: quantity,
        size: selectedSize,
        key: `${product.id}-${selectedSize}`,
        src: hoveredItemId === product.id && product.hoverSrc ? product.hoverSrc : product.src,
      }
      const cart = JSON.parse(localStorage.getItem("cart")) || []
      cart.push(itemToAdd)
      localStorage.setItem("cart", JSON.stringify(cart))
  
      toast.success("Produto adicionado com sucesso!")
      onOpen()
  
      setSelectedSize(null)
      setQuantity(1)
  
    } catch(error){
  
    } finally{
      setLoadingButton(false)
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
                  <button onClick={handleIncrement} disabled={quantity >= 30}>+</button>
                </div>
              </div>
              <button className="buy" onClick={handleAddToCart}>ADICIONAR AO CARRINHO</button>
              <img src={seloPagar}/>
            </aside>
          </section>
        )}
      </main>

      <Footer />
    </>
  )
}
