import React, { useState } from 'react'
import './cart.scss'
import { useNavigate } from 'react-router-dom'
import { Button, Drawer, DrawerBody, DrawerFooter, DrawerHeader, DrawerOverlay, DrawerContent, DrawerCloseButton, useDisclosure } from '@chakra-ui/react'

import item1 from '../../assets/mockups/shirt.png'
import item2 from '../../assets/mockups/shirt1.png'

import { RiShoppingBag3Fill } from "react-icons/ri"
import { IoClose } from "react-icons/io5"

export default function Cart(){
  const navigate = useNavigate()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = React.useRef()

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const [products, setProducts] = useState([
    { id: 1, name: 'Produto 1', price: 50, quantity: 1, src: item1, size: 'P' },
    { id: 2, name: 'Produto 2', price: 80, quantity: 1, src: item2, size: 'M' }
  ])  

  const total = products.reduce((acc, curr) => acc + curr.price * curr.quantity, 0)
  const cartQuantity = products.reduce((acc, curr) => acc + curr.quantity, 0)
  const sizes = ["PP", "P", "M", "G"]

  const handleSizeSelection = (productId, size) => {
    setProducts(products.map(product => {
      if (product.id === productId) {
        return { ...product, size: size }
      }
      return product
    }))
  }

  const increaseQuantity = (productId) => {
    setProducts(products.map(product => {
      if (product.id === productId) {
        return { ...product, quantity: product.quantity + 1 }
      }
      return product
    }))
  }

  const decreaseQuantity = (productId) => {
    setProducts(products.map(product => {
      if (product.id === productId && product.quantity > 1) {
        return { ...product, quantity: product.quantity - 1 }
      }
      return product
    }))
  }

  const removeItem = (productId) => {
    setProducts(products.filter(product => product.id !== productId))
  }

  const handleCheckout = () => {
    if (products.length > 0) {
      navigate('/payment')
      scrollToTop()
    }
  }

  return (
    <>
      <Button className='btn-cart' ref={btnRef} onClick={onOpen}>
        <RiShoppingBag3Fill/>
        {cartQuantity >= 1 && <span className="cart-quantity">{cartQuantity}</span>}
      </Button>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose} finalFocusRef={btnRef}>
        <DrawerOverlay onClick={onClose}/>
        <DrawerContent className="cart-content">
          <DrawerCloseButton className="cart-btn-close"/>

          <DrawerHeader className="cart-header">
            <h1>Seu carrinho</h1>
            <span>({products.length} itens)</span>
          </DrawerHeader>

          <DrawerBody className="cart-body">
            {products.length === 0 ? (
              <div className='empty-cart'>
                <RiShoppingBag3Fill/>
                <p>Seu carrinho está vazio</p>
              </div>
            ) : (
              <ul>
                {products.map(product => (
                  <li key={product.id}>
                    <img src={product.src} alt={product.name} />
                    <div className='cart-details'>
                      <div>
                        <p>{product.name}</p>
                        <div className='container-sizes'>
                          {sizes.map((size, index) => (
                            <p key={index} className={`size ${product.size === size ? "selected" : ""}`} onClick={() => handleSizeSelection(product.id, size)}>
                              {size}
                            </p>
                          ))}
                        </div>
                        <span>R$ {(product.price * product.quantity).toFixed(2).replace('.', ',')}</span>
                      </div>
                      <div> 
                        <IoClose onClick={() => removeItem(product.id)}/>
                        <div className='qtd'>
                          <button type='button' onClick={() => decreaseQuantity(product.id)}>-</button>
                          <p>{product.quantity}</p>
                          <button type='button' onClick={() => increaseQuantity(product.id)}>+</button>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </DrawerBody>

          <DrawerFooter className="cart-footer">
            <p>Total:
              <span>R$ {total.toFixed(2).replace('.', ',')}</span>
            </p>
            <button type='button' onClick={handleCheckout} disabled={products.length === 0}>Finalizar compra</button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  )
}
