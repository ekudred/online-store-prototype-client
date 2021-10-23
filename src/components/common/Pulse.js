import React from 'react'

import styles from '../../styles/common/Pulse.module.scss'

export default function Pulse({ children, className, circleClassName }) {
    const onClickPulseHandler = (e) => {
        let target = e.target

        let circle = document.createElement('div')
        let size = Math.max(target.clientWidth, target.clientHeight)
        let rect = target.getBoundingClientRect()

        circle.style.width = circle.style.height = size + 'px'
        circle.style.left = e.clientX - rect.left - size / 2 + 'px'
        circle.style.top = e.clientY - rect.top - size / 2 + 'px'

        circle.classList.add(styles.circle)
        circle.classList.add(circleClassName)
        target.appendChild(circle)

        setTimeout(() => circle.remove(), 1000)
    }

    return (
        <div
            className={`${styles.pulse} ${className ? className : ''}`}
            onClick={onClickPulseHandler}
        >
            {children}
        </div>
    )
}
