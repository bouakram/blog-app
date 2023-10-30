import Image from 'next/image'
import React from 'react'
import styles from './cardsinglpost.module.css'
import Link from 'next/link'

function CardSinglPost({ukey, data}) {
  return (
    <div className={styles.container} key={ukey}>
        {
          data?.img && (
            <div className={styles.imageContainer}>
              <Image src={data?.img} alt={data.img} fill className={styles.image}/>
            </div>
          )
        }
      <div className={styles.textContainer}>
        <div className={styles.detail}>
          <span className={styles.date}>{data.createdAt.substring(0, 10)} {"  "}</span>
          <span className={styles.category}>{data.catgSlug}</span>
        </div>
        <h1 className={styles.title}>{data.titles}</h1>
        <p className={styles.desc}>{data.description}</p>
        <Link href={`/${data.slug}`} className={styles.link}>Read More</Link>
      </div>
    </div>
  )
}

export default CardSinglPost