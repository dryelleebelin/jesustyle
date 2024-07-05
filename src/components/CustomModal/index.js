import React from "react"
import './custommodal.scss'
import Modal from 'react-modal'

import { IoClose } from "react-icons/io5"

export default function CustomModal({ isOpen, closeModal }){
  const customStyles = {
    content: {
      top: '50%',
      bottom: 'auto',
      left: '50%',
      right: 'auto',
      padding: '0',
      backgroundColor: 'transparent',
      transform: 'translate(-50%, -50%)'
    }
  }

  return (
    <Modal style={customStyles} isOpen={isOpen} onRequestClose={closeModal}>
      <div className="container-modal">
        <IoClose onClick={closeModal} className="close"/>
      </div>
    </Modal>
  )
}