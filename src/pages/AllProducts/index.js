import React, { useEffect, useState } from "react"
import './allproducts.scss'
import { useNavigate } from "react-router-dom"

import Header from "../../components/Header"

import shirt1 from '../../assets/mockups/shirt3.png'
import shirt2 from '../../assets/mockups/shirt4.png'
import shirt3 from '../../assets/mockups/shirt.png'

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
    { name: "Moletons", count: 7 },
    { name: "Bolsas", count: 2 }
  ]

  const sizes = ["S", "M", "L", "XL"]

  const items = [
    { id: 1, name: "Camiseta", price: "R$77,00", description: "Estilo e conforto em uma camiseta de qualidade.", src: shirt1 },
    { id: 2, name: "Camiseta", price: "R$55,00", description: "Clássica e elegante, ideal para o dia a dia.", src: shirt2 },
    { id: 3, name: "Camiseta", price: "R$99,00", description: "Trendy e único, feito para se destacar.", src: shirt3 },
    { id: 4, name: "Camiseta", price: "R$120,00", description: "Premium e confortável, para um estilo elevado.", src: shirt1 },
    { id: 5, name: "Camiseta", price: "R$45,00", description: "Vibrante e versátil, perfeita para qualquer ocasião.", src: shirt3 },
    { id: 6, name: "Camiseta", price: "R$85,00", description: "Moderno e na moda, para quem segue as tendências.", src: shirt1 },
    { id: 7, name: "Camiseta", price: "R$70,00", description: "Estilo sem esforço para combinar com tudo.", src: shirt2 },
    { id: 8, name: "Camiseta", price: "R$60,00", description: "Conforto e sofisticação em uma peça única.", src: shirt1 },
    { id: 9, name: "Camiseta", price: "R$80,00", description: "Destaque-se com um design ousado e moderno.", src: shirt3 }
  ]

  useEffect(() => {
    document.title = "Jesustyle | Descubra Nossa Coleção de Moda"
  }, [])

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
                <span>{item.price}</span>
                <div>
                  <button type="button" onClick={() => navigate(`/product/${item.id}`)}>COMPRAR</button>
                  <HiOutlineShoppingBag/>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </>
  )
}