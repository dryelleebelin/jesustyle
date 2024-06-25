import React, { useState } from 'react'
import './payment.scss'
import { Link, useNavigate } from "react-router-dom"
import { Breadcrumb, BreadcrumbItem } from "@chakra-ui/react"

import Header from '../../components/Header'
import Footer from '../../components/Footer'

import pagarme from '../../assets/seloPagarX.png'
import item1 from '../../assets/mockups/shirt.png'
import item2 from '../../assets/mockups/shirt1.png'

import { IoClose } from "react-icons/io5"
import { FaAngleRight } from "react-icons/fa"
import { BsFillCreditCardFill, BsFillPersonPlusFill } from 'react-icons/bs'

export default function Payment(){
  const navigate = useNavigate()
  const [desconto, setDesconto] = useState(0)
  const [cupom, setCupom] = useState('')
  const [botaoTexto, setBotaoTexto] = useState('Validar')
  const [botaoCor, setBotaoCor] = useState('')
  const botaoClassName = botaoCor === 'green' ? 'botao-validar' : (botaoCor === 'red' ? 'botao-remover' : '')
  const [loading, setLoading] = useState(false)

  const [products, setProducts] = useState([
    { id: 1, name: 'Produto 1', price: 50, quantity: 1, src: item1, size: 'P' },
    { id: 2, name: 'Produto 2', price: 80, quantity: 1, src: item2, size: 'M' }
  ])  

  const total = products.reduce((acc, curr) => acc + curr.price * curr.quantity, 0)
  const sizes = ["PP", "P", "M", "G"]
  const totalComDesconto = (total - desconto).toFixed(2).replace('.', ',')

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

  const handleChangeCupom = (event) => {
    const selectedValue = event.target.value
    setCupom(selectedValue)
  }

  const handleBotaoClick = () => {
    if (botaoTexto === 'Validar') {
      if (cupomValido(cupom)) {
        aplicarDesconto(cupom)
        setBotaoTexto('Remover')
        setBotaoCor('red')
      } else {
        alert('Cupom inválido')
      }
    } else if (botaoTexto === 'Remover') {
      removerDesconto()
      setCupom('')
      setBotaoTexto('Validar')
      setBotaoCor('')
    }
  }
  
  

  const cupomValido = (cupom) => {
    const cuponsValidos = ['DESCONTO10', 'PROMO20']
    return cuponsValidos.includes(cupom)
  }

  const aplicarDesconto = (cupom) => {
    let descontoValor = 0
    if (cupom === 'DESCONTO10') {
      descontoValor = total * 0.1
    } else if (cupom === 'PROMO20') {
      descontoValor = total * 0.2
    }
    setDesconto(descontoValor)
    setProducts(products.map(product => ({
      ...product,
      price: product.price - (product.price * (descontoValor / total))
    })))
  }

  const removerDesconto = () => {
    setProducts(products.map(product => {
      if (cupom === 'DESCONTO10') {
        return { ...product, price: product.price / 0.9 }
      } else if (cupom === 'PROMO20') {
        return { ...product, price: product.price / 0.8 }
      }
      return product
    }))
    setDesconto(0)
  }

  const handlePayment = () => {
    setLoading(true)

    setTimeout(() => {
      setLoading(false)
      navigate('/products')
      alert('Pagamento realizado com sucesso!')
    }, 2000)
  }

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

              <div style={{width: window.innerWidth <= 480 ? '100%' : '48%'}}>
                <label htmlFor="cardName">Nome no cartão:</label>
                <input type="text" id="cardName" placeholder="Nome no cartão"/>
              </div>
              <div style={{width: window.innerWidth <= 480 ? '100%' : '50%'}}>
                <label htmlFor="cardNumber">Número do Cartão:</label>
                <input type="text" id="cardNumber" placeholder="Número do Cartão"/>
              </div>
              <div style={{width: window.innerWidth <= 480 ? '100%' : '32%'}}>
                <label htmlFor="expiryDate">Data de Validade:</label>
                <input type="text" id="expiryDate" placeholder="MM/AA" maxLength="5"/>
              </div>
              <div style={{width: window.innerWidth <= 480 ? '100%' : '32%'}}>
                <label htmlFor="cvv">CVV:</label>
                <input type="text" id="cvv" maxLength="3" placeholder="CVV"/>
              </div>
              <div style={{width: window.innerWidth <= 480 ? '100%' : '32%'}}>
                <label htmlFor="installments">Número de parcelas:</label>
                <select id="installments">
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
              <div style={{width: window.innerWidth <= 480 ? '100%' : '48%'}}>
                <label>CPF:</label>
                <input type="text" placeholder="CPF" maxLength="14" />
              </div>
              <div style={{width: window.innerWidth <= 480 ? '100%' : '50%'}}>
                <label>Telefone:</label>
                <input type="tel" placeholder="(**) *****-****" maxLength={14} />
              </div>
              <div style={{width: window.innerWidth <= 480 ? '100%' : '48%'}}>
                <label>CEP:</label>
                <input type="text" placeholder="CEP" maxLength={9} />
              </div>
              <div style={{width: window.innerWidth <= 480 ? '100%' : '50%'}}>
                <label>Nº residencial:</label>
                <input type="text" placeholder="Nº residencial" maxLength={9} />
              </div>
            </form>
          </section>

          <section className='purchase-details'>
            <h1>Detalhes da compra:</h1>
            <aside className="product-body">
              <ul>
                {products.map(product => (
                  <li key={product.id}>
                    <img src={product.src} alt={product.name} />
                    <div className='details'>
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
            </aside>
            <p className='total-diviser purchase-details-p'></p>
            <p className='purchase-details-p'>Parcelamento: <span>10 X</span></p>
            <p className='purchase-details-p'>Entrega Estimada: <span>15 de maio de 2024</span></p>
            <p className='purchase-details-p'>Local de Entrega: <span>rua, cidade, estado - cep</span></p>
            <img className='purchase-details-img' src={pagarme}/>
            <p className='total-diviser purchase-details-p'></p>
            <p className='total purchase-details-p'>
              Total: <span>
                {desconto > 0 && <h6 className='perc-desconto'>- R$ {desconto.toFixed(2).replace('.', ',')}</h6>}
                R$ {(total - desconto).toFixed(2).replace('.', ',')}
              </span>
            </p>
            <div className='cupom-de-desconto'>
              <p>Código de cupom</p>
              <div>
                <input type='text' value={cupom} onChange={handleChangeCupom}/>
                <button className={botaoClassName} onClick={handleBotaoClick}>{botaoTexto}</button>
              </div>
            </div>
            <div>
              <label><input type='checkbox'/>Ao marcar esta opção, você concorda com os <a href='#'>Termos de Serviço</a>.</label>
            </div>
            <button type='button' onClick={handlePayment} disabled={loading}>
              {loading ? 'Processando...' : 'Finalizar compra'}
            </button>
          </section>
        </div>
      </main>

      <Footer/>
    </>
  )
}
