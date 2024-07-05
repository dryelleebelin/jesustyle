import React, { useState, useEffect } from 'react'
import './cart.scss'
import { useNavigate } from 'react-router-dom'
import { Button, Drawer, DrawerBody, DrawerFooter, DrawerHeader, DrawerOverlay, DrawerContent, DrawerCloseButton, useDisclosure } from '@chakra-ui/react'
import { RiShoppingBag3Fill } from "react-icons/ri"
import { IoClose } from "react-icons/io5"

export default function Cart() {
  const navigate = useNavigate()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = React.useRef()

  const [cartProducts, setCartProducts] = useState([])
  const sizes = ["PP", "P", "M", "G"]

  useEffect(() => {
    async function fetchCartProducts() {
      try {
        const cartItems = JSON.parse(localStorage.getItem("cart")) || []
        setCartProducts(cartItems)

      } catch (error) {
        
      }
    }

    fetchCartProducts()
  }, [])

  const updateLocalStorage = (updatedCart) => {
    localStorage.setItem("cart", JSON.stringify(updatedCart))
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleSizeSelection = (productId, size) => {
    const updatedCart = cartProducts.map((product) => {
      if (product.id === productId) {
        return { ...product, size: size }
      }
      return product
    })
    setCartProducts(updatedCart)
    updateLocalStorage(updatedCart)
  }

  const increaseQuantity = (productId) => {
    const updatedCart = cartProducts.map((product) => {
      if (product.id === productId) {
        return { ...product, quantity: product.quantity + 1 }
      }
      return product
    })
    setCartProducts(updatedCart)
    updateLocalStorage(updatedCart)
  }

  const decreaseQuantity = (productId) => {
    const updatedCart = cartProducts.map((product) => {
      if (product.id === productId && product.quantity > 1) {
        return { ...product, quantity: product.quantity - 1 }
      }
      return product
    })
    setCartProducts(updatedCart)
    updateLocalStorage(updatedCart)
  }

  const removeProduct = (productId) => {
    const updatedCart = cartProducts.filter((product) => product.id !== productId)
    setCartProducts(updatedCart)
    updateLocalStorage(updatedCart)
  }

  const handleCheckout = () => {
    if (cartProducts.length > 0) {
      navigate('/payment')
      scrollToTop()
    }
  }

  const total = cartProducts.reduce((acc, curr) => acc + curr.price * curr.quantity, 0)
  const cartQuantity = cartProducts.reduce((acc, curr) => acc + curr.quantity, 0)

  return (
    <>
      <Button className='btn-cart' ref={btnRef} onClick={onOpen}>
        <RiShoppingBag3Fill />
        {cartQuantity >= 1 && <span className="cart-quantity">{cartQuantity}</span>}
      </Button>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose} finalFocusRef={btnRef}>
        <DrawerOverlay onClick={onClose} />
        <DrawerContent className="cart-content">
          <DrawerCloseButton className="cart-btn-close" />

          <DrawerHeader className="cart-header">
            <h1>Seu carrinho</h1>
            <span>({cartProducts.length} itens)</span>
          </DrawerHeader>

          <DrawerBody className="cart-body">
            {cartProducts.length === 0 ? (
              <div className='empty-cart'>
                <RiShoppingBag3Fill />
                <p>Seu carrinho está vazio</p>
              </div>
            ) : (
              <ul>
                {cartProducts.map((product) => (
                  <li key={product.id}>
                    <img src={product.src} alt={product.name} />
                    <div className='cart-details'>
                      <div>
                        <p>{product.name}</p>
                        <div className='container-sizes'>
                          {sizes.map((size, index) => (
                            <p
                              key={`${product.id}-${size}`} 
                              className={`size ${product.size === size ? 'selected' : ''}`}
                              onClick={() => handleSizeSelection(product.id, size)}
                            >
                              {size}
                            </p>
                          ))}
                        </div>
                        <span>R$ {(product.price * product.quantity).toFixed(2).replace('.', ',')}</span>
                      </div>
                      <div>
                        <IoClose onClick={() => removeProduct(product.id)} />
                        <div className='qtd'>
                          <button type='button' onClick={() => decreaseQuantity(product.id)}>-</button>
                          <p>{product.quantity}</p>
                          <button type='button' onClick={() => increaseQuantity(product.id)} disabled={product.quantity >= 30}>+</button>
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
            <button type='button' onClick={handleCheckout} disabled={cartProducts.length === 0}>Finalizar compra</button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  )
}
