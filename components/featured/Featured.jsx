import React from 'react'
import styles from './featured.module.css'
import Image from 'next/image'
import { BASE_URL } from '@/app/utils/connections'
import Link from 'next/link'

const getFeatured = async () =>{
  const res = await fetch(`${BASE_URL}api/posts/popular`, {cache: "no-store"})

  if(!res.ok) {
    throw new Error("Couldn't fetch featured")
  }

  return res.json()
}

async function Featured() {
  const posts = await getFeatured()
  return (
    <div className={styles.containr}>
      <h1 className={styles.title}>
        <b className={styles.bold}>Hey, Code Ease here!</b> descover my latest blogs
      </h1>
      {
      Array.isArray(posts) && posts.length > 0 ?
      <>
      <div className={styles.post}>
        <div className={styles.imgContainer}>
          {posts[0].img && <Image src={posts[0].img} alt={posts[0].img} fill className={styles.image}/>}
        </div>
        <div className={styles.textContainer}>
          <h1 className={styles.postTitle}>{posts[0].titles}</h1>
          <p className={styles.postDesc}>{posts[0].description}</p>
          <Link href={`/${posts.slug}`}><button className={styles.button}>Read More</button></Link>
        </div>
      </div>
      </>
      :
      null
      }
    </div>
  )
}

export default Featured