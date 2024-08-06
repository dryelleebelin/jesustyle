import React, { useEffect, useState } from "react"
import './allproducts.scss'
import { useNavigate } from "react-router-dom"
import { Spinner } from '@chakra-ui/react'
import { toast } from 'react-toastify'
import { IoClose } from "react-icons/io5"
import axios from 'axios'

import Header from "../../components/Header"
import Footer from "../../components/Footer"

import camisetaTrustInTheLordFront from '../../assets/products/CamisetaTrustInTheLordFront.png'
import camisetaTrustInTheLordBack from '../../assets/products/CamisetaTrustInTheLordBack.png'
import camisetaGodisGoodFront from '../../assets/products/CamisetaGodisGoodFront.png'
import camisetaGodisGoodBack from '../../assets/products/CamisetaGodisGoodBack.png'
import camisetaJesusLovesYouFront from '../../assets/products/CamisetaJesusLovesYouFront.png'
import camisetaJesusLovesYouBack from '../../assets/products/CamisetaJesusLovesYouBack.png'
import moletomLikeJesusFront from '../../assets/products/MoletomLikeJesusFront.png'
import moletomLikeJesusBack from '../../assets/products/MoletomLikeJesusBack.png'
import moletomGolaCarecaJesusSaves from '../../assets/products/MoletomGolaCarecaJesusSaves.png'
import calcaMoletomJesusSaves from '../../assets/products/CalcaMoletomJesusSaves.png'

import esCamisetaGodIsGood from '../../assets/estudio/esCamisetaGodIsGood.jpg'
import esCamisetaGodIsGood2 from '../../assets/estudio/esCamisetaGodIsGood2.jpg'
import esCamisetaTrustLord from '../../assets/estudio/esCamisetaTrustLord.jpg'
import esCamisetaTrustLord2 from '../../assets/estudio/esCamisetaTrustLord2.jpg'
import esCamisetaJesusLovesTK from '../../assets/estudio/esCamisetaJesusLovesTK.jpg'
import esCamisetaJesusLoves2 from '../../assets/estudio/esCamisetaJesusLoves2.jpg'
import esMoletomLikeJesus from '../../assets/estudio/esMoletomLikeJesus.jpg'
import esMoletomLikeJesus2 from '../../assets/estudio/esMoletomLikeJesus2.jpg'
import esMoletomJesusSavesTK from '../../assets/estudio/esMoletomJesusSavesTK.jpg'
import esMoletomJesusSavesTK2 from '../../assets/estudio/esMoletomJesusSavesTK2.jpg'
import esMoletomJesusSaves3 from '../../assets/estudio/esMoletomJesusSaves3.jpg'

import { FaListUl } from "react-icons/fa"
import { MdOutlineCircle, MdCheckCircle } from "react-icons/md"
import { HiOutlineShoppingBag } from "react-icons/hi2"
import { FaArrowUpRightFromSquare } from "react-icons/fa6"

export const products = [
  { id: 1, name: "Camiseta Trust In The Lord", originalPrice: 186, discountPrice: 169, discountPercentage: 10, description: "“Confie no Senhor de todo o coração e não se apoie na sua própria inteligência.” – Provérbios 3:5", src: esCamisetaTrustLord2, hoverSrc: [esCamisetaTrustLord, camisetaTrustInTheLordFront, camisetaTrustInTheLordBack], size: ["PP", "P", "M", "G"], category: ["Camisetas"] },
  { id: 2, name: "Camiseta God is Good", originalPrice: 186, discountPrice: 169, discountPercentage: 10, description: "“Deem graças ao Senhor porque ele é bom; o seu amor dura para sempre.” – Salmos 136:1", src: esCamisetaGodIsGood, hoverSrc: [esCamisetaGodIsGood2, camisetaGodisGoodFront, camisetaGodisGoodBack], size: ["P", "M", "G"], category: ["Camisetas"] },
  { id: 3, name: "Camiseta Jesus Loves You", originalPrice: 186, discountPrice: 169, discountPercentage: 10, description: "“Nós amamos porque Deus nos amou primeiro.” – 1 João 4:19", src: esCamisetaJesusLovesTK, hoverSrc: [esCamisetaJesusLoves2, camisetaJesusLovesYouFront, camisetaJesusLovesYouBack], size: ["PP", "P", "M"], category: ["Camisetas"] },
  { id: 4, name: "Moletom Like Jesus", originalPrice: 339, discountPrice: 305, discountPercentage: 10, description: "“Aquele que diz que permanece nele deve andar como ele andou.” – 1 João 2:6", src: esMoletomLikeJesus2, hoverSrc: [esMoletomLikeJesus, moletomLikeJesusFront, moletomLikeJesusBack], size: ["P", "M", "G"], category: ["Moletons"] },
  { id: 5, name: "Conjunto Jesus Saves (Moletom + Calça)", originalPrice: 508, discountPrice: 457, discountPercentage: 10, description: "“Pois o Filho do Homem veio buscar e salvar o que estava perdido.” – Lucas 19:10", src: esMoletomJesusSavesTK, hoverSrc: [esMoletomJesusSavesTK2, esMoletomJesusSaves3, moletomGolaCarecaJesusSaves, calcaMoletomJesusSaves], size: ["P", "M", "G"], category: ["Conjuntos", "Calças"] },
  { id: 6, name: "Moletom Gola Careca Avulso Jesus Saves", originalPrice: 304, discountPrice: 274, discountPercentage: 10, description: "“E em nenhum outro há salvação, pois não há nenhum outro nome debaixo do céu dado aos homens pelo qual devamos ser salvos.” – Atos 4:12", src: moletomGolaCarecaJesusSaves, hoverSrc: [esMoletomJesusSavesTK, esMoletomJesusSavesTK2], size: ["P", "M", "G"], category: ["Moletons"] },
  { id: 7, name: "Calça Moletom Avulsa Jesus Saves", originalPrice: 258, discountPrice: 232, discountPercentage: 10, description: "“Porque Deus enviou o seu Filho ao mundo, não para condenar o mundo, mas para que o mundo fosse salvo por meio dele.” – João 3:17", src: calcaMoletomJesusSaves, hoverSrc: [esMoletomJesusSavesTK2, esMoletomJesusSaves3], size: ["P", "G"], category: ["Calças"] }
]

