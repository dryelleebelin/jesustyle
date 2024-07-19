import React from "react"
import './custommodal.scss'
import Modal from 'react-modal'

import logo from '../../assets/logos/transparent.png'

import { IoClose  } from "react-icons/io5"

export default function CustomModal({ isOpen, closeModal }){
  const customStyles = {
    content: {
      top: '50%',
      bottom: 'auto',
      left: '50%',
      right: 'auto',
      padding: '4%',
      backgroundColor: 'transparent',
      transform: 'translate(-50%, -50%)'
    }
  }

  return (
    <Modal style={customStyles} isOpen={isOpen} onRequestClose={closeModal}>
      <div className="container-custom-modal">
        <IoClose onClick={closeModal} className="close"/>
        <div className="modal-content">
          <img src={logo}/>
          <h2>Compra realizada com sucesso!</h2>
          <p>Agradecemos por escolher nossa loja. Seu pedido está sendo processado e em breve você receberá um e-mail com todos os detalhes da sua compra.</p>
          <span>Se precisar de mais informações ou suporte, não hesite em nos contatar.</span>
        </div>
      </div>
    </Modal>
  )
}