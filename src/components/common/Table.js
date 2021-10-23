import React from 'react'

import Image from './Image'
import Select from './Select'

import { ReactComponent as EditSVG } from '../../assets/ico/edit.svg'
import { ReactComponent as SaveSVG } from '../../assets/ico/save.svg'
import { ReactComponent as CancelSVG } from '../../assets/ico/cancel.svg'

import styles from '../../styles/common/Table.module.scss'

export function Table({ children }) {
  return <table className={styles.table}>{children}</table>
}

export function Head({ children }) {
  return <thead className={styles.head}>{children}</thead>
}

export function Body({ children }) {
  return <tbody className={styles.body}>{children}</tbody>
}

export function Item({ children, active, editActive, onClick }) {
  return (
    <tr className={`${styles.item} ${active ? styles.active : ''} ${editActive ? styles.editActive : ''}`} onClick={onClick}>
      {children}
    </tr>
  )
}

export function Cell({ value }) {
  return (
    <td className={styles.cell}>
      <button className={styles.button}>{value}</button>
    </td>
  )
}

export function CellInput({ value, onChange, name, readOnly, disabled }) {
  return (
    <td className={styles.cell}>
      <input className={styles.input} type='text' name={name} readOnly={readOnly} disabled={disabled} value={value} onChange={onChange} />
    </td>
  )
}

export function CellSelect({ options, select, setSelect, disabled }) {
  return (
    <td className={styles.cellSelect}>
      <Select
        options={options}
        select={select}
        setSelect={setSelect}
        disabled={disabled}
        selectStyles={{ boxShadow: 'none', padding: 'calc(0.8rem + 1px)', backgroundColor: 'rgba(255, 255, 255, 0.5)' }}
      />
    </td>
  )
}

export function CellImage({ value, onChange, readOnly, disabled, htmlFor }) {
  return (
    <td className={styles.cell}>
      <div className={styles.box}>
        <input className={styles.fileInput} id={htmlFor} type='file' readOnly={readOnly} disabled={disabled} onChange={onChange} />
        <label className={styles.label} htmlFor={htmlFor}>
          <Image width='3rem' height='3rem' src={value} />
        </label>
      </div>
    </td>
  )
}

export function Edit({ active, onClickEdit, onClickSave, onClickCancel }) {
  if (!active) {
    return (
      <td className={styles.edit} onClick={onClickEdit}>
        <EditSVG />
      </td>
    )
  } else {
    return (
      <>
        <td className={styles.edit} onClick={onClickCancel}>
          <CancelSVG />
        </td>
        <td className={styles.edit} onClick={onClickSave}>
          <SaveSVG />
        </td>
      </>
    )
  }
}
