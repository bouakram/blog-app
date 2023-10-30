"use client"

import React, { useContext } from 'react'
import styles from './themetoggle.module.css'
import Image from 'next/image'
import { ThemeContext } from '@/context/themeContext'

function ThemeToggle() {
  const {theme, toggle} = useContext(ThemeContext)
  const ballStyle =  theme === 'dark' ? {left: 1} : {right: 1}
  const bgStyle = theme === 'dark' ? {backgroundColor: '#a6a6a6'} : {backgroundColor: '#1f273a'}
  return (
    <div className={styles.container} onClick={toggle} style={bgStyle}>
      <Image src='/images/moon.png' alt='moon' width={20} height={20}/>
      <div className={styles.ball} 
      style={ballStyle}></div>
      <Image src='/images/sunny.png' alt='sunny' width={20} height={20}/>
    </div>
  )
}

export default ThemeToggle