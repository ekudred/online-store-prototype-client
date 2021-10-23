import React from 'react'

import styles from '../../styles/common/LoadableBox.module.scss'

export default function LoadableBox({ width, height }) {
  return <div className={styles.box} style={{ width: width || 'auto', height: height || 'auto' }}></div>
}
