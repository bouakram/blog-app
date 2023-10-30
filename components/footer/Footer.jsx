"use client"

import React, { useContext } from 'react'
import styles from './footer.module.css'
import Image from 'next/image'
import { ThemeContext } from '@/context/themeContext'
import Link from 'next/link'

function Footer() {
  const {theme} = useContext(ThemeContext)
  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <div className={styles.logo}>
          <Image src='/images/blogcover.png' alt='akram boughazi code ease blog' width={50} height={50} className={styles.image}/>
          <h1 className={styles.logoText}>Code.Ease blog</h1>
        </div>
        <p className={styles.desc}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsa aperiam expedita eaque veritatis suscipit! Nostrum excepturi esse architecto eos veritatis?
        </p>
        <div className={styles.social}>
          <Image src={theme === 'light' ? '/images/twitterx.png' : '/images/twitterx-dark.png'} alt='twitter x' width={22} height={22}/>
          <Image src='/images/linkedin.png' alt='linkedin' width={22} height={22}/>
          <Image src='/images/github.png' alt='github' width={22} height={22}/>
          <Image src='/images/youtube.png' alt='youtube' width={22} height={22}/>
          <Image src={theme === 'light' ? '/images/website.png' : '/images/website-dark.png'} alt='website' width={22} height={22}/>
        </div>
      </div>
      <div className={styles.links}>
        <div className={styles.list}>
          <span className={styles.listTitle}>Links</span>
          <Link href={'/'} className={styles.link}>Home</Link>
          <Link href={'/about'} className={styles.link}>About</Link>
          <Link href={'/contact'} className={styles.link}>Contact</Link>
        </div>
      </div>
    </div>
  )
}

export default Footer