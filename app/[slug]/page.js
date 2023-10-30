import React from 'react'
import styles from './singlPage.module.css'
import Image from 'next/image'
import Comment from '@/components/comment/Comment'

const getSinglePost = async (slug)=>{
    const res = await fetch(`http://localhost:3000/api/posts/${slug}`, {
      cache: "no-store",
    });
  
    if (!res.ok) {
      throw new Error("Failed");
    }
    return res.json();
  };

async function SingleBlog({params}) {
  const {slug} = params
  const post = await getSinglePost(slug)
  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        <div className={styles.textContainer}>
          <h1 className={styles.title}>{post?.titles}</h1>
          <div className={styles.user}>
            {
              post?.user.image && (
              <div className={styles.userImageContianer}>
                <Image src={post?.user.image} alt='post image' fill className={styles.avatar}/>
              </div>
            )
            }
            <div className={styles.userTextContainer}>
              <span className={styles.userName}>{post?.user.name}</span>
              <span className={styles.date}>{post?.createdAt.substring(0, 10)}</span>
            </div>
          </div>
        </div>
        {
          post?.img && (
          <div className={styles.imageContainer}>
            <Image src={post?.img} alt='post image' fill className={styles.image}/>
          </div>
          )
        }
      </div>
      <div className={styles.content}>
        <div className={styles.post}>
          <div className={styles.description}>
            {post?.description}
          </div>
        <div className={styles.content} dangerouslySetInnerHTML={{ __html: post?.content }} />
        </div>
        <div className={styles.comment}>
          <Comment postSlug={slug}/>
        </div>
      </div>
    </div>
  )
}

export default SingleBlog