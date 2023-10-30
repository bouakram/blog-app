import React from 'react'
import styles from './categorylist.module.css'
import Link from 'next/link'
import Image from 'next/image'

const getCategory = async ()=> {
  const res = await fetch('http://localhost:3000/api/categories', {cache: "no-store"})

  if (!res.ok){
    throw new Error("failed to get categories")
  }

  return res.json()
}

async function CategoryList() {
  const data = await getCategory()
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Popular Categories</h1>
      <div className={styles.categories}>
        {data?.map((catg, index) =>(
          <Link key={index} href={`/blog?category=${catg.slug}`} className={`${styles.category} ${styles[catg.slug]}`}>
            {catg.img && <Image src={catg.img} alt='tutorial' width={32} height={32} className={styles.image}/>}
            {catg.title}
          </Link>
        ))}
      </div>
    </div>
  )
}

export default CategoryList