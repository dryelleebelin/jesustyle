import React from 'react'
import './payment.scss'
import { Link } from "react-router-dom"
import { Breadcrumb, BreadcrumbItem } from "@chakra-ui/react"

import Header from '../../components/Header'
import Footer from '../../components/Footer'

import pagarme from '../../assets/seloPagarX.png'

import { FaAngleRight } from "react-icons/fa"
import { BsFillCreditCardFill, BsFillPersonPlusFill } from 'react-icons/bs'

export default function Payment(){
  return (
    <>
      <Header/>

      <main className='payment'>
        <Breadcrumb className="breadcrumb" spacing="8px" separator={<FaAngleRight/>}>
          <BreadcrumbItem className="breadcrumb-item">
            <Link to={`/products`}>Produtos</Link>
          </BreadcrumbItem>
          <BreadcrumbItem className="breadcrumb-item">
            <Link to={`/product/1`}>Detalhes do Produto</Link>
          </BreadcrumbItem>
          <BreadcrumbItem className="breadcrumb-item">
            <Link className="active">Finalização da Compra</Link>
          </BreadcrumbItem>
        </Breadcrumb>

        <div className='payment-container'>
          <section className='checkout-section'>
            <h1>Finalizar compra</h1>
            <form className='payment-form'>
              <section>
                <h5><BsFillCreditCardFill/>Dados do cartão</h5>
                <span>Aceitamos somente cartão de crédito!*</span>
              </section>

              <div style={{width: '48%'}}>
                <label>Nome no cartão</label>
                <input type="text" placeholder="Nome no cartão" />
              </div>
              <div style={{width: '50%'}}>
                <label>Número do Cartão</label>
                <input type="text" placeholder="Número do Cartão" />
              </div>
              <div style={{width: '32%'}}>
                <label>Data de Validade</label>
                <input type="text" placeholder="MM/AA" maxLength="5" />
              </div>
              <div style={{width: '32%'}}>
                <label>CVV</label>
                <input type="text" maxLength="3" placeholder="CVV" />
              </div>
              <div style={{width: '32%'}}>
                <label>Número de parcelas</label>
                <select>
                  <option selected>10 X de R$10,00</option>
                  <option>9 X de R$10,00</option>
                  <option>8 X de R$10,00</option>
                  <option>7 X de R$10,00</option>
                  <option>6 X de R$10,00</option>
                  <option>5 X de R$10,00</option>
                  <option>4 X de R$10,00</option>
                  <option>3 X de R$10,00</option>
                  <option>2 X de R$10,00</option>
                  <option>1 X de R$10,00</option>
                </select>
              </div>

              <section className='additional-details'>
                <h5><BsFillPersonPlusFill />Dados complementares</h5>
              </section>
              <div style={{width: '48%'}}>
                <label>CPF</label>
                <input type="text" placeholder="CPF" maxLength="14" />
              </div>
              <div style={{width: '50%'}}>
                <label>Telefone</label>
                <input type="tel" placeholder="(**) *****-****" maxLength={14} />
              </div>
              <div style={{width: '48%'}}>
                <label>CEP</label>
                <input type="text" placeholder="CEP" maxLength={9} />
              </div>
              <div style={{width: '50%'}}>
                <label>Nº residencial</label>
                <input type="text" placeholder="Nº residencial" maxLength={9} />
              </div>
            </form>
          </section>

          <section className='purchase-details'>
            <h1>Detalhes da compra:</h1>
            <p>Item: <span>Camiseta - Tamanho M</span></p>
            <p>Preço: <span>R$10,00</span></p>
            <p>Parcelamento: <span>10 X</span></p>
            <p>Entrega Estimada: <span>15 de maio de 2024</span></p>
            <img src={pagarme}/>
            <p className='total-diviser'></p>
            <p className='total'>Total: <span>10 X de R$10,00</span></p>
            <div>
              <label><input type='checkbox'/>Ao marcar esta opção, você concorda com os <a href='#'>Termos de Serviço</a>.</label>
            </div>
            <button type='button'>Finalizar compra</button>
          </section>
        </div>
      </main>

      <Footer/>
    </>
  )
}
