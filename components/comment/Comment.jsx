"use client"

import React, { useState } from 'react'
import styles from './comment.module.css'
import Link from 'next/link'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import useSWR from 'swr'
import { BASE_URL } from '@/app/utils/connections'

const fetcher = async (url) => {
    const res = await fetch(url)

    const data = await res.json()

    if(!res.ok) {
        const error = new Error(data.message)
        return error
    }

    return data
}

function Comment({postSlug}) {
    const {status} = useSession()
    const {data,mutate,isLoading} = useSWR(`${BASE_URL}api/comments?postSlug=${postSlug}`, fetcher)
    const [description, setDescription] = useState("")
    const handleSubmit = async ()=>{
        await fetch('/api/comments',{
            method: "POST",
            body: JSON.stringify({description, postSlug})
        })
        setDescription("")
        mutate()
    }
  return (
    <div className={styles.container}>
        <h3 className={styles.title}>Comment</h3>
        {status === "authenticated" ?
        <div className={styles.write}>
            <textarea placeholder='write a comment ...' className={styles.input} value={description} onChange={(e)=> setDescription(e.target.value)}/>
            <button className={styles.button} onClick={handleSubmit}>Submit</button>
        </div>
        :
        <Link href={'/login'} className={styles.link}>Login to write a comment !</Link>
        }
        {
        isLoading ? "loading ..." :
        data.map((comment, index)=>(
        <div key={index} className={styles.comments}>
            <div className={styles.comment}>
                <div className={styles.user}>
                    {
                        comment?.user.image && <Image src={comment?.user.image} alt='user image' width={50} height={50} className={styles.image}/>
                    }
                    <div className={styles.userInfo}>
                        <span className={styles.userName}>{comment?.user.name}</span>
                        <span className={styles.date}>{comment?.createdAt.substring(0, 10)}</span>
                    </div>
                </div>
                <div className={styles.desc}>
                    <p>{comment?.description}</p>
                </div>
            </div>
        </div>
        ))
        }
    </div>
  )
}

export default Comment