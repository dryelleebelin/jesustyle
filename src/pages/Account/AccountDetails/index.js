import React from "react"
import '../account.scss'

export default function AccountDetails(){
  return(
    <article>
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
    </article>
  )
}