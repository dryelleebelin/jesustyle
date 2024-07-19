import React from "react"
import './custommodal.scss'
import Modal from 'react-modal'

import logo from '../../assets/logos/transparent.png'

import { IoClose  } from "react-icons/io5"

export default function CustomModal({ isOpen, closeModal, headerText, paragraphText, spanText }){
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
          <h2>{headerText}</h2>
          <p>{paragraphText}</p>
          {spanText && <span>{spanText}</span>}
        </div>
      </div>
    </Modal>
  )
}