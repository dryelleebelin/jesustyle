import React, { useState, useEffect } from "react"
import './account.scss'

import Header from '../../components/Header'
import Footer from '../../components/Footer'

import shirt1 from '../../assets/mockups/shirt3.png'
import shirt2 from '../../assets/mockups/shirt4.png'
import shirt3 from '../../assets/mockups/shirt.png'

import { FcHome } from "react-icons/fc"
import { IoMdCheckmarkCircleOutline } from "react-icons/io"
import { FaCog, FaTruck, FaCheckCircle, FaClock, FaInfoCircle, FaCalendarAlt } from 'react-icons/fa'
import { FaRegStar, FaStar } from "react-icons/fa6"
import { MdOutlinePhotoCamera } from "react-icons/md"

import {
  Step,
  StepDescription,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  StepTitle,
  Stepper,
  useSteps,
  Box
} from '@chakra-ui/react'

export default function Account(){
  const [selectedItem, setSelectedItem] = useState("Detalhes da Conta")
  const [hasAddress, setHasAddress] = useState(false)
  const [showAddAddressForm, setShowAddAddressForm] = useState(false)
  const [useAsDefault, setUseAsDefault] = useState(false)
  const [filteredOrders, setFilteredOrders] = useState([])
  const [orders, setOrders] = useState([
    {
      id: 1,
      date: "2023-05-12",
      status: "Entregue",
      items: [
        { name: "Produto 1", quantity: 1, price: 100 },
        { name: "Produto 2", quantity: 2, price: 50 },
      ],
      total: 200,
      deliveryInfo: {
        name: "João da Silva",
        address: "Rua XYZ, 123",
        estimatedDelivery: "2023-05-15"
      }
    },
    {
      id: 2,
      date: "2023-05-14",
      status: "Entregue",
      items: [
        { name: "Produto 1", quantity: 1, price: 100 },
        { name: "Produto 2", quantity: 2, price: 50 },
      ],
      total: 100,
      deliveryInfo: {
        name: "Maria Oliveira",
        address: "Av. ABC, 456",
        estimatedDelivery: "2023-05-17"
      }
    },
    {
      id: 3,
      date: "2023-05-14",
      status: "Em Andamento",
      items: [
        { name: "Produto 3", quantity: 1, price: 150 },
      ],
      total: 150,
      deliveryInfo: null
    },
    {
      id: 4,
      date: "2023-05-16",
      status: "Pedido Feito",
      items: [
        { name: "Produto 4", quantity: 1, price: 200 },
      ],
      total: 200,
      deliveryInfo: null 
    },
    {
      id: 5,
      date: "2023-05-18",
      status: "Despachado",
      items: [
        { name: "Produto 5", quantity: 1, price: 250 },
      ],
      total: 250,
      deliveryInfo: {
        name: "José Santos",
        address: "Rua ABC, 789",
        estimatedDelivery: "2023-05-20"
      }
    },
  ])
  const [userOrders, setUserOrders] = useState([
    {
      id: 1,
      image: shirt1,
      name: "Produto 1",
      size: "M",
      quantity: 1,
      price: 100,
      status: "Ativo"
    },
    {
      id: 2,
      image: shirt2,
      name: "Produto 2",
      size: "L",
      quantity: 2,
      price: 50,
      status: "Ativo"
    },
    {
      id: 3,
      image: shirt3,
      name: "Produto 2",
      size: "L",
      quantity: 2,
      price: 50,
      status: "Concluído"
    }
  ])
  
  
  const [selectedTab, setSelectedTab] = useState("active")
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [selectedUserOrderStatus, setSelectedUserOrderStatus] = useState("")
  const [selectedOrderStatus, setSelectedOrderStatus] = useState("")
  const [showOrderDetails, setShowOrderDetails] = useState(false)

  const [showCommentForm, setShowCommentForm] = useState(false)
  const [showAddCommentButton, setShowAddCommentButton] = useState(true)
  const [rating, setRating] = useState(0)
  const [review, setReview] = useState("")
  const [photo, setPhoto] = useState(null)
  const [errorMessage, setErrorMessage] = useState("")
  const forbiddenWords = [
    "merda",
    "porra",
    "caralho",
    "bosta",
    "puta",
    "piranha",
    "arrombado",
    "viado",
    "fdp",
    "foda-se",
    "desgraça",
    "cacete",
    "buceta",
    "cu",
    "retardado",
    "idiota",
    "imbecil",
    "escroto",
    "puta que pariu",
    "vai se foder",
    "babaca",
    "vagabundo",
    "corno",
    "escória",
    "bobalhão",
    "lixo",
    "trouxa",
    "otário",
    "palhaço",
    "cabeça de vento",
    "paspalho"
  ]  
  const steps = [
    { status: 'Pedido feito', date: '23/08/2023 12:20' },
    { status: 'Em andamento', date: '23/08/2023 19:03' },
    { status: 'Enviado', date: '02/09/2023 14:40' },
    { status: 'Entregue', date: '03/09/2023 08:15' }
  ]

  const { activeStep } = useSteps({
    index: 1,
    count: steps.length,
  })

  useEffect(() => {
    setFilteredOrders(orders)
  }, [orders])

  const handleItemClick = (item) => {
    setSelectedItem(item)
    setSelectedOrder(null)
    setSelectedOrderStatus("")
  }

  const handleOrderClick = (order) => {
    setSelectedOrder(order)
  }

  const handleAddAddressClick = () => {
    setShowAddAddressForm(true)
  }

  const handleAddressFormSubmit = (e) => {
    e.preventDefault()
    setHasAddress(true)
    setShowAddAddressForm(false)
  }

  const handleUseAsDefaultChange = (e) => {
    setUseAsDefault(e.target.checked)
  }

  const handleStatusFilter = (selectedOrderStatus) => {
    setSelectedOrderStatus(selectedOrderStatus)
    if (selectedOrderStatus === "") {
      setFilteredOrders(orders)
    } else {
      const filtered = orders.filter((order) => order.status === selectedOrderStatus)
      setFilteredOrders(filtered)
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Pedido Feito':
        return <FaClock style={{ color: 'orange' }} />
      case 'Em Andamento':
        return <FaCog style={{ color: 'blue' }} />
      case 'Despachado':
        return <FaTruck style={{ color: 'purple' }} />
      case 'Entregue':
        return <FaCheckCircle style={{ color: 'green' }} />
      default:
        return null
    }
  }

  useEffect(() => {
    document.title = "Jesustyle | Minha Conta"
  }, [])

  useEffect(() => {
    handleStatusFilter(selectedUserOrderStatus, true)
  }, [selectedUserOrderStatus, userOrders])

  useEffect(() => {
    handleStatusFilter(selectedOrderStatus, false)
  }, [selectedOrderStatus, orders])

  const handleTrackOrder = () => {
    setShowOrderDetails(true)
    setUserOrders(userOrders.filter(order => order.status !== "Ativo"))
  }

  const handleAddCommentClick = () => {
    setShowCommentForm(true)
    setShowAddCommentButton(false)
  }

  const handleCancelComment = () => {
    setShowCommentForm(false)
    setRating(0)
    setReview("")
    setPhoto(null)
    setShowAddCommentButton(true)
  }

  const handleRatingChange = (newRating) => {
    setRating(newRating)
  }

  const handleReviewChange = (e) => {
    setReview(e.target.value)
  }

  const handlePhotoChange = (e) => {
    const file = e.target.files[0]
    if(file){
      setPhoto(file.name)
    }
  }

  const containsForbiddenWords = (text) => {
    const words = text.split(/\s+/);
    return words.some(word => forbiddenWords.includes(word.toLowerCase()))
  }

  const handleSubmitComment = (e) => {
    e.preventDefault()
    if (containsForbiddenWords(review)){
      setErrorMessage("Seu comentário contém linguagem inadequada. Por favor, revise e tente novamente!")
    } else{
      setShowCommentForm(false)
      setErrorMessage("")
      setRating(0)
      setReview("")
      setPhoto(null)
    }
  }

  return (
    <>
      <Header />

      <main className="account">
        <aside>
          <h6>Conta</h6>
          <p className={selectedItem === "Detalhes da Conta" ? "active" : ""} onClick={() => handleItemClick("Detalhes da Conta")}>Detalhes da Conta</p>
          <p className={selectedItem === "Endereço" ? "active" : ""} onClick={() => handleItemClick("Endereço")}>Endereço</p>
          <p className={selectedItem === "Meus Pedidos" ? "active" : ""} onClick={() => handleItemClick("Meus Pedidos")}>Meus Pedidos</p>
          <p className={selectedItem === "Gerenciamento de Pedidos" ? "active" : ""} onClick={() => handleItemClick("Gerenciamento de Pedidos")}><FaCog/> Gerenciamento</p>
        </aside>

        <article>
          {selectedItem === "Detalhes da Conta" && (
            <>
              <h2>Detalhes da Conta</h2>
              <span>email@email.com <p>Membro</p></span>
              <form>
                <div>
                  <label>Nome completo:</label>
                  <input type="text" placeholder="Digite seu nome completo" />
                </div>
                <div>
                  <label>Data de nascimento:</label>
                  <input type="date" />
                </div>
                <div>
                  <label>CPF:</label>
                  <input type="text" placeholder="Digite seu CPF" />
                </div>
                <div>
                  <label>Telefone:</label>
                  <input type="tel" placeholder="(**) *****-****" />
                </div>
                <div className="container-button">
                  <button type="button">Salvar alterações</button>
                </div>
              </form>
            </>
          )}

          {selectedItem === "Endereço" && (
            <article>
              <h2>Endereço { !hasAddress && <button type="button" onClick={handleAddAddressClick} disabled={showAddAddressForm}>Adicionar</button> }</h2>
              {hasAddress ? (
                <section className="not-found">
                  <div>
                    <FcHome />
                    <p>Endereço de entrega padrão <span>rua, cidade, estado - cep</span></p>
                  </div>
                  <IoMdCheckmarkCircleOutline />
                </section>
              ) : (
                showAddAddressForm ? (
                  <form onSubmit={handleAddressFormSubmit}>
                    <div style={{width: window.innerWidth <= 480 ? '100%' : '31%'}}>
                      <label>CEP:</label>
                      <input type="text" placeholder="Digite seu CEP" />
                    </div>
                    <div style={{width: window.innerWidth <= 480 ? '100%' : '31%'}}>
                      <label>Estado:</label>
                      <input type="text" placeholder="Estado" />
                    </div>
                    <div style={{width: window.innerWidth <= 480 ? '100%' : '31%'}}>
                      <label>Cidade:</label>
                      <input type="text" placeholder="Cidade" />
                    </div>
                    <div style={{width: window.innerWidth <= 480 ? '100%' : '41%'}}>
                      <label>Rua:</label>
                      <input type="text" placeholder="Rua" />
                    </div>
                    <div style={{width: window.innerWidth <= 480 ? '100%' : '21%'}}>
                      <label>Nº residencial:</label>
                      <input type="text" placeholder="Nº residencial" />
                    </div>
                    <div style={{width: window.innerWidth <= 480 ? '100%' : '31%'}}>
                      <label>Complemento</label>
                      <input type="text" placeholder="Complemento" />
                    </div>
                    <div className="use-as-default">
                      <input type="checkbox" id="useAsDefault" checked={useAsDefault} onChange={handleUseAsDefaultChange} />
                      <label htmlFor="useAsDefault">Usar como endereço padrão</label>
                    </div>
                    <div className="container-button">
                      <button type="submit">Adicionar endereço</button>
                    </div>
                  </form>
                ) : (
                  <span className="not-found">Nenhum endereço encontrado.</span>
                )
              )}
            </article>
          )}

          {selectedItem === "Meus Pedidos" && (
            <article className="article-user-orders">
              <h2>Meus Pedidos</h2>
              {!showOrderDetails && !showCommentForm && (
                <div className="order-tabs">
                  <button className={selectedTab === "active" ? "active" : ""} onClick={() => setSelectedTab("active")}>Ativos</button>
                  <button className={selectedTab === "completed" ? "active" : ""} onClick={() => setSelectedTab("completed")}>Concluídos</button>
                </div>
              )}
              {!showCommentForm && selectedTab === "active" && !showOrderDetails && (
                <ul>
                  {userOrders.filter(order => order.status === "Ativo").length === 0 ? (
                    <span>Você não possui pedidos ativos.</span>
                  ) : (
                    userOrders.filter(order => order.status === "Ativo").map((order) => (
                      <li key={order.id}>
                        <div className="order-item">
                          <img src={order.image} alt={order.name} />
                          <div>
                            <p>{order.name}</p>
                            <p>Tamanho: {order.size} | Quantidade: {order.quantity}</p>
                            <p>R${order.price.toFixed(2).replace('.', ',')}</p>
                          </div>
                        </div>
                        <button onClick={handleTrackOrder}>Acompanhar pedido</button>
                      </li>
                    ))
                  )}
                </ul>
              )}
              {showOrderDetails && (
                <div className="order-details">
                  <h3>Detalhes do pedido</h3>
                  <div>
                    <p>Data prevista de entrega <span>03 de set 2024</span></p>
                    <p>ID de rastreamento <span>3AS28121AW91</span></p>
                  </div>
                  <h3>Status do pedido</h3>
                  <Stepper size='lg' colorScheme='red' index={activeStep} style={{fontSize: '14px', display: 'flex', flexDirection: 'row'}}>
      {steps.map((step, index) => (
        <Step key={index}>
          <StepIndicator>
           <StepStatus
           complete={`✅`}
           incomplete={`🚚`}
           active={<StepNumber />}
/>

          </StepIndicator>

          <Box flexShrink='0'>
            <StepTitle>{step.description}</StepTitle>
            <StepDescription>{step.date}</StepDescription>
          </Box>

          <StepSeparator/>
        </Step>
      ))}
    </Stepper>
                  <button type="button">Voltar</button>
                </div>
              )}
              {!showCommentForm && selectedTab === "completed" && (
                <ul>
                  {userOrders.filter(order => order.status === "Concluído").length === 0 ? (
                    <span>Você não possui pedidos concluídos.</span>
                  ) : (
                    userOrders.filter(order => order.status === "Concluído").map((order) => (
                      <li key={order.id}>
                        <div className="order-item">
                          <img src={order.image} alt={order.name} />
                          <div>
                            <p>{order.name}</p>
                            <p>Tamanho: {order.size} | Quantidade: {order.quantity}</p>
                            <p>R${order.price.toFixed(2).replace('.', ',')}</p>
                          </div>
                        </div>
                        {showAddCommentButton ? (
                          <button onClick={handleAddCommentClick}>Adicionar Avaliação</button>
                        ) : (
                          <p className="p-revision">Avaliação em revisão</p>
                        )}
                      </li>
                    ))
                  )}
                </ul>
              )}
              {showCommentForm && (
                <div className="comment-form">
                  <h3>Como está seu pedido?</h3>
                  <form>
                    <p>Sua avaliação geral:</p>
                    <div className="rating">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <span key={star} onClick={() => handleRatingChange(star)}>
                          {star <= rating ? <FaStar /> : <FaRegStar />}
                        </span>
                      ))}
                    </div>
                    <p>Adicionar revisão detalhada:</p>
                    <textarea id="review" value={review} onChange={handleReviewChange} placeholder="Digite sua revisão detalhada aqui"></textarea>
                    {errorMessage && <p className="error-message">{errorMessage}</p>}
                    <div className="photo-upload">
                      <input type="file" id="photo" accept="image/*" onChange={handlePhotoChange}/>
                      <p onClick={() => document.getElementById('photo').click()}><MdOutlinePhotoCamera/> Adicionar foto</p>
                      {photo && <span>Selecionado: {photo}</span>}
                    </div>
                    <div className="buttons">
                      <button type="button" onClick={handleCancelComment}>Cancelar</button>
                      <button type="button" onClick={handleSubmitComment}>Enviar avaliação</button>
                    </div>
                  </form>
                </div>
              )}
            </article>
          )}

          {selectedItem === "Gerenciamento de Pedidos" && (
            <article>
              <h2>Gerenciamento de Pedidos</h2>
              {selectedOrder ? (
                <div className="order-details">
                  <h3>Detalhes do pedido #{selectedOrder.id}</h3>
                  <p className="p-1"><FaCalendarAlt style={{ color: '#007bff' }}/> Data do pedido: <span>{new Date(selectedOrder.date).toLocaleDateString('pt-BR')}</span></p>
                  <p className="p-1"><FaInfoCircle style={{ color: '#28a745' }}/> Status do pedido: <span>{selectedOrder.status}</span></p>
                  <ul>
                    {selectedOrder.items.map((item, index) => (
                      <li key={index}>
                        {item.name} - Quantidade: {item.quantity} - Preço unitário: R${item.price.toFixed(2).replace('.', ',')}
                      </li>
                    ))}
                    <p>Total: R${selectedOrder.total.toFixed(2).replace('.', ',')}</p>
                  </ul>
                  {selectedOrder.deliveryInfo ? (
                    <>
                      <h4>Informações de entrega <FaTruck/></h4>
                      <p>Nome do cliente: {selectedOrder.deliveryInfo.name}</p>
                      <p>Endereço de entrega: {selectedOrder.deliveryInfo.address}</p>
                      <p>Data de entrega estimada: {selectedOrder.deliveryInfo.estimatedDelivery}</p>
                    </>
                  ) : (
                    <>
                      <h4>Informações de Entrega <FaTruck/></h4>
                      <p>Informações de entrega não disponíveis.</p>
                    </>
                  )}
                  <button onClick={() => setSelectedOrder(null)}>Voltar</button>
                </div>            
              ) : (
                <>
                  <span>{orders.length} pedido{orders.length !== 1 ? 's' : ''}
                    <select value={selectedOrderStatus} onChange={(e) => handleStatusFilter(e.target.value)}>
                      <option value="">Todos os status</option>
                      <option value="Pedido Feito">Pedido Feito</option>
                      <option value="Em Andamento">Em Andamento</option>
                      <option value="Despachado">Despachado</option>
                      <option value="Entregue">Entregue</option>
                    </select>
                  </span>
                  <ul className="orders">
                    {filteredOrders.map((order) => (
                      <li key={order.id} onClick={() => handleOrderClick(order)}>
                        <span>{getStatusIcon(order.status)}</span>
                        <span className="order-number">Pedido #{order.id}</span>
                        <span>{new Date(order.date).toLocaleDateString('pt-BR')}</span>
                        <p>Valor: R${order.total.toFixed(2).replace('.', ',')}</p>
                        <span className="order-status">{order.status}</span>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </article>
          )}
        </article>
      </main>

      <Footer />
    </>
  )
}
