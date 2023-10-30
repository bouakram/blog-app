import React from 'react'
import styles from './blogPage.module.css'
import CardList from '@/components/cardList/CardList'
import Menu from '@/components/menu/Menu'

function Blog({searchParams}) {
  const page = parseInt(searchParams.page) || 1
  const category = searchParams.category
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{category} Blog</h1>
      <div className={styles.content}>
        <CardList catg={category} page={page} />
        <Menu />
      </div>
    </div>
  )
}

export default Blog