"use client"

import React, { useContext } from 'react'
import styles from './navbar.module.css'
import Image from 'next/image'
import Link from 'next/link'
import AuthLinks from '../authLinks/AuthLinks'
import ThemeToggle from '../themeToggle/ThemeToggle'
import { ThemeContext } from '@/context/themeContext'

function Navbar() {
  const {theme} = useContext(ThemeContext)
  return (
    <div className={styles.container}>
      <div className={styles.social}>
        <Image src={theme === 'light' ? '/images/twitterx.png' : '/images/twitterx-dark.png'} alt='twitter x' width={26} height={26}/>
        <Image src='/images/linkedin.png' alt='linkedin' width={26} height={26}/>
        <Image src='/images/github.png' alt='github' width={26} height={26}/>
        <Image src='/images/youtube.png' alt='youtube' width={26} height={26}/>
        <Image src={theme === 'light' ? '/images/website.png' : '/images/website-dark.png'} alt='website' width={26} height={26}/>
      </div>
      <div className={styles.logo}>C.E BLOG</div>
      <div className={styles.links}>
        <ThemeToggle />
        <Link href={'/'} className={styles.link}>Home</Link>
        <Link href={'/contact'} className={styles.link}>Contact</Link>
        <Link href={'/about'} className={styles.link}>About</Link>
        <AuthLinks />
      </div>
    </div>
  )
}

export default Navbar