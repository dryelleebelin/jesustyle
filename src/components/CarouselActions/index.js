import React, { useState, useEffect } from 'react'
import './carouselactions.scss'

import { register } from 'swiper/element/bundle'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import 'swiper/css/effect-fade'
import { Swiper, SwiperSlide } from 'swiper/react'
import { FreeMode, Pagination } from 'swiper/modules'

import illustration from '../../assets/logos/black-white.png'

import { BsArrowRight } from "react-icons/bs"

register()

export default function CarouselActions() {
    const [slidesPerView, setSlidesPerView] = useState(2)

    const data = [
      { id: '1', image: illustration },
      { id: '2', image: illustration },
      { id: '3', image: illustration },
      { id: '4', image: illustration },
      { id: '5', image: illustration }
    ]

    useEffect(() => {
      function handleResize() {
        if (window.innerWidth < 480){
          setSlidesPerView(3)
        } else if (window.innerWidth >= 481 && window.innerWidth <= 1023){
          setSlidesPerView(3)
        } else {
          setSlidesPerView(1)
        }
      }
      handleResize()
      window.addEventListener('resize', handleResize)
      return () => {
        window.removeEventListener('resize', handleResize)
      }
    }, [])

  return (
    <Swiper className="swiper-container" modules={[FreeMode, Pagination]} slidesPerView={slidesPerView} pagination={{ clickable: true }} spaceBetween={10} freeMode={1}navigation>
      {data.map((item) => (
        <SwiperSlide key={item.id} className="slide">
        <img src={item.image} />
        <div className="content">
          <h3>Título do Vídeo</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium.</p>
          <div className="tags">
            <span>#tag1</span>
            <span>#tag2</span>
            <span>#tag3</span>
          </div>
          <p>Nome do Canal | Data de publicação</p>
          <a href='#'>Assistir agora <BsArrowRight/></a>
        </div>
      </SwiperSlide>      
      ))}
    </Swiper>
  )
}
