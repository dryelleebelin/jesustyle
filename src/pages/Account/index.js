import React, { useState, useEffect } from "react"
import './account.scss'

import Header from '../../components/Header'
import Footer from '../../components/Footer'

import { FcHome } from "react-icons/fc"
import { IoMdCheckmarkCircleOutline } from "react-icons/io"
import { FaCog, FaTruck, FaCheckCircle, FaClock, FaTimesCircle, FaInfoCircle, FaCalendarAlt } from 'react-icons/fa'

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
  
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [selectedStatus, setSelectedStatus] = useState("")

  useEffect(() => {
    setFilteredOrders(orders)
  }, [orders])

  const handleItemClick = (item) => {
    setSelectedItem(item)
    setSelectedOrder(null)
    setSelectedStatus("")
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

  const handleStatusFilter = (selectedStatus) => {
    setSelectedStatus(selectedStatus)
    if (selectedStatus === "") {
      setFilteredOrders(orders)
    } else {
      const filtered = orders.filter((order) => order.status === selectedStatus)
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

  return (
    <>
      <Header />

      <main className="account">
        <aside>
          <h6>Conta</h6>
          <p className={selectedItem === "Detalhes da Conta" ? "active" : ""} onClick={() => handleItemClick("Detalhes da Conta")}>Detalhes da Conta</p>
          <p className={selectedItem === "Endereço" ? "active" : ""} onClick={() => handleItemClick("Endereço")}>Endereço</p>
          <p className={selectedItem === "Pedidos" ? "active" : ""} onClick={() => handleItemClick("Pedidos")}>Pedidos</p>
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
                <section>
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
                  <span>Nenhum endereço encontrado.</span>
                )
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
                    <select value={selectedStatus} onChange={(e) => handleStatusFilter(e.target.value)}>
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
