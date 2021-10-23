import React, { useEffect, useState } from 'react'

import { useFindPopularProducts } from '../../hooks/fetch/fetchShop'
import { NavLink } from 'react-router-dom'
import Image from '../common/Image'
import LoadableBox from '../common/LoadableBox'
import { DefaultRoutesConstants } from '../../utils/constants'
import { SERVER_URL } from '../../config'

import { ReactComponent as LogoSVG } from '../../assets/ico/logo.svg'

import styles from '../../styles/Home/Home.module.scss'
import Slider from '../common/Slider'

export default function Home() {
  const [popularProducts, setPopularProducts] = useState([])

  const { findPopularProducts, data, loading } = useFindPopularProducts()

  useEffect(() => {
    findPopularProducts(5)
  }, [])

  useEffect(() => {
    if (data) {
      setPopularProducts(data)
    }
  }, [data])

  return (
    <div className={styles.home}>
      <div className={styles.title}>
        <div className={styles.logo}>
          <LogoSVG />
        </div>
        <h1>Online Store</h1>
        <h4>prototype</h4>
      </div>
      <div className={styles.popular}>
        <h2>Popular</h2>
        <div className={styles.items}>
          <Slider>
            {popularProducts.map(item => (
              <div className={styles.item} key={item.product._id}>
                <NavLink to={DefaultRoutesConstants.PRODUCTS_ROUTE + '/' + item.product._id} className={styles.img}>
                  <Image src={`${SERVER_URL}/${item.product.img}`} />
                </NavLink>
              </div>
            ))}
            {loading ? Array(5).fill(0).map((item, i) => <LoadableBox key={i} width='200px' height='220px' />) : ''}
          </Slider>
        </div>
      </div>
    </div>
  )
}
