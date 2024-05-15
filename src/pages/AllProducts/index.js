import React, { useEffect, useState } from "react"
import './allproducts.scss'
import { useNavigate } from "react-router-dom"

import Header from "../../components/Header"
import Footer from "../../components/Footer"

import shirt1 from '../../assets/mockups/shirt3.png'
import shirt2 from '../../assets/mockups/shirt4.png'
import shirt3 from '../../assets/mockups/shirt.png'
import shirt4 from '../../assets/mockups/shirt1.png'
import shirt5 from '../../assets/mockups/shirt2.png'

import { FaListUl } from "react-icons/fa"
import { MdOutlineCircle, MdCheckCircle } from "react-icons/md"
import { HiOutlineShoppingBag } from "react-icons/hi2"

export default function AllProducts(){
  const navigate = useNavigate()
  const [selectedSize, setSelectedSize] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [selectedSortOption, setSelectedSortOption] = useState("priceLowToHigh")

  const handleSizeSelection = (size) => {
    setSelectedSize(size)
  }

  const handleCategorySelection = (category) => {
    setSelectedCategory(category === selectedCategory ? null : category)
  }

  const handleResetAll = () => {
    setSelectedSize(null)
    setSelectedCategory(null)
  }

  const handleSortChange = (event) => {
    setSelectedSortOption(event.target.value)
  }

  const categories = [
    { name: "Camisetas", count: 5 },
    { name: "Blusas", count: 3 },
    { name: "Moletons", count: 7 }
  ]

  const sizes = ["PP", "P", "M", "G"]

  const items = [
    { id: 1, name: "Camiseta", price: 77, description: "Estilo e conforto em uma camiseta de qualidade.", src: shirt1 },
    { id: 2, name: "Camiseta", price: 55, description: "Clássica e elegante, ideal para o dia a dia.", src: shirt2 },
    { id: 3, name: "Camiseta", price: 99, description: "Trendy e único, feito para se destacar.", src: shirt3 },
    { id: 4, name: "Camiseta", price: 120, description: "Premium e confortável, para um estilo elevado.", src: shirt4 },
    { id: 5, name: "Camiseta", price: 45, description: "Vibrante e versátil, perfeita para qualquer ocasião.", src: shirt5 }
  ]

  useEffect(() => {
    document.title = "Jesustyle | Descubra Nossa Coleção"
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return(
    <>
      <Header/>

      <section className="banner-all-products"></section>

      <main className="all-products">
        <aside>
          <h1>Collection</h1>
          <div className="filters">
            <p><FaListUl/> Filtros <span>(2)</span></p>
            <span onClick={handleResetAll}>Limpar filtro</span>
          </div>
          <div className="category">
            {categories.map((category, index) => (
              <p key={index} onClick={() => handleCategorySelection(category.name)}>
                {selectedCategory === category.name ? <MdCheckCircle/> : <MdOutlineCircle/>} {category.name} <span>({category.count})</span>
              </p>
            ))}
          </div>
          <div className="container-size">
            <h2>Size</h2>
            <div>
              {sizes.map((size, index) => (
                <p key={index} className={`size ${selectedSize === size ? "selected" : ""}`} onClick={() => handleSizeSelection(size)}>{size}</p>
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
            {items.map(item => (
              <div className="item" key={item.id}>
                <img src={item.src} alt="Item"/>
                <h6>{item.name}</h6>
                <p>{item.description}</p>
                <span>R$ {parseFloat(item.price).toFixed(2).replace('.', ',')}</span>
                <div>
                  <button type="button" onClick={() => {navigate(`/product/${item.id}`); scrollToTop();}}>DETALHES</button>
                  <HiOutlineShoppingBag/>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer/>
    </>
  )
}