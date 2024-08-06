import React, { useEffect, useState } from 'react'
import './payment.scss'
import { Link, useNavigate } from "react-router-dom"
import { Breadcrumb, BreadcrumbItem } from "@chakra-ui/react"
import { toast } from 'react-toastify'
import axios from 'axios'

import Header from '../../components/Header'
import Footer from '../../components/Footer'
import CustomModal from '../../components/CustomModal'

import pagarme from '../../assets/seloPagarX.png'

import { Spinner } from '@chakra-ui/react'
import { FaAngleRight } from "react-icons/fa"
import { BsFillCreditCardFill, BsFillPersonPlusFill } from 'react-icons/bs'

export default function Payment(){
  const navigate = useNavigate()

  const [cart, setCart] = useState([])
  const [cardName, setCardName] = useState('')
  const [cardNumber, setCardNumber] = useState('')
  const [expiryDate, setExpiryDate] = useState('')
  const [cvv, setCvv] = useState('')
  const [installments, setInstallments] = useState('10 X de R$10,00')
  const [personType, setPersonType] = useState('individual')
  const [cpfOrCnpj, setCpfOrCnpj] = useState('')
  const [phone, setPhone] = useState('')
  const [cep, setCep] = useState('')
  const [residentialNumber, setResidentialNumber] = useState('')
  const [termsAccepted, setTermsAccepted] = useState(false)

  const [street, setStreet] = useState('')

  const [cupom, setCupom] = useState('')
  const [desconto, setDesconto] = useState(0)
  const [botaoTexto, setBotaoTexto] = useState('Validar')
  const [botaoCor, setBotaoCor] = useState('')
  const botaoClassName = botaoCor === 'green' ? 'botao-validar' : (botaoCor === 'red' ? 'botao-remover' : '')
  const [loading, setLoading] = useState(true)
  const [loadingButton, setLoadingButton] = useState(false) 
  const [isOpenModalSuccess, setIsOpenModalSuccess] = useState(false)

  useEffect(() => {
    async function fetchData(){
      try{
        const cartItems = JSON.parse(localStorage.getItem("cart")) || []
        setCart(cartItems)

      } catch(error){

      } finally{
        setLoading(false)
      }
    }

    fetchData()

    document.title = "Jesustyle | Finalizar Compra"
  }, [])

  const total = cart.reduce((acc, curr) => acc + curr.price * curr.quantity, 0)

  const formatPrice = (value) => {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
  }

  const handleCardNameChange = (e) => {
    const value = e.target.value.replace(/[^a-zA-Z\s]/g, '')
    setCardName(value)
  }  

  const formatCardNumber = (number) => {
    return number.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim().slice(0, 19)
  }
  
  const handleCardNumberChange = (e) => {
    const value = formatCardNumber(e.target.value)
    setCardNumber(value)
  }  

  const formatExpiryDate = (expiryDate) => {
    return expiryDate.replace(/\D/g, '').replace(/(\d{2})(\d{0,2})/, '$1/$2').slice(0, 5)
  }
  
  const handleExpiryDateChange = (e) => {
    const value = formatExpiryDate(e.target.value)
    setExpiryDate(value)
  }   

  const formatCvv = (cvv) => {
    return cvv.replace(/\D/g, '').slice(0, 4)
  }
  
  const handleCvvChange = (e) => {
    const value = formatCvv(e.target.value)
    setCvv(value)
  } 
  
  const formatPhone = (phone) => {
    return phone.replace(/\D/g, '').replace(/^(\d{2})(\d{1,5})(\d{1,4})$/, '($1) $2-$3').trim()
  }
  
  const handlePhoneChange = (e) => {
    const value = formatPhone(e.target.value)
    setPhone(value)
  }  

  const isValidCardName = (name) => {
    return name.trim() !== ''
  }

  const isValidCardNumber = (number) => {
    const cleanNumber = number.replace(/\s+/g, '')
    const cardNumberRegex = /^\d{13,19}$/ 
    return cardNumberRegex.test(cleanNumber)
  }  

  const isValidExpiryDate = (expiryDate) => {
    const [month, year] = expiryDate.split('/').map(Number)
    const now = new Date()
    const currentYear = now.getFullYear() % 100
    const currentMonth = now.getMonth() + 1
    
    if (month < 1 || month > 12 || year < currentYear || (year === currentYear && month < currentMonth)) {
      return false
    }
    
    return true
  }

  const isValidCvv = (cvv) => {
    const cvvRegex = /^\d{3,4}$/
    return cvvRegex.test(cvv)
  }

  const handleInstallmentsChange = (e) => {
    setInstallments(e.target.value)
  }

  useEffect(() => {
    setCpfOrCnpj('')
  }, [personType])  

  const isValidCPF = (cpf) => {
    cpf = cpf.replace(/\D/g, '')
  
    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false
  
    let sum = 0
    let remainder
  
    for (let i = 1; i <= 9; i++) sum += parseInt(cpf.charAt(i - 1)) * (11 - i)
    remainder = (sum * 10) % 11
  
    if (remainder === 10 || remainder === 11) remainder = 0
    if (remainder !== parseInt(cpf.charAt(9))) return false
  
    sum = 0;
    for (let i = 1; i <= 10; i++) sum += parseInt(cpf.charAt(i - 1)) * (12 - i)
    remainder = (sum * 10) % 11
  
    if (remainder === 10 || remainder === 11) remainder = 0
    return remainder === parseInt(cpf.charAt(10))
  }
  
  const isValidCNPJ = (cnpj) => {
    cnpj = cnpj.replace(/\D/g, '')
  
    if (cnpj.length !== 14 || /^(\d)\1+$/.test(cnpj)) return false
  
    let sum = 0
    let remainder
  
    for (let i = 0; i < 12; i++) sum += parseInt(cnpj.charAt(i)) * (5 - (i % 8))
    remainder = sum % 11
    if (remainder < 2) remainder = 0
    else remainder = 11 - remainder
  
    if (remainder !== parseInt(cnpj.charAt(12))) return false
  
    sum = 0
    for (let i = 0; i < 13; i++) sum += parseInt(cnpj.charAt(i)) * (6 - (i % 8))
    remainder = sum % 11
    if (remainder < 2) remainder = 0
    else remainder = 11 - remainder
  
    return remainder === parseInt(cnpj.charAt(13))
  }

  const isValidPhone = (phone) => {
    const phoneRegex = /^\(?\d{2}\)?[\s-]?\d{4,5}[\s-]?\d{4}$/
    return phoneRegex.test(phone)
  }

  const fetchAddressData = async (cep) => {
    try{
      const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`)
      const { data } = response
  
      if(!data.erro){
        return {
          street: data.logradouro,
          neighborhood: data.bairro,
          city: data.localidade,
          state: data.uf,
        }
      } else {
        throw new Error("CEP não encontrado.")
      }
    } catch(error){
      toast.error("Não foi possível encontrar o endereço para o CEP fornecido.")
      throw error
    }
  }  

  useEffect(() => {
    const fetchAndSetAddress = async () => {
      if(cep && residentialNumber){
        try {
          const addressData = await fetchAddressData(cep)
          setStreet(`${addressData.street}, ${residentialNumber}, ${addressData.city}/${addressData.state} - ${cep}`)
        }catch(error){
          setStreet('')
        }
      }
    }
  
    fetchAndSetAddress()
  }, [cep, residentialNumber])  

  // const handleChangeCupom = (event) => {
  //   const selectedValue = event.target.value
  //   setCupom(selectedValue)
  // }

  // const handleBotaoClick = () => {
  //   if (botaoTexto === 'Validar') {
  //     if (cupomValido(cupom)) {
  //       aplicarDesconto(cupom)
  //       setBotaoTexto('Remover')
  //       setBotaoCor('red')
  //     } else {
  //       alert('Cupom inválido')
  //     }
  //   } else if (botaoTexto === 'Remover') {
  //     removerDesconto()
  //     setCupom('')
  //     setBotaoTexto('Validar')
  //     setBotaoCor('')
  //   }
  // }

  // const cupomValido = (cupom) => {
  //   const cuponsValidos = ['DESCONTO10', 'PROMO20']
  //   return cuponsValidos.includes(cupom)
  // }

  // const aplicarDesconto = (cupom) => {
  //   let descontoValor = 0
  //   if (cupom === 'DESCONTO10') {
  //     descontoValor = total * 0.1
  //   } else if (cupom === 'PROMO20') {
  //     descontoValor = total * 0.2
  //   }
  //   setDesconto(descontoValor)
  //   setCart(cart.map(product => ({
  //     ...product,
  //     price: product.price - (product.price * (descontoValor / total))
  //   })))
  // }

  // const removerDesconto = () => {
  //   setCart(cart.map(product => {
  //     if (cupom === 'DESCONTO10') {
  //       return { ...product, price: product.price / 0.9 }
  //     } else if (cupom === 'PROMO20') {
  //       return { ...product, price: product.price / 0.8 }
  //     }
  //     return product
  //   }))
  //   setDesconto(0)
  // }

  async function handlePayment() {
    const fieldsToCheck = [
      { field: cardName, message: 'Por favor, preencha o nome no cartão.' },
      { field: cardNumber, message: 'Por favor, preencha o número do cartão.' },
      { field: expiryDate, message: 'Por favor, preencha a data de validade.' },
      { field: cvv, message: 'Por favor, preencha o CVV.' },
      { field: installments, message: 'Por favor, selecione o número de parcelas.' },
      { field: cpfOrCnpj, message: personType === 'individual' ? 'Por favor, preencha o CPF.' : 'Por favor, preencha o CNPJ.' },
      { field: phone, message: 'Por favor, preencha o telefone.' },
      { field: cep, message: 'Por favor, preencha o CEP.' },
      { field: residentialNumber, message: 'Por favor, preencha o número residencial.' }
    ]

    for(const field of fieldsToCheck){
     if(!field.field) {
        toast.warning(field.message)
        setLoadingButton(false)
        return
      }
    }

    if (!isValidCardName(cardName)) {
      toast.warning('Por favor, preencha o nome no cartão.')
      setLoadingButton(false)
      return
    }
  
    if (!isValidCardNumber(cardNumber)) {
      toast.warning('Por favor, preencha um número de cartão válido.')
      setLoadingButton(false)
      return
    }

    if (!isValidExpiryDate(expiryDate)) {
      toast.warning('Por favor, preencha uma data de validade válida.')
      setLoadingButton(false)
      return
    }
  
    if (!isValidCvv(cvv)) {
      toast.warning('Por favor, preencha um CVV válido.')
      setLoadingButton(false)
      return
    }

    if (personType === 'individual' && !isValidCPF(cpfOrCnpj)) {
      toast.warning('CPF inválido.')
      setLoadingButton(false)
      return
    }
  
    if (personType === 'legal_entity' && !isValidCNPJ(cpfOrCnpj)) {
      toast.warning('CNPJ inválido.')
      setLoadingButton(false)
      return
    }

    if (!isValidPhone(phone)) {
      toast.warning('Por favor, preencha um telefone válido.')
      setLoadingButton(false)
      return
    }

    let addressData = {
      street: '',
      city: '',
      state: ''
    }

    try{
      addressData = await fetchAddressData(cep)
    } catch(error){
      toast.warning('Endereço não encontrado. Verifique o CEP.')
      setLoadingButton(false)
      return
    }

    if(!termsAccepted){
      toast.warning('Você deve aceitar os Termos de Serviço para finalizar a compra.')
      setLoadingButton(false)
      return
    }

    const paymentData = {
      items: cart.map(product => ({
        amount: product.price * 100,
        description: product.name,
        quantity: product.quantity,
        code: "CAMISETACODE"  //pregar o code da api de produtos
      })),
      customer: {
        name: "José da Silva",  //pegar do login/cadastro
        email: "jose.silva@example.com",  //pegar do login
        document: cpfOrCnpj.replace(/\D/g, ""),
        type: personType,
        phones: {
          home_phone: {
            country_code: "55",
            area_code: phone.substring(1, 3),
            number: phone.replace(/\D/g, "")
          }
        }
      },
      payments: [
        {
          payment_method: "credit_card",
          credit_card: {
            installments: parseInt(installments),
            statement_descriptor: "LJJESUSTYLE",
            card: {
              number: cardNumber.replace(/\D/g, ""),
              holder_name: cardName,
              exp_month: parseInt(expiryDate.substring(0, 2)),
              exp_year: parseInt(expiryDate.substring(3, 5)) + 2000,
              cvv: cvv,
              billing_address: {
                line_1: `${addressData.street}, ${residentialNumber}`,
                zip_code: cep.replace(/\D/g, ""),
                city: addressData.city,
                state: addressData.state,
                country: "BR"
              }
            }
          }
        }
      ]
    }

    try{
      setLoadingButton(true)

      const response = await axios.post('/core/v5/orders', paymentData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Basic c2tfdGVzdF80ZTI3MDA4ZTE0YzI0MTY0YmFkNmU3ZmRiZmRkOWRlZTo='
         }
      })

      if(response.data.status === 'paid'){
        console.log(paymentData)
        setIsOpenModalSuccess(true)
        await new Promise(resolve => setTimeout(resolve, 4000))
        localStorage.removeItem("cart")
        navigate('/products')

       }else{
        toast.error('Erro ao processar pagamento. Tente novamente.')
      }

    } catch(error){
      toast.error('Erro ao processar pagamento. Tente novamente mais tarde.')

    } finally {
      setLoadingButton(false)
    }
  }

  return (
    <>
      <Header/>

      <main className='payment'>
        {/* <Breadcrumb className="breadcrumb" spacing="8px" separator={<FaAngleRight/>}>
          <BreadcrumbItem className="breadcrumb-item">
            <Link to={`/products`}>Produtos</Link>
          </BreadcrumbItem>
          <BreadcrumbItem className="breadcrumb-item">
            <Link to={`/product/1`}>Detalhes do Produto</Link>
          </BreadcrumbItem>
          <BreadcrumbItem className="breadcrumb-item">
            <Link className="active">Finalização da Compra</Link>
          </BreadcrumbItem>
        </Breadcrumb> */}

        <div className='payment-container'>
          <section className='checkout-section'>
            <h1>Finalizar compra</h1>
            <form className='payment-form'>
              <section>
                <h5><BsFillCreditCardFill/>Dados do cartão</h5>
                <span>Aceitamos somente cartão de crédito!*</span>
              </section>

              <div style={{width: window.innerWidth <= 480 ? '100%' : '48%'}}>
                <label htmlFor="cardName">Nome no cartão:</label>
                <input type="text" id="cardName" maxLength="19" placeholder="Nome no cartão" value={cardName} onChange={handleCardNameChange}/>
              </div>
              <div style={{width: window.innerWidth <= 480 ? '100%' : '50%'}}>
                <label htmlFor="cardNumber">Número do Cartão:</label>
                <input type="text" id="cardNumber" placeholder="Número do Cartão" value={cardNumber} onChange={handleCardNumberChange}/>
              </div>
              <div style={{width: window.innerWidth <= 480 ? '100%' : '32%'}}>
                <label htmlFor="expiryDate">Data de Validade:</label>
                <input type="text" id="expiryDate" placeholder="MM/AA" maxLength="5" value={expiryDate} onChange={handleExpiryDateChange}/>
              </div>
              <div style={{width: window.innerWidth <= 480 ? '100%' : '32%'}}>
                <label htmlFor="cvv">CVV:</label>
                <input type="text" id="cvv" maxLength="4" placeholder="CVV" value={cvv} onChange={handleCvvChange}/>
              </div>
              <div style={{ width: window.innerWidth <= 480 ? '100%' : '32%' }}>
                <label htmlFor="installments">Número de parcelas:</label>
                <select id="installments" value={installments} onChange={handleInstallmentsChange}>
                  {Array.from({ length: 10 }, (_, index) => index + 1).map((num) => (
                    <option key={num}>{num} X de R${(total / num).toFixed(2).replace('.', ',')}</option>
                  ))}
                </select>
              </div>

              <section className='additional-details'>
                <h5><BsFillPersonPlusFill />Dados complementares</h5>
              </section>
              <div style={{width: window.innerWidth <= 480 ? '100%' : '48%'}}>
                <label>Tipo de Pessoa:</label>
                <select id="personType" value={personType} onChange={(e) => setPersonType(e.target.value)}>
                  <option value="individual">Pessoa Física</option>
                  <option value="legal_entity">Pessoa Jurídica</option>
                </select>
              </div>
              <div style={{width: window.innerWidth <= 480 ? '100%' : '48%'}}>
                <label>{personType === 'individual' ? 'CPF:' : 'CNPJ:'}</label>
                <input type="text" placeholder={personType === 'individual' ? 'CPF' : 'CNPJ'} maxLength={personType === 'individual' ? "11" : "14"} value={cpfOrCnpj} onChange={(e) => setCpfOrCnpj(e.target.value)}/>
              </div>
              <div style={{width: window.innerWidth <= 480 ? '100%' : '34%'}}>
                <label>Telefone:</label>
                <input type="tel" placeholder="(**) *****-****" maxLength={15} value={phone} onChange={handlePhoneChange}/>
              </div>
              <div style={{width: window.innerWidth <= 480 ? '100%' : '34%'}}>
                <label>CEP:</label>
                <input type="text" placeholder="CEP" maxLength={9} value={cep} onChange={(e) => setCep(e.target.value)}/>
              </div>
              <div style={{width: window.innerWidth <= 480 ? '100%' : '26%'}}>
                <label>Nº residencial:</label>
                <input type="text" placeholder="Nº residencial" maxLength={9} value={residentialNumber} onChange={(e) => setResidentialNumber(e.target.value)}/>
              </div>
            </form>
          </section>

          <section className='purchase-details'>
            <h1>Resumo da Compra</h1>
            {street && ( <p className="purchase-details-p">Local de Entrega: <span>{street}</span></p> )}
            {/* <p className='purchase-details-p'>Entrega Estimada: <span></span></p> */}
            {street && ( <p className='total-diviser purchase-details-p'></p> )}
            <aside className="product-body">
              <ul>
                {cart.map(product => (
                  <li key={product.id}>
                    <img src={product.src} alt={product.name} />
                    <div className='details'>
                      <p>{product.name}</p>
                      <p>Quantidade: {product.quantity}</p>
                      <p>Tamanho: {product.size}</p>
                      <p>{formatPrice(product.price * product.quantity)}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </aside>
            <p className='total-diviser purchase-details-p'></p>
            <p className='purchase-details-p'>Parcelamento: <span>{installments}</span></p>
            <p className='purchase-details-p' style={{display: 'flex', justifyContent: 'space-between'}}>Total: <span>{formatPrice(total)}</span></p>
            {/* <p className='total purchase-details-p'>Total: <span>
                {desconto > 0 && <h6 className='perc-desconto'>- R$ {desconto.toFixed(2).replace('.', ',')}</h6>}
                R$ {(total - desconto).toFixed(2).replace('.', ',')}
              </span>
            </p> */}
            {/* <div className='cupom-de-desconto'>
              <p>Código de cupom</p>
              <div>
                <input type='text' value={cupom} onChange={handleChangeCupom}/>
                <button className={botaoClassName} onClick={handleBotaoClick}>{botaoTexto}</button>
              </div>
            </div> */}
            <img className='purchase-details-img' src={pagarme}/>
            <div>
              <label><input type='checkbox' checked={termsAccepted} onChange={(e) => setTermsAccepted(e.target.checked)}/>Ao marcar esta opção, você concorda com os <a href='#'>Termos de Serviço</a>.</label>
            </div>
            <button type='button' onClick={handlePayment} disabled={loadingButton}>
              {loadingButton ? <Spinner className="spinner-button" speed='0.70s'/> : 'Finalizar Compra'}
            </button>
          </section>
        </div>
      </main>

      <CustomModal isOpen={isOpenModalSuccess} closeModal={() => {setIsOpenModalSuccess(false)}}
        headerText="Compra realizada com sucesso!"
        paragraphText="Agradecemos por escolher nossa loja. Seu pedido está sendo processado e em breve você receberá um e-mail com todos os detalhes da sua compra."
        spanText="Se precisar de mais informações ou suporte, não hesite em nos contatar."
      />

      <Footer/>
    </>
  )
}
