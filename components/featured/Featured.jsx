import React from 'react'
import styles from './featured.module.css'
import Image from 'next/image'

function Featured() {
  return (
    <div className={styles.containr}>
      <h1 className={styles.title}>
        <b className={styles.bold}>Hey, Code Ease here!</b> descover my latest blogs
      </h1>
      <div className={styles.post}>
        <div className={styles.imgContainer}>
          <Image src='/images/blogcover.png' alt='blog' fill className={styles.image}/>
        </div>
        <div className={styles.textContainer}>
          <h1 className={styles.postTitle}>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</h1>
          <p className={styles.postDesc}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati, nam reiciendis quisquam nisi laboriosam temporibus expedita amet, ex eaque dignissimos numquam inventore, harum cum delectus unde! Praesentium debitis placeat facilis at? Labore quod commodi veniam.</p>
          <button className={styles.button}>Read More</button>
        </div>
      </div>
    </div>
  )
}

export default Featured