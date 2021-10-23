import React, { useEffect, useState } from 'react'

import { useAdminShopSubscription } from '../../hooks/fetch/admin/fetchAdminShop'
import { useSelector } from 'react-redux'
import useActions from '../../hooks/useActions'
import { useGetAllTypes } from '../../hooks/fetch/fetchShop'
import { useGetAllBrands } from '../../hooks/fetch/fetchShop'
import TableWrapper from './tables/TableWrapper'
import ProductsTable from './tables/Products/index'
import TypesTable from './tables/Types/index'
import BrandsTable from './tables/Brands/index'
import UsersTable from './tables/Users/index'

import styles from '../../styles/Admin/Admin.module.scss'

export default function Admin() {
  const { brands, types } = useSelector(state => state.admin)

  const [tableActive, setTableActive] = useState('1')

  const [tabs, setTabs] = useState([
    { id: '1', title: 'Товары' },
    { id: '2', title: 'Типы' },
    { id: '3', title: 'Бренды' },
    { id: '4', title: 'Пользователи' },
  ])

  const [tables, setTables] = useState([
    { id: '1', table: <ProductsTable /> },
    { id: '2', table: <TypesTable /> },
    { id: '3', table: <BrandsTable /> },
    { id: '4', table: <UsersTable /> },
  ])

  useAdminShopSubscription()

  const { setAdminBrands, setAdminTypes } = useActions()
  const { getAllBrands, data: brandData } = useGetAllBrands()
  const { getAllTypes, data: typeData } = useGetAllTypes()

  useEffect(() => {
    if (brands.length === 0 && types.length === 0) {
      getAllBrands()
      getAllTypes()
    }
  }, [])

  useEffect(() => {
    if (brandData !== null && typeData !== null) {
      setAdminBrands(brandData)
      setAdminTypes(typeData)
    }
  }, [brandData, typeData])

  return (
    <div className={styles.admin}>
      <div className={styles.container}>
        <div className={styles.tabs}>
          {tabs.map(item => (
            <button key={item.id} className={`${styles.tab} ${item.id === tableActive ? styles.active : ''}`} onClick={() => setTableActive(item.id)}>
              {item.title}
            </button>
          ))}
        </div>

        {tables.map(item => (
          <TableWrapper visible={item.id === tableActive ? true : false} key={item.id}>
            {item.table}
          </TableWrapper>
        ))}
      </div>
    </div>
  )
}
