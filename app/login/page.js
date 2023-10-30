"use client"

import React from 'react'
import styles from './loginPage.module.css'
import Image from 'next/image'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

function Login() {
  const {data, status} = useSession()
  const router = useRouter()
  if (status === 'loading') {
    return <div className={styles.loading}>loading....</div>
  }
  if (status === 'authenticated'){
    router.push('/')
  }
  return (
    <div className={styles.container}>
        <div className={styles.wrapper}>
            <button className={styles.socialButton} onClick={()=>signIn("google")}><Image src='/images/google.png' alt='google logo' width={24} height={24}/>Login with Google</button>
            <button className={styles.socialButton} onClick={()=>signIn("github")}><Image src='/images/github.png' alt='github logo' width={24} height={24}/>Login with Github</button>
            <button disabled className={styles.socialButton} onClick={()=>signIn("facebook")}><Image src='/images/facebook.png' alt='facebook logo' width={24} height={24}/>login with Facebook</button>
        </div>
    </div>
  )
}

export default Login