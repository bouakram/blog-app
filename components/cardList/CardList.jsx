import React from 'react'
import styles from './cardlist.module.css'
import Pagination from '../pagination/Pagination'
import CardSinglPost from '../cardSiglePost/CardSinglPost'
import { BASE_URL } from '@/app/utils/connections'

const getPosts = async (page, catg)=> {
  const url = `${BASE_URL}/api/posts?page=${page}&cat=${catg || ""}`
  const res = await fetch(url,{ cache: "no-store"})

  if (!res.ok){
    throw new Error("failed to get categories")
  }

  return res.json()
}

async function CardList({page, catg}) {
  const {posts, count} = await getPosts(page, catg)
  const POST_PER_PAGE = 4
  const hasPrev = POST_PER_PAGE * (page - 1) > 0
  const hasNext = POST_PER_PAGE * (page - 1) + POST_PER_PAGE < count
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Recent Posts</h1>
      <div className={styles.posts}>
        {posts?.map((post, index)=>(
          <CardSinglPost key={index} ukey={index} data={post}/>
        ))}
      </div>
      <Pagination page={page} hasPrev={hasPrev} hasNext={hasNext}/>
    </div>
  )
}

export default CardList