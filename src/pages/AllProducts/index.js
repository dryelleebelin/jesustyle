import React, { useEffect, useState } from "react"
import './allproducts.scss'
import { useNavigate } from "react-router-dom"
import { Spinner } from '@chakra-ui/react'

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
  const [selectedSizes, setSelectedSizes] = useState([])
  const [selectedCategories, setSelectedCategories] = useState([])
  const [selectedSortOption, setSelectedSortOption] = useState("priceLowToHigh")
  const [loading, setLoading] = useState(false)

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
  };

  const handleSortChange = (event) => {
    setSelectedSortOption(event.target.value)
  }

  const categories = [
    { name: "Blusas", count: 3 },
    { name: "Moletons", count: 7 }
  ]

  const sizes = ["PP", "P", "M", "G"]

  const items = [
    { id: 1, name: "Camiseta", price: 77, description: "Estilo e conforto em uma camiseta de qualidade.", src: shirt1, size: "M", category: "Blusas" },
    { id: 2, name: "Camiseta", price: 55, description: "Clássica e elegante, ideal para o dia a dia.", src: shirt2, size: "P", category: "Blusas" },
    { id: 3, name: "Camiseta", price: 99, description: "Trendy e único, feito para se destacar.", src: shirt3, size: "G", category: "Blusas" },
    { id: 4, name: "Camiseta", price: 120, description: "Premium e confortável, para um estilo elevado.", src: shirt4, size: "M", category: "Moletons" },
    { id: 5, name: "Camiseta", price: 45, description: "Vibrante e versátil, perfeita para qualquer ocasião.", src: shirt5, size: "P", category: "Moletons" }
  ]

  useEffect(() => {
    document.title = "Jesustyle | Descubra Nossa Coleção"
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const filteredItems = items.filter(item => {
    if (selectedSizes.length > 0 && !selectedSizes.includes(item.size)) {
      return false
    }
    if (selectedCategories.length > 0 && !selectedCategories.includes(item.category)) {
      return false
    }
    return true
  })

  const sortedItems = filteredItems.sort((a, b) => {
    switch(selectedSortOption) {
      case "priceLowToHigh":
        return a.price - b.price
      case "priceHighToLow":
        return b.price - a.price
      case "nameAToZ":
        return a.name.localeCompare(b.name)
      case "nameZToA":
        return b.name.localeCompare(a.name)
      default:
        return 0
    }
  })

  return(
    <>
      <Header/>

      {loading ? (
        <div className="spinner-page">
          <Spinner className="spinner" speed='0.70s'/>
        </div>
      ) : (
        <>
          <section className="banner-all-products"></section>
        
          <main className="all-products">
            <aside>
              <h1>Coleção</h1>
              <div className="filters">
                <p><FaListUl/> Filtros <span>({selectedSizes.length + selectedCategories.length})</span></p>
                <span onClick={handleResetAll}>Limpar filtro</span>
              </div>
              <div className="category">
                <h2>Categorias</h2>
                {categories.map((category, index) => (
                  <p key={index} onClick={() => handleCategorySelection(category.name)}>
                    {selectedCategories.includes(category.name) ? <MdCheckCircle/> : <MdOutlineCircle/>} {category.name} <span>({category.count})</span>
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
                {filteredItems.map(item => (
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
        </>
      )}

      <Footer/>
    </>
  )
}
