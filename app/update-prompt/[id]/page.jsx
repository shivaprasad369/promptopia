"use client";
import Form from '@components/Form'
import { useSession } from 'next-auth/react';
import {  useParams, useRouter,useSearchParams } from 'next/navigation';
import React, { useState,useEffect } from 'react'

export default function EditPrompt() {
   const [submitting,setSubmitting]= useState(false);
   const [post, setPost]=useState({
    prompt:'',
    tag:''
   })
  const searchParams = useSearchParams();
  const promptId=searchParams.get|('id');
  const {id}=useParams()

  useEffect(() => {
   const getPromptDetails=async()=>{
    const res=await fetch(`/api/prompt/${id}`);
    const data=await res.json();
    // console.log(data)
    setPost({
      prompt:data.prompt,
      tag:data.tag
    })
  }
getPromptDetails();
}, [promptId])
// console.log(post)
  
   const {data:session}=useSession()
   const router= useRouter()
   const updatePrompt=async(e)=>{
    e.preventDefault();
    if(!id) return alert("No promptId found!")
    setSubmitting(true);
    try {
        const res=await fetch(`/api/prompt/${id}`,{
        method:'PATCH',
        body:JSON.stringify({
          prompt:post.prompt,
          tag:post.tag,
        })
      })
      if(res.ok){
        router.push('/')
      }
    } catch (error) {
      console.log(error)
    }
    finally{
      setSubmitting(false)
    }
   }
  return (
    <Form
        type="Update"
        post={post}
        setPost={setPost}
        submitting={submitting}
        handleSubmit={updatePrompt}
    />
  )
}
