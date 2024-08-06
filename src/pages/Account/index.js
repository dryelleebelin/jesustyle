import React, { useState, useEffect } from "react"
import './account.scss'

import Header from '../../components/Header'
import Footer from '../../components/Footer'

import AccountDetails from "./AccountDetails"
import Address from "./Address"
import MyOrders from "./MyOrders"
import OrderManagement from "./OrderManagement"

import { FaCog } from 'react-icons/fa'

export default function Account(){
  const [selectedItem, setSelectedItem] = useState("Detalhes da Conta")

  const handleItemClick = (item) => {
    setSelectedItem(item)
  }

  const renderContent = () => {
    switch (selectedItem) {
      case "Detalhes da Conta":
        return <AccountDetails />
      case "Endereço":
        return <Address />
      case "Meus Pedidos":
        return <MyOrders />
      case "Gerenciamento":
        return <OrderManagement />
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
          <MenuItem label="Detalhes da Conta" 
            selected={selectedItem === "Detalhes da Conta"} 
            onClick={handleItemClick} 
          />
          {/* <MenuItem label="Endereço" 
            selected={selectedItem === "Endereço"} 
            onClick={handleItemClick} 
          /> */}
          <MenuItem label="Meus Pedidos" 
            selected={selectedItem === "Meus Pedidos"} 
            onClick={handleItemClick} 
          />
          <MenuItem label="Gerenciamento" 
            selected={selectedItem === "Gerenciamento"} 
            onClick={handleItemClick} icon={<FaCog />} 
          />
        </aside>

        <article>
          {renderContent()}
        </article>
      </main>

      <Footer/>
    </>
  )
}

const MenuItem = ({ label, selected, onClick, icon }) => (
  <p className={selected ? "active" : ""} onClick={() => onClick(label)}>
    {icon} {label}
  </p>
)