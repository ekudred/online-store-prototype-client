import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import { SERVER_URL } from '../../../../config'
import { useEditProduct } from '../../../../hooks/fetch/admin/fetchAdminShop'
import { useGetRating } from '../../../../hooks/fetch/fetchShop'
import useFileInput from '../../../../hooks/useFileInput'

import { Cell, CellInput, CellSelect, CellImage, Item, Edit } from '../../../common/Table'

export default function ProductItem({ item, setActive, removeActive }) {
  const { types, brands } = useSelector(state => state.admin)

  const [activeItem, setActiveItem] = useState(false)
  const [editItem, setEditItem] = useState(false)

  const [value, setValue] = useState(item)
  const [img, setImg] = useState(`${SERVER_URL}/${item.img}`)
  const [type, setType] = useState(item.type)
  const [brand, setBrand] = useState(item.brand)
  const [info, setInfo] = useState(item.info)
  const [rating, setRating] = useState(0)

  const { editProduct } = useEditProduct()
  const { getRating, data: ratingData } = useGetRating()

  const { onChangeFileInput, result } = useFileInput()

  const onChangeInfo = e => setInfo({ ...info, [e.target.name]: e.target.value })
  const onChangeCell = e => setValue({ ...value, [e.target.name]: e.target.value })
  const onClickActive = () => {
    if (!editItem) {
      setActiveItem(!activeItem)
      !activeItem ? setActive(value) : removeActive(value)
    }
  }
  const onClickEdit = () => {
    if (activeItem) {
      setActiveItem(false)
      removeActive(value)
    }
    setEditItem(true)
  }
  const onClickSave = () => {
    if (JSON.stringify({ ...value, type, brand, info, img: img.split('/')[img.split('/').length - 1] }) !== JSON.stringify(item)) {
      editProduct({ ...value, type, brand, info, img: result ? img : item.img })
      setEditItem(false)
    }
  }
  const onClickCancel = () => {
    setValue(item)
    setImg(`${SERVER_URL}/${value.img}`)
    setType(item.type)
    setBrand(item.brand)
    setEditItem(false)
  }

  useEffect(() => {
    if (result) {
      setImg(result)
    }
  }, [result])

  useEffect(() => getRating(item._id), [])
  useEffect(() => {
    if (ratingData) setRating(ratingData.rating)

    return () => {
      setRating(0)
    }
  }, [ratingData])

  return (
    <>
      <Item onClick={onClickActive} active={activeItem} editActive={editItem}>
        <CellInput value={value.name} name={'name'} onChange={onChangeCell} readOnly={!editItem} disabled={!editItem} />
        <CellSelect options={types} select={type} disabled={!editItem} setSelect={setType} />
        <CellSelect options={brands} select={brand} disabled={!editItem} setSelect={setBrand} />
        <CellInput value={value.price} name={'price'} onChange={onChangeCell} readOnly={!editItem} disabled={!editItem} />
        <CellInput value={info?.title} name={'title'} onChange={onChangeInfo} readOnly={!editItem} disabled={!editItem} />
        <CellInput value={info?.description} name={'description'} onChange={onChangeInfo} readOnly={!editItem} disabled={!editItem} />
        <CellImage value={img} onChange={onChangeFileInput} htmlFor={value.img} readOnly={!editItem} disabled={!editItem} />
        <Cell value={rating} />
      </Item>
      <Item>
        <Edit active={editItem} onClickEdit={onClickEdit} onClickSave={onClickSave} onClickCancel={onClickCancel} />
      </Item>
    </>
  )
}
