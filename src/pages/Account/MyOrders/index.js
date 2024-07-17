import React, { useState, useEffect, useRef } from "react"
import './myorders.scss'
import '../account.scss'

import camisetaTrustInTheLordFront from '../../../assets/products/CamisetaTrustInTheLordFront.png'
import moletomLikeJesusFront from '../../../assets/products/MoletomLikeJesusFront.png'
import camisetaJesusLovesYouFront from '../../../assets/products/CamisetaJesusLovesYouFront.png'

import { FaRegStar, FaStar, FaClipboardList, FaBox, FaTruck, FaShippingFast } from "react-icons/fa"
import { MdOutlinePhotoCamera } from "react-icons/md"
import { BsFillHouseCheckFill } from "react-icons/bs"
import { FiCopy, FiCheck } from 'react-icons/fi'

const forbiddenWords = [
  "merda", "porra", "caralho", "bosta", "puta", "piranha", "arrombado", "viado", "fdp", "foda-se", 
  "desgraça", "cacete", "buceta", "cu", "retardado", "idiota", "imbecil", "escroto", "puta que pariu", 
  "vai se foder", "babaca", "vagabundo", "corno", "escória", "bobalhão", "lixo", "trouxa", "otário", 
  "palhaço", "cabeça de vento", "paspalho"
]

const checkoutSteps = [
  { status: 'Pedido encomendado', icon: <FaClipboardList/>, date: '23/08/2024 12:20' },
  { status: 'Pedido sendo preparado', icon: <FaBox/>, date: '23/08/2024 16:51' },
  { status: 'Pedido enviado', icon: <FaTruck/>, date: '02/09/2024 14:49' },
  { status: 'Pedido saiu para entrega', icon: <FaShippingFast/>, date: '03/09/2024 10:02' },
  { status: 'Pedido entregue', icon: <BsFillHouseCheckFill/>, date: '03/09/2024 14:40' }
]

export default function MyOrders() {
  const [selectedTab, setSelectedTab] = useState("active")
  const [showOrderDetails, setShowOrderDetails] = useState(false)
  const [showCommentForm, setShowCommentForm] = useState(false)
  const [showAddCommentButton, setShowAddCommentButton] = useState(true)
  const [rating, setRating] = useState(0)
  const [review, setReview] = useState("")
  const [photo, setPhoto] = useState(null)
  const [errorMessage, setErrorMessage] = useState("")
  const [userOrders, setUserOrders] = useState([
    { id: 1, image: camisetaTrustInTheLordFront, name: "Camiseta Trust In The Lord", size: "M", quantity: 1, price: 169, status: "Ativo" },
    { id: 2, image: moletomLikeJesusFront, name: "Moletom Like Jesus", size: "L", quantity: 2, price: 305, status: "Ativo" },
    { id: 3, image: camisetaJesusLovesYouFront, name: "Camiseta Jesus Loves You", size: "L", quantity: 2, price: 169, status: "Concluído" }
  ])
  const [currentStep, setCurrentStep] = useState(3)
  const [isComplete, setIsComplete] = useState(false)
  const [margins, setMargins] = useState({ marginLeft: 0, marginRight: 0 })
  const stepRef = useRef([])

  useEffect(() => {
    setMargins({
      marginLeft: stepRef.current[0]?.offsetWidth / 2 || 0,
      marginRight: stepRef.current[checkoutSteps.length - 1]?.offsetWidth / 2 || 0
    })
  }, [stepRef.current, checkoutSteps.length])

  const handleAddCommentClick = () => {
    setShowCommentForm(true)
    setShowAddCommentButton(false)
  }

  const handleCancelComment = () => {
    setShowCommentForm(false)
    resetCommentForm()
  }

  const handleRatingChange = (newRating) => setRating(newRating)

  const handleReviewChange = (e) => setReview(e.target.value)

  const handlePhotoChange = (e) => {
    const file = e.target.files[0]
    if (file) setPhoto(file.name)
  }

  const containsForbiddenWords = (text) => {
    const words = text.split(/\s+/)
    return words.some(word => forbiddenWords.includes(word.toLowerCase()))
  }

  const handleSubmitComment = (e) => {
    e.preventDefault()
    if (containsForbiddenWords(review)) {
      setErrorMessage("Seu comentário contém linguagem inadequada. Por favor, revise e tente novamente!")
    } else {
      resetCommentForm()
    }
  }

  const resetCommentForm = () => {
    setShowCommentForm(false)
    setErrorMessage("")
    setRating(0)
    setReview("")
    setPhoto(null)
    setShowAddCommentButton(true)
  }

  const handleTrackOrder = () => {
    setShowOrderDetails(true)
    setUserOrders(userOrders.filter(order => order.status !== "Ativo"))
  }

  const handleNext = () => {
    setCurrentStep(prevStep => {
      if (prevStep === checkoutSteps.length) {
        setIsComplete(true)
        return prevStep
      }
      return prevStep + 1
    })
  } 

  return (
    <article className="article-user-orders">
      <h2>Meus Pedidos</h2>
      {!showOrderDetails && !showCommentForm && (
        <div className="order-tabs">
          <button className={selectedTab === "active" ? "active" : ""} onClick={() => setSelectedTab("active")}>Ativos</button>
          <button className={selectedTab === "completed" ? "active" : ""} onClick={() => setSelectedTab("completed")}>Concluídos</button>
        </div>
      )}
      {!showCommentForm && selectedTab === "active" && !showOrderDetails && (
        <OrderList
          orders={userOrders.filter(order => order.status === "Ativo")}
          onTrackOrder={handleTrackOrder}
          emptyMessage="Você não possui pedidos ativos."
        />
      )}
      {showOrderDetails && (
        <OrderDetails
          steps={checkoutSteps}
          currentStep={currentStep}
          isComplete={isComplete}
          margins={margins}
          stepRef={stepRef}
          onNext={handleNext}
          orders={userOrders}
        />
      )}
      {!showCommentForm && selectedTab === "completed" && (
        <OrderList
          orders={userOrders.filter(order => order.status === "Concluído")}
          onAddComment={handleAddCommentClick}
          showAddCommentButton={showAddCommentButton}
          emptyMessage="Você não possui pedidos concluídos."
        />
      )}
      {showCommentForm && (
        <CommentForm
          rating={rating}
          review={review}
          photo={photo}
          errorMessage={errorMessage}
          onRatingChange={handleRatingChange}
          onReviewChange={handleReviewChange}
          onPhotoChange={handlePhotoChange}
          onCancel={handleCancelComment}
          onSubmit={handleSubmitComment}
        />
      )}
    </article>
  )
}

