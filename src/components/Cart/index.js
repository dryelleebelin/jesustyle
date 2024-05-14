import React from 'react'
import './cart.scss'
import { Button, Input, Drawer, DrawerBody, DrawerFooter, DrawerHeader, DrawerOverlay, DrawerContent, DrawerCloseButton, useDisclosure } from '@chakra-ui/react';

import item1 from '../../assets/mockups/shirt.png'
import item2 from '../../assets/mockups/shirt1.png'

import { RiShoppingBag3Fill } from "react-icons/ri"

export default function Cart() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = React.useRef()

  const products = [
    { id: 1, name: 'Produto 1', price: 10, quantity: 2, src: item1 },
    { id: 2, name: 'Produto 2', price: 20, quantity: 1, src: item2 },
  ]

  const total = products.reduce((acc, curr) => acc + curr.price * curr.quantity, 0)

  return (
    <>
      <Button className='btn-cart' ref={btnRef} onClick={onOpen}><RiShoppingBag3Fill/> Carrinho</Button>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose} finalFocusRef={btnRef}>
        <DrawerOverlay/>
        <DrawerContent className="cart-content">
          <DrawerCloseButton className="cart-btn-close"/>

          <DrawerHeader className="cart-header">
            <h1>Seu carrinho</h1>
            <span>(2 itens)</span>
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
                    <img src={product.src}/>
                    <div>
                      <span>{product.name}</span>
                      <span>Quantidade: {product.quantity}</span>
                      <span>Subtotal: R$ {(product.price * product.quantity).toFixed(2)}</span>
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
            <button>Finalizar compra</button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  )
}