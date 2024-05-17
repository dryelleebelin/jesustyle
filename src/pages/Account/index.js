import React, { useState } from "react"
import './account.scss'

import Header from '../../components/Header'
import Footer from '../../components/Footer'

import { FcHome } from "react-icons/fc"
import { BsFillHouseCheckFill, BsHouseFill } from "react-icons/bs"
import { IoMdCheckmarkCircleOutline } from "react-icons/io"

export default function Account(){
  const [selectedItem, setSelectedItem] = useState("Detalhes da Conta")
  const [hasAddress, setHasAddress] = useState(false)
  const [showAddAddressForm, setShowAddAddressForm] = useState(false)
  const [useAsDefault, setUseAsDefault] = useState(false)

  const handleItemClick = (item) => {
    setSelectedItem(item)
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

  return (
    <>
      <Header/>

      <main className="account">
        <aside>
          <h6>Conta</h6>
          <p className={selectedItem === "Detalhes da Conta" ? "active" : ""} onClick={() => handleItemClick("Detalhes da Conta")}>Detalhes da Conta</p>
          <p className={selectedItem === "Endereço" ? "active" : ""} onClick={() => handleItemClick("Endereço")}>Endereço</p>
          <p className={selectedItem === "Gerenciamento de Pedidos" ? "active" : ""} onClick={() => handleItemClick("Gerenciamento de Pedidos")}>Gerenciamento de Pedidos</p>
        </aside>

        <article>
          {selectedItem === "Detalhes da Conta" && (
            <>
              <h2>Detalhes da Conta</h2>
              <span>email@email.com <p>Membro</p></span>
              <form>
                <div>
                  <label>Nome completo:</label>
                  <input type="text" placeholder="Digite seu nome completo"/>
                </div>
                <div>
                  <label>Data de nascimento:</label>
                  <input type="date"/>
                </div>
                <div>
                  <label>CPF:</label>
                  <input type="text" placeholder="Digite seu CPF"/>
                </div>
                <div>
                  <label>Telefone:</label>
                  <input type="tel" placeholder="(**) *****-****"/>
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
                  <p>icon</p>
                  <div>
                    <p>Endereço de entrega padrão</p>
                    <p>rua, cidade, estado - cep</p>
                  </div>
                  <p>icon ok</p>
                </section>
              ) : (
                showAddAddressForm ? (
                  <form onSubmit={handleAddressFormSubmit}>
                    <div style={{width: '31%'}}>
                      <label>CEP:</label>
                      <input type="text" placeholder="Digite seu CEP"/>
                    </div>
                    <div style={{width: '31%'}}>
                      <label>Estado:</label>
                      <input type="text" placeholder="Estado"/>
                    </div>
                    <div style={{width: '31%'}}>
                      <label>Cidade:</label>
                      <input type="text" placeholder="Cidade"/>
                    </div>
                    <div style={{width: '41%'}}>
                      <label>Rua:</label>
                      <input type="text" placeholder="Rua"/>
                    </div>
                    <div style={{width: '21%'}}>
                      <label>Nº residencial:</label>
                      <input type="text" placeholder="Nº residencial"/>
                    </div>
                    <div style={{width: '31%'}}>
                      <label>Complemento</label>
                      <input type="text" placeholder="Complemento"/>
                    </div>
                    <div className="use-as-default">
                      <input type="checkbox" id="useAsDefault" checked={useAsDefault} onChange={handleUseAsDefaultChange}/>
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
            </article>
          )}
        </article>
      </main>

      <Footer/>
    </>
  )
}