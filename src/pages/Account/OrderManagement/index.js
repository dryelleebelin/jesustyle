import React, { useState, useEffect } from "react"
import './ordermanagement.scss'
import '../account.scss'

import { FaTruck, FaInfoCircle, FaCalendarAlt, FaCog, FaCheckCircle, FaClock } from 'react-icons/fa'

const OrderDetails = ({ order, onBack }) => (
  <div className="order-details">
    <h3>Detalhes do pedido #{order.id}</h3>
    <p className="p-1"><FaCalendarAlt style={{ color: '#007bff' }} /> Data do pedido: <span>{new Date(order.date).toLocaleDateString('pt-BR')}</span></p>
    <p className="p-1"><FaInfoCircle style={{ color: '#28a745' }} /> Status do pedido: <span>{order.status}</span></p>
    <ul>
      {order.items.map((item, index) => (
        <li key={index}>
          {item.name} - Quantidade: {item.quantity} - Preço unitário: R${item.price.toFixed(2).replace('.', ',')}
        </li>
      ))}
      <p>Total: R${order.total.toFixed(2).replace('.', ',')}</p>
    </ul>
    {order.deliveryInfo ? (
      <>
        <h4>Informações de entrega <FaTruck /></h4>
        <p>Nome do cliente: {order.deliveryInfo.name}</p>
        <p>Endereço de entrega: {order.deliveryInfo.address}</p>
        <p>Data de entrega estimada: {order.deliveryInfo.estimatedDelivery}</p>
      </>
    ) : (
      <>
        <h4>Informações de Entrega <FaTruck /></h4>
        <p>Informações de entrega não disponíveis.</p>
      </>
    )}
    <button onClick={onBack}>Voltar</button>
  </div>
)

const OrderList = ({ orders, onOrderClick, selectedOrderStatus, onStatusFilterChange }) => (
  <>
    <span>{orders.length} pedido{orders.length !== 1 ? 's' : ''}
      <select value={selectedOrderStatus} onChange={(e) => onStatusFilterChange(e.target.value)}>
        <option value="">Todos os status</option>
        <option value="Pedido Feito">Pedido Feito</option>
        <option value="Em Andamento">Em Andamento</option>
        <option value="Despachado">Despachado</option>
        <option value="Entregue">Entregue</option>
      </select>
    </span>
    <ul className="orders">
      {orders.map((order) => (
        <li key={order.id} onClick={() => onOrderClick(order)}>
          <span>{getStatusIcon(order.status)}</span>
          <span className="order-number">Pedido #{order.id}</span>
          <span>{new Date(order.date).toLocaleDateString('pt-BR')}</span>
          <p>Valor: R${order.total.toFixed(2).replace('.', ',')}</p>
          <span className="order-status">{order.status}</span>
        </li>
      ))}
    </ul>
  </>
)

const getStatusIcon = (status) => {
  switch (status) {
    case 'Pedido Feito':
      return <FaClock style={{ color: 'orange' }}/>
    case 'Em Andamento':
      return <FaCog style={{ color: 'blue' }}/>
    case 'Despachado':
      return <FaTruck style={{ color: 'purple' }}/>
    case 'Entregue':
      return <FaCheckCircle style={{ color: 'green' }}/>
    default:
      return null
  }
}

export default function OrderManagement(){
  const [filteredOrders, setFilteredOrders] = useState([])
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [selectedOrderStatus, setSelectedOrderStatus] = useState("")
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

  const handleStatusFilter = (status) => {
    setSelectedOrderStatus(status);
    if (status === "") {
      setFilteredOrders(orders);
    } else {
      const filtered = orders.filter((order) => order.status === status);
      setFilteredOrders(filtered);
    }
  }

  const handleOrderClick = (order) => {
    setSelectedOrder(order)
  }

  useEffect(() => {
    handleStatusFilter(selectedOrderStatus)
  }, [selectedOrderStatus, orders])

  useEffect(() => {
    setFilteredOrders(orders)
  }, [orders])

  return (
    <article>
      <h2>Gerenciamento de Pedidos</h2>
      {selectedOrder ? (
        <OrderDetails order={selectedOrder} onBack={() => setSelectedOrder(null)}/>
      ) : (
        <OrderList
          orders={filteredOrders}
          onOrderClick={handleOrderClick}
          selectedOrderStatus={selectedOrderStatus}
          onStatusFilterChange={handleStatusFilter}
        />
      )}
    </article>
  )
}
