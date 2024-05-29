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

import video1 from '../../assets/video1.png'
import video2 from '../../assets/video2.png'
import video3 from '../../assets/video3.png'

import { BsArrowRight } from "react-icons/bs"

register()

export default function CarouselActions() {
  const [slidesPerView, setSlidesPerView] = useState(1)

  const data = [
    { 
      id: '1', 
      image: video1, 
      title: 'Podcast com Karine Carrijo | GloryCast | #45', 
      description: 'GloryCast: nova temporada com fé e testemunhos. No 1º episódio, Karine Carrijo compartilha sua jornada e transformações.', 
      tags: ['#podcast', '#glorycast', '#karinecarrijo'], 
      channelName: 'Glorify Brasil', 
      publishDate: '08/05/2024', 
      link: 'https://www.youtube.com/watch?v=HnFv_bZANpk' 
    },
    { 
      id: '2', 
      image: video2, 
      title: 'HISTÓRIA DE SUPERAÇÃO - Karine Carrijo e Thiago Lima', 
      description: 'História inspiradora de Karine Carrijo e Thiago Lima sobre superação e resiliência.', 
      tags: ['#históriadevida', '#fé', '#testemunho'], 
      channelName: 'Thiago, mais conhecido como Diniz', 
      publishDate: '01/04/2024', 
      link: 'https://www.youtube.com/watch?v=0uhfEvrAhDg' 
    },
    { 
      id: '3', 
      image: video3, 
      title: 'KILIQUINHA #28 | BLOGUEIRA | ATRIZ | CANTORA', 
      description: 'A artista de milhões!!! Ela é blogueira, atriz, cantora e dona de uma beleza inigualável: Kiliquinha o nome dela.', 
      tags: ['#kiliquinha', '#entrevista', '#karinecarrijo'], 
      channelName: 'MULHERAMA PODCAST', 
      publishDate: '01/09/2022', 
      link: 'https://www.youtube.com/watch?v=oZYClu3UfUE' 
    }
  ]

  return (
    <Swiper className="swiper-container" modules={[FreeMode, Pagination]} slidesPerView={slidesPerView} pagination={{ clickable: true }} spaceBetween={10} freeMode={1} navigation>
      {data.map((item) => (
        <SwiperSlide key={item.id} className="slide">
        <img src={item.image}/>
        <div className="content">
          <h3>{item.title}</h3>
          <p>{item.description}</p>
          <div className="tags">
            {item.tags.map((tag, index) => (
              <span key={index}>{tag}</span>
            ))}
          </div>
          <p>{item.channelName} | {item.publishDate}</p>
          <a href={item.link} target="_blank" rel="noopener noreferrer">Assistir agora <BsArrowRight/></a>
        </div>
      </SwiperSlide>      
      ))}
    </Swiper>
  )
}
