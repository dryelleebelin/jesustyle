import React, { useState, useEffect } from "react"
import './ordermanagement.scss'
import '../account.scss'
import { products } from "../../AllProducts"

import camisetaTrustInTheLordFront from '../../../assets/products/CamisetaTrustInTheLordFront.png'
import camisetaGodisGoodFront from '../../../assets/products/CamisetaGodisGoodFront.png'
import camisetaJesusLovesYouFront from '../../../assets/products/CamisetaJesusLovesYouFront.png'
import moletomLikeJesusFront from '../../../assets/products/MoletomLikeJesusFront.png'
import moletomGolaCarecaJesusSaves from '../../../assets/products/MoletomGolaCarecaJesusSaves.png'
import calcaMoletomJesusSaves from '../../../assets/products/CalcaMoletomJesusSaves.png'

import { FaTruck, FaInfoCircle, FaCalendarAlt, FaCog, FaCheckCircle, FaClock, FaDollarSign } from 'react-icons/fa'

const OrderDetails = ({ order, onBack }) => (
  <div className="order-details">
    <h3>Detalhes do pedido #{order.id}</h3>
    <p className="p-1"><FaCalendarAlt style={{ color: '#007bff' }} /> Data do pedido: <span>{new Date(order.date).toLocaleDateString('pt-BR')}</span></p>
    <p className="p-1"><FaInfoCircle style={{ color: '#28a745' }} /> Status do pedido: <span>{order.status}</span></p>
    <p className="p-1"><FaDollarSign style={{ color: '#1e3a8a' }} /> Total: R${order.total.toFixed(2).replace('.', ',')}</p>
    <ul className="order-details-management">
      <div>
        {order.items.map((item, index) => (
          <li key={index}>
            {Array.isArray(item.src) ? item.src.map((imageSrc, imgIndex) => (
              <img key={imgIndex} src={imageSrc} width={100} />
            )) : (
              <img src={item.src} width={100} />
            )}
            <div>
              <p>{item.name}</p>
              <p>Quantidade: {item.quantity}</p>
              <p>Tamanho: {item.size}</p>
              <p>Preço unitário: R${item.price.toFixed(2).replace('.', ',')}</p>
            </div>
          </li>
        ))}
      </div>
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

const ProductList = ({ products }) => (
  <div className="product-management">
    <h3>Lista de Produtos</h3>
    <ul>
      {products.map((product) => (
        <li className="item" key={product.id}>
          <img src={product.src}/>
          <p>{product.name}</p>
        </li>
      ))}
    </ul>
  </div>
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
  const [activeTab, setActiveTab] = useState('Pedidos')
  const [orders, setOrders] = useState([
    {
      id: 1,
      date: "2023-05-12",
      status: "Entregue",
      items: [
        { name: "Camiseta Trust In The Lord", quantity: 1, price: 169, src: camisetaTrustInTheLordFront, size: "P" },
        { name: "Camiseta God is Good", quantity: 2, price: 169, src: [ camisetaGodisGoodFront ], size: "M" },
      ],
      total: 338,
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
        { name: "Camiseta God is Good", quantity: 1, price: 169, src: [ camisetaGodisGoodFront ], size: "M" },
        { name: "Moletom Like Jesus", quantity: 2, price: 305, src: [ moletomLikeJesusFront ], size: "G" },
      ],
      total: 474,
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
        { name: "Conjunto Jesus Saves (Moletom + Calça)", quantity: 1, price: 457, src: [ moletomGolaCarecaJesusSaves, calcaMoletomJesusSaves], size: "M" },
      ],
      total: 457,
      deliveryInfo: null
    },
    {
      id: 4,
      date: "2023-05-16",
      status: "Pedido Feito",
      items: [
        { name: "Camiseta Jesus Loves You", quantity: 1, price: 169, src: [ camisetaJesusLovesYouFront ], size: "PP" },
      ],
      total: 169,
      deliveryInfo: null 
    },
    {
      id: 5,
      date: "2023-05-18",
      status: "Despachado",
      items: [
        { name: "Moletom Like Jesus", quantity: 1, price: 305, src: [ moletomLikeJesusFront ], size: "M" },
      ],
      total: 305,
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

  const handleTabChange = (tabName) => {
    setActiveTab(tabName)
  }

  return (
    <article>
      <h2>Gerenciamento de Pedidos</h2>
      <div className="order-tabs">
        <button className={activeTab === 'Pedidos' ? 'active' : ''} onClick={() => handleTabChange('Pedidos')}>Pedidos</button>
        <button className={activeTab === 'Produtos' ? 'active' : ''} onClick={() => handleTabChange('Produtos')}>Produtos</button>
      </div>
      {activeTab === 'Pedidos' ? (
        selectedOrder ? (
          <OrderDetails order={selectedOrder} onBack={() => setSelectedOrder(null)} />
        ) : (
          <OrderList
            orders={filteredOrders}
            onOrderClick={handleOrderClick}
            selectedOrderStatus={selectedOrderStatus}
            onStatusFilterChange={handleStatusFilter}
          />
        )
      ) : (
        <ProductList products={products}/>
      )}
    </article>
  )
}
