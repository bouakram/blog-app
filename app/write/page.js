"use client"

import React, { useEffect, useState } from 'react'
import styles from './writePage.module.css'
import Image from 'next/image'
import "react-quill/dist/quill.bubble.css";
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { app } from '../utils/firebase';
import dynamic from 'next/dynamic';
let ReactQuill = dynamic(() => import('react-quill'), {
    ssr: false,
  });

const storage = getStorage(app);

// const BubbleTheme = Quill.import("themes/bubble");
// class ExtendBubbleTheme extends BubbleTheme {
//     constructor(quill, options) {
//     super(quill, options);

//     quill.on("selection-change", (range) => {
//         if (range) {
//             quill.theme.tooltip.show();
//             quill.theme.tooltip.position(quill.getBounds(range));
//         }
//     });
//     }
// }
// Quill.register("themes/bubble", ExtendBubbleTheme);

const toolbarOptions = [
    [{ 'size': ['small', 'large', 'huge'] }],
    [{ 'header': [1, 2, 3, 4, 5, 6] }],
    ['bold', 'italic', 'underline', 'strike'],
    ['blockquote', 'code-block'],
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    ["link", "image"],
    ['clean']
    ]


function Write() {
    const router = useRouter()
    const [file, setFile] = useState(null)
    const [media, setMedia] = useState("")
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [catgSlug, setCatSlug] = useState("")
    const [open, setOpen] = useState(true)
    const [content, setContent] = useState("")
    const {status} = useSession()

    useEffect(()=>{
        const upload = ()=>{
            const storageRef = ref(storage, file.name);
            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on('state_changed', 
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                case 'paused':
                    console.log('Upload is paused');
                    break;
                case 'running':
                    console.log('Upload is running');
                    break;
                }
            }, 
            (error) => {
                console.log(error)
            }, 
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                setMedia(downloadURL)
                });
            }
);
        }

        file && upload()
    },[file])

    function slugify(text) {
        return text
          .toString() // Convert to string in case it's not
          .toLowerCase() // Convert to lowercase
          .trim() // Remove leading and trailing whitespace
          .replace(/\s+/g, '-') // Replace spaces with hyphens
          .replace(/&/g, '-and-') // Replace & with 'and'
          .replace(/[^\w-]+/g, '') // Remove non-word characters (except hyphens)
          .replace(/--+/g, '-'); // Replace multiple hyphens with a single hyphen
      }

    const handleSubmit = async ()=>{
        const res = fetch('/api/posts', {
            method: 'POST',
            body: JSON.stringify({
                titles: title,
                description,
                img: media,
                slug: slugify(title),
                content,
                catgSlug
            })
        })

        if (res.status === 200) {
            const data = await res.json();
            router.push(`/${data.slug}`);
        }
    }

    if(status === "unauthenticated"){
        router.push('/')
    }
  return (
    <div className={styles.container}>
        <input type='text' placeholder='Title' className={styles.input} onChange={(e)=> setTitle(e.target.value)}/>
        <textarea type='text' rows={3} placeholder='Description' className={styles.inputDesc} onChange={(e)=> setDescription(e.target.value)}/>
        <div className={styles.editor}>
            <input type='file' onChange={(e) => setFile(e.target.files[0])} style={{display: "none"}} id='images'/>
            <button className={styles.button} onClick={()=> setOpen(!open)}>
                <Image src='/images/add.png' alt='add image' width={30} height={30}/>
            </button>
            {open && (
            <div className={styles.add}>
                <button className={styles.secButton}>
                    <label htmlFor="images" style={{cursor: "pointer"}}>
                        <Image src='/images/image.png' alt='image icon' width={30} height={30}/>
                    </label>
                </button>
                {/* <button className={styles.secButton}>
                    <Image src='/images/external.png' alt='exterinal image' width={30} height={30}/>
                </button>
                <button className={styles.secButton}>
                    <Image src='/images/video.png' alt='video image' width={30} height={30}/>
                </button> */}
            </div>
            )}
            {media && <div style={{position: "relative", width: "100%", height: "250px"}}><Image src={media} alt={media} fill style={{objectFit: "cover"}}/></div>}
            <ReactQuill
            className={styles.textEditor}
            theme="bubble"
            placeholder="Whats on your mind ? ..."
            modules={{ toolbar: toolbarOptions }}
            value={content}
            onChange={setContent}
            />
        </div>
        <select className={styles.select} onChange={(e) => setCatSlug(e.target.value)}>
            <option selected disabled>categoris</option>
            <option value="style">styles</option>
            <option value="coding">coding</option>
            <option value="tutorial">tutorial</option>
            <option value="hack-and-trick">hack-and-trick</option>
        </select>
        <button className={styles.buttonSubmit} onClick={handleSubmit}>Submit</button>
    </div>
  )
}

export default Write