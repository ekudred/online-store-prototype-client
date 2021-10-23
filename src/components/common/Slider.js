import React from 'react'
import Slicklider from 'react-slick'

import { ReactComponent as ArrowSVG } from '../../assets/ico/backward-arrow.svg'

import styles from '../../styles/common/Slider.module.scss'

export default function Slider({ children }) {
  return (
    <Slicklider
      className={styles.slider}
      style={{ maxWidth: '1110px' }}
      dots={false}
      prevArrow={<Arrow direction={'prev'} />}
      nextArrow={<Arrow direction={'next'} />}
      speed={500}
      slidesToShow={1}
      slidesToScroll={1}
      swipeToSlide={true}
      infinite={true}
      variableWidth={true}
    >
      {children}
    </Slicklider>
  )
}

function Arrow({ className, style, onClick, direction = 'prev' }) {
  return (
    <div style={{ ...style }} className={`${className} ${direction === 'prev' ? styles.prev : styles.next}`} onClick={onClick}>
      <ArrowSVG />
    </div>
  )
}
