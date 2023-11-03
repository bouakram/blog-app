import React from 'react'
import styles from './menu.module.css'
import Link from 'next/link'
// import Image from 'next/image'
import { BASE_URL } from '@/app/utils/connections'

const getPostTheMostPopular = async () => {
  const url = `${BASE_URL}api/posts/popular`
  const res = await fetch(url, { cache: "no-store" })

  if (!res.ok) {
    throw new Error("failed to fetch popular posts")
  }

  return res.json()
}

const getCategory = async () => {
  const res = await fetch(`${BASE_URL}api/categories`, { cache: "default" })

  if (!res.ok) {
    throw new Error("failed to get categories")
  }

  return res.json()
}

async function Menu() {
  const post = await getPostTheMostPopular()
  const cat = await getCategory()
  return (
    <div className={styles.container}>
      <h2 className={styles.subtitle}>{"What's hot"}</h2>
      <h1 className={styles.title}>Most Popular</h1>
      <div className={styles.items}>
        {
          Array.isArray(post) && post.length > 0 ? post?.map((post, index) => (
            <Link key={index} href={`/${post.slug}`} className={styles.item}>
              <div className={styles.textContainer}>
                <div className={styles.top}>
                  <div className={`${styles.category} ${styles[post?.catgSlug]}`}>{post.catgSlug}</div>
                  <div className={styles.views}>{post.views} view</div>
                </div>
                <h3 className={styles.postTitle}>{post?.titles}</h3>
                <div className={styles.detail}>
                  <span className={styles.username}>{post?.user.name}</span>
                  <span className={styles.date}> - {post?.createdAt.substring(0, 10)}</span>
                </div>
              </div>
            </Link>
          ))
            :
            <div>
              <p>No blog created yet!</p>
            </div>
        }
      </div>

      <h2 className={styles.subtitle}>Descover by topic</h2>
      <h1 className={styles.title}>Categories</h1>
      <div className={styles.categoryList}>
        {
          Array.isArray(cat) && cat.length > 0 ? cat?.map((catg, index) => (
            <Link key={index} href={`/blog?category=${catg.slug}`} className={`${styles.categoryItem} ${styles[catg.slug]}`}>{catg.slug}</Link>
          ))
            :
            null
        }
      </div>

      {/* <h2 className={styles.subtitle}>Chosen by the editor</h2>
      <h1 className={styles.title}>Editors Pick</h1>
      <div className={styles.items}>
        <Link href={'/'} className={styles.item}>
          <div className={styles.imageContainer}>
            <Image src='/images/blogcover.png' alt='blog image' fill className={styles.image}/>
          </div>
          <div className={styles.textContainer}>
            <span className={`${styles.category} ${styles.style}`}>styles</span>
            <h3 className={styles.postTitle}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum, saepe?</h3>
            <div className={styles.detail}>
              <span className={styles.username}>John Doe</span>
              <span className={styles.date}> - 11-10-2023</span>
            </div>
          </div>
        </Link>
        <Link href={'/'} className={styles.item}>
          <div className={styles.imageContainer}>
            <Image src='/images/blogcover.png' alt='blog image' fill className={styles.image}/>
          </div>
          <div className={styles.textContainer}>
            <span className={`${styles.category} ${styles.coding}`}>coding</span>
            <h3 className={styles.postTitle}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum, saepe?</h3>
            <div className={styles.detail}>
              <span className={styles.username}>John Doe</span>
              <span className={styles.date}> - 11-10-2023</span>
            </div>
          </div>
        </Link>
        <Link href={'/'} className={styles.item}>
          <div className={styles.imageContainer}>
            <Image src='/images/blogcover.png' alt='blog image' fill className={styles.image}/>
          </div>
          <div className={styles.textContainer}>
            <span className={`${styles.category} ${styles.tutorial}`}>tutorial</span>
            <h3 className={styles.postTitle}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum, saepe?</h3>
            <div className={styles.detail}>
              <span className={styles.username}>John Doe</span>
              <span className={styles.date}> - 11-10-2023</span>
            </div>
          </div>
        </Link>
        <Link href={'/'} className={styles.item}>
          <div className={styles.imageContainer}>
            <Image src='/images/blogcover.png' alt='blog image' fill className={styles.image}/>
          </div>
          <div className={styles.textContainer}>
            <span className={`${styles.category} ${styles.coding}`}>coding</span>
            <h3 className={styles.postTitle}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum, saepe?</h3>
            <div className={styles.detail}>
              <span className={styles.username}>John Doe</span>
              <span className={styles.date}> - 11-10-2023</span>
            </div>
          </div>
        </Link>
      </div> */}
    </div>
  )
}

export default Menu