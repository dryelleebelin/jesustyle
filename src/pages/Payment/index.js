import React from 'react'
import './payment.scss'

import Header from '../../components/Header'
import Footer from '../../components/Footer'

import { BsFillCreditCardFill, BsFillPersonPlusFill } from 'react-icons/bs'

export default function Payment(){
  return (
    <>
      <Header/>

      <main className='payment'>
        Breadcrumb
        <div className='payment-container'>
          <section className='checkout-section'>
            <h1>Finalizar compra</h1>
            <form className='payment-form'>
              <section>
                <h5><BsFillCreditCardFill/>Dados do cartão</h5>
                <span>Aceitamos somente cartão de crédito!*</span>
              </section>

              <div>
                <label>Nome no cartão</label>
                <input type="text" placeholder="Nome no cartão" />
              </div>
              <div>
                <label>Número do Cartão</label>
                <input type="text" placeholder="Número do Cartão" />
              </div>
              <div>
                <label>Data de Validade</label>
                <input type="text" placeholder="MM/AA" maxLength="5" />
              </div>
              <div>
                <label>CVV</label>
                <input type="text" maxLength="3" placeholder="CVV" />
              </div>
              <div>
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
              <div>
                <label>CPF</label>
                <input type="text" placeholder="CPF" maxLength="14" />
              </div>
              <div>
                <label>Telefone</label>
                <input type="tel" placeholder="(**) *****-****" maxLength={14} />
              </div>
              <div>
                <label>CEP</label>
                <input type="text" placeholder="CEP" maxLength={9} />
              </div>
              <div>
                <label>Nº residencial</label>
                <input type="text" placeholder="Nº residencial" maxLength={9} />
              </div>
            </form>
          </section>

          <section className='purchase-details'>
            <h5>Detalhes da compra:</h5>
            <p style={{ display: 'block', marginBottom: '2vh' }}>Item: <span>Camiseta - Tamanho M</span></p>
            <p>Preço: R$10,00</p>
            <p>Quantidade de parcelas: <span>10 X</span></p>
            <p>Entrega Estimada: <span>15 de maio de 2024</span></p>
            <p>pagar.me</p>
            <p className='total-diviser'></p>
            <p className='total'>Total: <span>10 X de R$10,00</span></p>
            <div>
              <label><input type='checkbox'/>Ao marcar esta opção, você concorda com os <a href='#'>Termos de Serviço</a>.</label>
            </div>
            <button type='button'>
              Finalizar compra
            </button>
          </section>
        </div>
      </main>

      <Footer/>
    </>
  )
}