export default function AllProducts(){
  const navigate = useNavigate()
  //const [products, setProducts] = useState([])/
  const [isSizeSelectionVisible, setIsSizeSelectionVisible] = useState(false)
  const [productToAdd, setProductToAdd] = useState(null)
  const [selectedProductSize, setSelectedProductSize] = useState(null)

  const [selectedSizes, setSelectedSizes] = useState([])
  const [selectedCategories, setSelectedCategories] = useState([])
  const [selectedSortOption, setSelectedSortOption] = useState("priceLowToHigh")
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(true)

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  useEffect(() => {
    async function fetchProducts() {
      try {

      } catch (error) {

      } finally {
        setLoading(false)
      }
    }

    fetchProducts()

    document.title = "Jesustyle | Descubra Nossa Coleção"
  }, [])

  const handleSizeSelection = (size) => {
    const index = selectedSizes.indexOf(size)
    if (index === -1) {
      setSelectedSizes([...selectedSizes, size])
    } else {
      const newSelectedSizes = [...selectedSizes]
      newSelectedSizes.splice(index, 1)
      setSelectedSizes(newSelectedSizes)
    }
  }

  const handleCategorySelection = (category) => {
    const index = selectedCategories.indexOf(category)
    if (index === -1) {
      setSelectedCategories([...selectedCategories, category])
    } else {
      const newSelectedCategories = [...selectedCategories]
      newSelectedCategories.splice(index, 1)
      setSelectedCategories(newSelectedCategories)
    }
  }

  const handleResetAll = () => {
    setSelectedSizes([])
    setSelectedCategories([])
  }

  const handleSortChange = (event) => {
    setSelectedSortOption(event.target.value)
  }

  const sizes = ["PP", "P", "M", "G"]

  const categories = [
    { name: "Camisetas", count: products.filter(item => item.category.includes("Camisetas")).length },
    { name: "Calças", count: products.filter(item => item.category.includes("Calças")).length },
    { name: "Moletons", count: products.filter(item => item.category.includes("Moletons")).length },
    { name: "Conjuntos", count: products.filter(item => item.category.includes("Conjuntos")).length }
  ]

  const filteredProducts = products.filter(item => {
    if (selectedSizes.length > 0 && !selectedSizes.some(size => item.size.includes(size))){
      return false
    }
    if (selectedCategories.length > 0 && !selectedCategories.some(category => item.category.includes(category))){
      return false
    }
    if (searchTerm && !item.name.toLowerCase().includes(searchTerm.toLowerCase())){
      return false
    }
    return true
  })  

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (selectedSortOption){
      case "priceLowToHigh":
        return a.discountPrice - b.discountPrice
      case "priceHighToLow":
        return b.discountPrice - a.discountPrice
      case "nameAZ":
        return a.name.localeCompare(b.name)
      case "nameZA":
        return b.name.localeCompare(a.name)
      default:
        return 0
    }
  }) 

  const handleSizeSelectionForAddToCart = (size) => {
    setSelectedProductSize(size)
    addProductToCart(productToAdd, size)
    setIsSizeSelectionVisible(false)
    setProductToAdd(null)
  }

  const handleAddToCart = (product) => {
    setIsSizeSelectionVisible(true)
    setProductToAdd(product)
  }
  
  const addProductToCart = (product, size) => {
    try {
      const itemToAdd = {
        id: product.id,
        name: product.name,
        price: product.discountPrice > 0 ? product.discountPrice : product.originalPrice,
        quantity: 1,
        size: size,
        key: `${product.id}-${size}`,
        src: product.src,
      }
      const cart = JSON.parse(localStorage.getItem('cart')) || []
      cart.push(itemToAdd)
      localStorage.setItem('cart', JSON.stringify(cart))

      toast.success('Adicionado ao carrinho com sucesso!')

      const event = new CustomEvent('cartUpdated', { detail: cart })
      window.dispatchEvent(event)

    } catch (error) {
      toast.error('Erro ao adicionar produto ao carrinho.')
    }
  }

  return (
    <>
      <Header onSearch={setSearchTerm}/>

      {loading ? (
        <div className="spinner-page">
          <Spinner className="spinner" speed='0.70s' />
        </div>
      ) : (
        <>
          <section className="banner-all-products"></section>

          <main className="all-products">
            <aside>
              <h1>Coleção</h1>
              <div className="filters">
                <p><FaListUl/> Filtros <span>(2)</span></p>
                <span onClick={handleResetAll}>Limpar filtro</span>
              </div>
              <div className="category">
                <h2>Categorias</h2>
                {categories.map((category, index) => (
                  <p key={index} onClick={() => handleCategorySelection(category.name)}>
                    {selectedCategories.includes(category.name) ? <MdCheckCircle /> : <MdOutlineCircle />} {category.name} <span>({category.count})</span>
                  </p>
                ))}
              </div>
              <div className="container-size">
                <h2>Tamanho</h2>
                <div>
                  {sizes.map((size, index) => (
                    <p key={index} className={`size ${selectedSizes.includes(size) ? "selected" : ""}`} onClick={() => handleSizeSelection(size)}>{size}</p>
                  ))}
                </div>
              </div>
            </aside>

            <section>
              <div className="sort-container">
                <p>Ordenar por: </p>
                <select value={selectedSortOption} onChange={handleSortChange}>
                  <option value="priceLowToHigh">Preço baixo para alto</option>
                  <option value="priceHighToLow">Preço alto para baixo</option>
                  <option value="nameAToZ">Nome A a Z</option>
                  <option value="nameZToA">Nome Z a A</option>
                </select>
              </div>
              <div className="items-container">
                {sortedProducts.length > 0 ? (
                  sortedProducts.map(item => (
                    <div className="item" key={item.id}>
                      {item.discountPrice > 0 && (
                        <span className="discount-percentage">{item.discountPercentage}% OFF</span>
                      )}
                      <FaArrowUpRightFromSquare className="item-arrow-up" onClick={() => { navigate(`/product/${item.id}`); scrollToTop() }}/>
                      <img className="img" src={item.src}/>
                      {isSizeSelectionVisible && productToAdd && productToAdd.id === item.id && (
                        <div className="size-selection-overlay">
                          <div className="size-selection-container">
                            <h2>Selecione um tamanho</h2>
                            <div className="size-options">
                              {productToAdd.size.map((size, index) => (
                                <p key={index} onClick={() => handleSizeSelectionForAddToCart(size)}>
                                  {size}
                                </p>
                              ))}
                            </div>
                            <IoClose onClick={() => setIsSizeSelectionVisible(false)}/>
                          </div>
                        </div>
                      )}
                      <h6>{item.name}</h6>
                      <p>{item.description}</p>
                      {item.discountPrice > 0 ? (
                        <>
                          <span className="discountPrice">R$ {parseFloat(item.originalPrice).toFixed(2).replace('.', ',')}</span>
                          <br />
                          <span>R$ {parseFloat(item.discountPrice).toFixed(2).replace('.', ',')}</span>
                        </>
                      ) : (
                        <span>R$ {parseFloat(item.originalPrice).toFixed(2).replace('.', ',')}</span>
                      )}
                      <div className="div">
                        <button type="button" onClick={() => { navigate(`/product/${item.id}`); scrollToTop() }}>DETALHES</button>
                        <HiOutlineShoppingBag onClick={() => handleAddToCart(item)}/>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="no-results-message">Nenhum item encontrado.</p>
                )}
              </div>
            </section>
          </main>
        </>
      )}

      <Footer />
    </>
  )
}
