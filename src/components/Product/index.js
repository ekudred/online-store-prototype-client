import React, { useEffect, useMemo, useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { CSSTransition } from 'react-transition-group'

import useActions from '../../hooks/useActions'
import Stars from '../common/Stars'
import Image from '../common/Image'
import Button from '../common/Button'
import { useAddBasketItem, useDeleteBasketItem, useEditBasketItem } from '../../hooks/fetch/fetchBasket'
import { useGetProduct, useGetRating, useGetRate, useAddRate, useUpdateRatingSubscription } from '../../hooks/fetch/fetchShop'
import LoadableBox from '../common/LoadableBox'
import { SERVER_URL } from '../../config'

import { ReactComponent as PlusSVG } from '../../assets/ico/plus.svg'
import { ReactComponent as MinusSVG } from '../../assets/ico/minus.svg'
import { ReactComponent as BackwardArrowSVG } from '../../assets/ico/backward-arrow.svg'

import styles from '../../styles/Product/Product.module.scss'

export default function Product() {
  const { id } = useParams()
  const history = useHistory()

  const { product } = useSelector(state => state.shop)
  const { basket } = useSelector(state => state.basket)
  const { basket: basket_id, _id: user_id } = useSelector(state => state.auth.user)
  const { isAuth } = useSelector(state => state.auth)

  const [rate, setRate] = useState(0)
  const [rating, setRating] = useState(0)
  const [amount, setAmount] = useState(1)

  const [edit, setEdit] = useState(false)
  const [calcDisabled, setCalcDisabled] = useState(false)
  const [saveEditDisabled, setSaveEditDisabled] = useState(true)

  const { editBasketItem: editAmount, setProduct } = useActions()

  const { getProduct, loading } = useGetProduct()
  const { getRating, data: dataRating } = useGetRating()
  const { getRate, data: dataRate } = useGetRate()
  const { addRate } = useAddRate()
  const { addBasketItem } = useAddBasketItem()
  const { deleteBasketItem } = useDeleteBasketItem()
  const { editBasketItem } = useEditBasketItem()

  const checkedBasket = useMemo(() =>
    basket.reduce((accum, item) => (item.product._id === product._id ? (accum = { isIn: true, item }) : accum), { isIn: false, item: null })
  )

  const onClickAdd = () => addBasketItem({ basket_id, product_id: product._id, amount })
  const onClickDelete = () => {
    setAmount(1)
    deleteBasketItem({ basket_id, product_id: product._id })
  }
  const onClickEdit = () => setEdit(true)
  const onClickCancelEdit = () => setEdit(false)
  const onClickSaveEdit = () => {
    editAmount({ product_id: product._id, amount })
    editBasketItem({ basket_id, product_id: product._id, amount })
    setEdit(false)
  }

  const onClickBackward = () => history.goBack()

  const onClickDecrement = () => (amount > 1 ? setAmount(prev => prev - 1) : null)
  const onClickIncrement = () => (amount < 99 ? setAmount(prev => prev + 1) : null)
  const onClickSetRate = value => {
    setRate(value)
    addRate({ user_id, product_id: id, rate: value })
  }

  useEffect(() => {
    getRate({ user_id, product_id: id })
    getRating(id)
    getProduct(id)
  }, [id])
  useEffect(() => {
    if (dataRating) setRating(dataRating.rating)
    if (dataRate) setRate(dataRate)
  }, [dataRating, dataRate])
  useEffect(
    () => () => {
      setRate(0)
      setRating(0)
      setProduct({})
    },
    []
  )
  useUpdateRatingSubscription(setRating, id)
  useEffect(() => (checkedBasket.isIn && !edit ? setAmount(checkedBasket.item.amount) : null))
  useEffect(() => (checkedBasket.isIn && !edit ? setCalcDisabled(true) : setCalcDisabled(false)), [checkedBasket])
  useEffect(() => (checkedBasket.item?.amount === amount ? setSaveEditDisabled(true) : setSaveEditDisabled(false)), [amount])

  return (
    <div className={styles.product}>
      <div className={styles.head}>
        <div className={styles.container}>
          <button className={styles.backward} onClick={onClickBackward}>
            <BackwardArrowSVG />
          </button>
          {isAuth ? <Stars rating={rate} setRating={onClickSetRate} /> : ''}
        </div>
      </div>
      <div className={styles.body}>
        <div className={styles.box}>
          {!loading && product.img ? <Image src={`${SERVER_URL}/${product.img}`} /> : <LoadableBox height='300px' />}
          <div className={`${styles.calc} ${calcDisabled ? styles.disabled : ''}`}>
            <div className={styles.amount}>
              <button readOnly className={styles.input}>
                {String(amount)}
              </button>
              <div className={styles.label}>
                <button className={styles.decrement} onClick={onClickDecrement}>
                  <MinusSVG />
                </button>
                <button className={styles.increment} onClick={onClickIncrement}>
                  <PlusSVG />
                </button>
              </div>
            </div>
            <div className={styles.price}>{loading ? 0 : String(product.price * amount)}</div>
          </div>
          <CSSTransition in={isAuth} timeout={0} mountOnEnter unmountOnExit>
            <div className={styles.buttons}>
              {checkedBasket.isIn ? (
                <>
                  {edit ? (
                    <div className={styles.case}>
                      <Button buttonStyle={styles.edit} onClick={onClickSaveEdit} disabled={saveEditDisabled}>
                        Сохранить
                      </Button>
                      <Button buttonStyle={styles.edit} onClick={onClickCancelEdit}>
                        Отменить
                      </Button>
                    </div>
                  ) : (
                    <Button buttonStyle={styles.edit} onClick={onClickEdit}>
                      Изменить
                    </Button>
                  )}
                  <Button buttonStyle={styles.delete} onClick={onClickDelete}>
                    Убрать из корзины
                  </Button>
                </>
              ) : (
                <Button buttonStyle={styles.add} onClick={onClickAdd}>
                  Добавить в корзину
                </Button>
              )}
            </div>
          </CSSTransition>
        </div>
        <div className={styles.box}>
          <div className={styles.title}>
            <div className={styles.stars}>
              <Stars rating={rating} setRating={setRating} size={30} />
            </div>
            {product.name ? (
              <>
                <div>
                  <span>Название:</span> {product.name}
                </div>
                <div>
                  <span>Бренд:</span> {product.brand.name}
                </div>
                <div>
                  <span>Тип:</span> {product.type.name}
                </div>
                <h4>Описание:</h4>
                <div>{product.info?.title || ''}</div>
                <div>{product.info?.description || ''}</div>
              </>
            ) : (
              <>
                <LoadableBox width='150px' height='1.5rem' />
                <LoadableBox width='100px' height='1rem' />
                <LoadableBox width='100px' height='1rem' />
                <h4>Описание:</h4>
                <LoadableBox width='200px' height='1rem' />
                <LoadableBox width='500px' height='3rem' />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
