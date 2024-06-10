import React, { useState, useEffect } from "react"
import '../account.scss'

import { FcHome } from "react-icons/fc"
import { IoMdCheckmarkCircleOutline } from "react-icons/io"

export default function Address(){
  const [hasAddress, setHasAddress] = useState(false)
  const [showAddAddressForm, setShowAddAddressForm] = useState(false)
  const [useAsDefault, setUseAsDefault] = useState(false)

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

  useEffect(() => {
    if (window.innerWidth <= 480) {
      document.documentElement.style.setProperty('--input-width', '100%')
    } else {
      document.documentElement.style.setProperty('--input-width', '31%')
    }
  }, [])

  return (
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
            <div style={{width: 'var(--input-width)'}}>
              <label>CEP:</label>
              <input type="text" placeholder="Digite seu CEP" />
            </div>
            <div style={{width: 'var(--input-width)'}}>
              <label>Estado:</label>
              <input type="text" placeholder="Estado" />
            </div>
            <div style={{width: 'var(--input-width)'}}>
              <label>Cidade:</label>
              <input type="text" placeholder="Cidade" />
            </div>
            <div style={{width: 'var(--input-width)'}}>
              <label>Rua:</label>
              <input type="text" placeholder="Rua" />
            </div>
            <div style={{width: 'var(--input-width)'}}>
              <label>Nº residencial:</label>
              <input type="text" placeholder="Nº residencial" />
            </div>
            <div style={{width: 'var(--input-width)'}}>
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
  )
}