function OrderList({ orders, onTrackOrder, onAddComment, showAddCommentButton, emptyMessage }){
  return(
    <ul>
      {orders.length === 0 ? (
        <span>{emptyMessage}</span>
      ) : (
        orders.map((order) => (
          <li key={order.id}>
            <div className="order-item">
              <img src={order.image}/>
              <div>
                <p>{order.name}</p>
                <p>Tamanho: {order.size} | Quantidade: {order.quantity}</p>
                <p>R${order.price.toFixed(2).replace('.', ',')}</p>
              </div>
            </div>
            {onTrackOrder && <button onClick={onTrackOrder}>Acompanhar pedido</button>}
            {onAddComment && (
              showAddCommentButton ? (
                <button onClick={onAddComment}>Adicionar Avaliação</button>
              ) : (
                <p className="p-revision">Avaliação em revisão</p>
              )
            )}
          </li>
        ))
      )}
    </ul>
  )
}

function OrderDetails({ steps, currentStep, isComplete, margins, stepRef, onNext, orders }){
  const [copied, setCopied] = useState(false)

  const copyTrackingID = () => {
    const trackingID = '3AS28121AW91'
    navigator.clipboard.writeText(trackingID)
    setCopied(true)
    setTimeout(() => setCopied(false), 6000)
  }

  const calculateProgressBarWidth = () => {
    return ((currentStep - 1) / (checkoutSteps.length - 1)) * 100
  }

  return (
    <div className="order-details">
      <h3>Detalhes do pedido</h3>
      <div className="order-details-section">
        <p>Data prevista de entrega <span>03 de set 2024</span></p>
        <p>ID de rastreamento <span>3AS28121AW91
          {copied ? <FiCheck/> : <FiCopy onClick={copyTrackingID}/>}  
        </span></p>
        <p>Endereço de entrega: <span>Rua Exemplo, 123, Cidade, Estado</span></p>
      </div>
      <h3>Status do pedido</h3>
      <div className="stepper">
        {steps.map((step, index) => (
          <div
            className={`step ${currentStep > index + 1 || isComplete ? "complete" : ""} ${currentStep === index + 1 ? "active" : ""}`}
            ref={el => (stepRef.current[index] = el)}
            key={step.status}
          >
            <div className="step-icon">{step.icon}</div>
            <div className="step-name"><p>{step.status}</p></div>
            <div className="step-date"><p>{step.date}</p></div>
          </div>
        ))}
        <div className="progress-bar" style={{ width: `calc(100% - ${margins.marginLeft + margins.marginRight}px)`, marginLeft: margins.marginLeft, marginRight: margins.marginRight }}>
          <div className="progress" style={{ width: `${calculateProgressBarWidth()}%` }}></div>
        </div>
      </div>
      {/* {!isComplete && <button className="btn" onClick={onNext}>{currentStep === steps.length ? "Finalizar" : "Próximo"}</button>} */}
      <h3>Suporte ao Cliente</h3>
      <div className="customer-support">
        <p>Precisa de ajuda? Entre em contato com nosso suporte:</p>
        <p>Telefone: <span>0800-123-456</span></p>
        <p>Email: <span>suporte@exemplo.com</span></p>
      </div>
    </div>
  )
}

function CommentForm({ rating, review, photo, errorMessage, onRatingChange, onReviewChange, onPhotoChange, onCancel, onSubmit }){
  return(
    <div className="comment-form">
      <h3>Como está seu pedido?</h3>
      <form>
        <p>Sua avaliação geral:</p>
        <div className="rating">
          {[1, 2, 3, 4, 5].map((star) => (
            <span key={star} onClick={() => onRatingChange(star)}>
              {star <= rating ? <FaStar /> : <FaRegStar />}
            </span>
          ))}
        </div>
        <p>Adicionar revisão detalhada:</p>
        <textarea id="review" value={review} onChange={onReviewChange} placeholder="Digite sua revisão detalhada aqui"></textarea>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <div className="photo-upload">
          <input type="file" id="photo" accept="image/*" onChange={onPhotoChange} />
          <p onClick={() => document.getElementById('photo').click()}><MdOutlinePhotoCamera/> Adicionar foto</p>
          {photo && <span>Selecionado: {photo}</span>}
        </div>
        <div className="buttons">
          <button type="button" onClick={onCancel}>Cancelar</button>
          <button type="button" onClick={onSubmit}>Enviar avaliação</button>
        </div>
      </form>
    </div>
  )
}