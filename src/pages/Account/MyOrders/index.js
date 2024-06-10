import React, { useState, useEffect, useRef } from "react"
import './myorders.scss'
import '../account.scss'

import shirt1 from '../../../assets/mockups/shirt3.png'
import shirt2 from '../../../assets/mockups/shirt4.png'
import shirt3 from '../../../assets/mockups/shirt.png'

import { FaRegStar, FaStar } from "react-icons/fa6"
import { MdOutlinePhotoCamera } from "react-icons/md"
import { FaClipboardList, FaBox, FaTruck, FaShippingFast } from 'react-icons/fa'
import { BsFillHouseCheckFill } from "react-icons/bs"

export default function MyOrders(){
  const [selectedTab, setSelectedTab] = useState("active")
  const [showOrderDetails, setShowOrderDetails] = useState(false)
  const [showCommentForm, setShowCommentForm] = useState(false)
  const [showAddCommentButton, setShowAddCommentButton] = useState(true)
  const [rating, setRating] = useState(0)
  const [review, setReview] = useState("")
  const [photo, setPhoto] = useState(null)
  const [errorMessage, setErrorMessage] = useState("")
  const [userOrders, setUserOrders] = useState([
    {
      id: 1,
      image: shirt1,
      name: "Produto 1",
      size: "M",
      quantity: 1,
      price: 100,
      status: "Ativo"
    },
    {
      id: 2,
      image: shirt2,
      name: "Produto 2",
      size: "L",
      quantity: 2,
      price: 50,
      status: "Ativo"
    },
    {
      id: 3,
      image: shirt3,
      name: "Produto 2",
      size: "L",
      quantity: 2,
      price: 50,
      status: "Concluído"
    }
  ])
  const forbiddenWords = [
    "merda",
    "porra",
    "caralho",
    "bosta",
    "puta",
    "piranha",
    "arrombado",
    "viado",
    "fdp",
    "foda-se",
    "desgraça",
    "cacete",
    "buceta",
    "cu",
    "retardado",
    "idiota",
    "imbecil",
    "escroto",
    "puta que pariu",
    "vai se foder",
    "babaca",
    "vagabundo",
    "corno",
    "escória",
    "bobalhão",
    "lixo",
    "trouxa",
    "otário",
    "palhaço",
    "cabeça de vento",
    "paspalho"
  ] 

  const handleAddCommentClick = () => {
    setShowCommentForm(true)
    setShowAddCommentButton(false)
  }

  const handleCancelComment = () => {
    setShowCommentForm(false)
    setRating(0)
    setReview("")
    setPhoto(null)
    setShowAddCommentButton(true)
  }

  const handleRatingChange = (newRating) => {
    setRating(newRating)
  }

  const handleReviewChange = (e) => {
    setReview(e.target.value)
  }

  const handlePhotoChange = (e) => {
    const file = e.target.files[0]
    if(file){
      setPhoto(file.name)
    }
  }

  const containsForbiddenWords = (text) => {
    const words = text.split(/\s+/);
    return words.some(word => forbiddenWords.includes(word.toLowerCase()))
  }

  const handleSubmitComment = (e) => {
    e.preventDefault()
    if (containsForbiddenWords(review)){
      setErrorMessage("Seu comentário contém linguagem inadequada. Por favor, revise e tente novamente!")
    } else{
      setShowCommentForm(false)
      setErrorMessage("")
      setRating(0)
      setReview("")
      setPhoto(null)
    }
  }

  const handleTrackOrder = () => {
    setShowOrderDetails(true)
    setUserOrders(userOrders.filter(order => order.status !== "Ativo"))
  }

  const [currentStep, setCurrentSpet] = useState(1)
  const [isComplete, setIsComplete] = useState(false)
  const [margins, setMargins] = useState({
    marginLeft: 0,
    marginRight: 0
  })
  const stepRef = useRef([])

  const checkoutSteps = [
    { status: 'Encomendado', icon: <FaClipboardList/>, date: '23/08/2024 12:20' },
    { status: 'Preparando', icon: <FaBox/>, date: '23/08/2024 16:51' },
    { status: 'Enviado', icon: <FaTruck/>, date: '02/09/2024 14:49' },
    { status: 'Saiu para entrega', icon: <FaShippingFast/>, date: '03/09/2024 10:02' },
    { status: 'Entregue', icon: <BsFillHouseCheckFill/>, date: '03/09/2024 14:40' }
  ]

  useEffect(() => {
    setMargins({
      marginLeft: stepRef.current[0]?.offsetWidth / 2 || 0,
      marginRight: stepRef.current[checkoutSteps.length - 1]?.offsetWidth / 2 || 0
    })
  }, [stepRef.current, checkoutSteps.length])

  if (!checkoutSteps.length){
    return <></>
  }

  const handleNext = () => {
    setCurrentSpet(prevStep => {
      if (prevStep === checkoutSteps.length){
        setIsComplete(true)
        return prevStep
      } else{
        return prevStep + 1
      }
    })
  }

  const calculateProgressBarWidth = () => {
    return ((currentStep - 1) / (checkoutSteps.length - 1)) * 100
  }

  return(
    <article className="article-user-orders">
      <h2>Meus Pedidos</h2>
        {!showOrderDetails && !showCommentForm && (
          <div className="order-tabs">
            <button className={selectedTab === "active" ? "active" : ""} onClick={() => setSelectedTab("active")}>Ativos</button>
            <button className={selectedTab === "completed" ? "active" : ""} onClick={() => setSelectedTab("completed")}>Concluídos</button>
          </div>
        )}
        {!showCommentForm && selectedTab === "active" && !showOrderDetails && (
          <ul>
            {userOrders.filter(order => order.status === "Ativo").length === 0 ? (
              <span>Você não possui pedidos ativos.</span>
            ) : (
              userOrders.filter(order => order.status === "Ativo").map((order) => (
                <li key={order.id}>
                  <div className="order-item">
                    <img src={order.image} alt={order.name}/>
                    <div>
                      <p>{order.name}</p>
                      <p>Tamanho: {order.size} | Quantidade: {order.quantity}</p>
                      <p>R${order.price.toFixed(2).replace('.', ',')}</p>
                    </div>
                  </div>
                  <button onClick={handleTrackOrder}>Acompanhar pedido</button>
                </li>
              ))
            )}
          </ul>
        )}
        {showOrderDetails && (
          <div className="order-details">
            <h3>Detalhes do pedido</h3>
            <div>
              <p>Data prevista de entrega <span>03 de set 2024</span></p>
              <p>ID de rastreamento <span>3AS28121AW91</span></p>
            </div>
            <h3>Status do pedido</h3>
            <div className="stepper">
              {checkoutSteps.map((step, index) => (
                <div className={`step ${currentStep > index + 1 || isComplete ? "complete" : ""} ${currentStep === index + 1 ? "active" : ""}`} ref={el => (stepRef.current[index] = el)} key={step.status}>
                  <div className="step-icon">
                    {step.icon}
                  </div>
                  <div className="step-name">
                    <p>{step.status}</p>
                  </div>
                  <div className="step-date">
                    <p>{step.date}</p>
                  </div>
                </div>
              ))}
              <div className="progress-bar" style={{ width: `calc(100% - ${margins.marginLeft + margins.marginRight}px)`, marginLeft: margins.marginLeft, marginRight: margins.marginRight}}>
                <div className="progress" style={{ width: `${calculateProgressBarWidth()}%` }}></div>
              </div>
            </div>
            {!isComplete && (
              <button className="btn" onClick={handleNext}>{currentStep === checkoutSteps.length ? "Finalizar" : "Próximo"}</button>
            )}
          </div>
        )}
        {!showCommentForm && selectedTab === "completed" && (
          <ul>
            {userOrders.filter(order => order.status === "Concluído").length === 0 ? (
              <span>Você não possui pedidos concluídos.</span>
            ) : (
              userOrders.filter(order => order.status === "Concluído").map((order) => (
                <li key={order.id}>
                  <div className="order-item">
                    <img src={order.image} alt={order.name}/>
                    <div>
                      <p>{order.name}</p>
                      <p>Tamanho: {order.size} | Quantidade: {order.quantity}</p>
                      <p>R${order.price.toFixed(2).replace('.', ',')}</p>
                    </div>
                  </div>
                  {showAddCommentButton ? (
                    <button onClick={handleAddCommentClick}>Adicionar Avaliação</button>
                  ) : (
                    <p className="p-revision">Avaliação em revisão</p>
                  )}
                </li>
              ))
            )}
          </ul>
        )}
        {showCommentForm && (
          <div className="comment-form">
            <h3>Como está seu pedido?</h3>
            <form>
              <p>Sua avaliação geral:</p>
              <div className="rating">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span key={star} onClick={() => handleRatingChange(star)}>
                    {star <= rating ? <FaStar /> : <FaRegStar />}
                  </span>
                ))}
              </div>
              <p>Adicionar revisão detalhada:</p>
              <textarea id="review" value={review} onChange={handleReviewChange} placeholder="Digite sua revisão detalhada aqui"></textarea>
              {errorMessage && <p className="error-message">{errorMessage}</p>}
              <div className="photo-upload">
                <input type="file" id="photo" accept="image/*" onChange={handlePhotoChange}/>
                <p onClick={() => document.getElementById('photo').click()}><MdOutlinePhotoCamera/> Adicionar foto</p>
                {photo && <span>Selecionado: {photo}</span>}
              </div>
              <div className="buttons">
                <button type="button" onClick={handleCancelComment}>Cancelar</button>
                <button type="button" onClick={handleSubmitComment}>Enviar avaliação</button>
              </div>
            </form>
          </div>
        )}
    </article>
  )
}