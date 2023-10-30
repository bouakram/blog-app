"use client"

import React, { useState } from 'react'
import styles from './authlinks.module.css'
import Link from 'next/link'
import { signOut, useSession } from 'next-auth/react'

function AuthLinks() {
  const {data, status} = useSession()
  const [open, setOpen] = useState(false)
  return (
    <>
      {status === 'unauthenticated' ? 
      <Link href={'/login'} className={styles.link}>Login</Link>
      :
      <>
      <Link href={'/write'} className={styles.link}>Write</Link>
      <span className={styles.link} onClick={signOut}>Logout</span>
      </>
      }
      <div className={styles.burger} onClick={()=>setOpen(!open)}>
        <div className={styles.line}></div>
        <div className={styles.line}></div>
        <div className={styles.line}></div>
      </div>
      {open && (
        <div className={styles.responsiveMenu}>
          <Link href={'/'}>Home</Link>
          <Link href={'/contact'}>Contact</Link>
          <Link href={'/about'}>About</Link>
          {!status ? 
          <Link href={'/login'}>Login</Link>
          :
          <>
          <Link href={'/write'}>Write</Link>
          <span className={styles.link} onClick={signOut}>Logout</span>
          </>
          }
        </div>
      )}
    </>
  )
}

export default AuthLinks