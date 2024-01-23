"use client";
import React, { useEffect, useState } from 'react'
import PromptCard from './PromptCard';

const PromptCardList=({data,handleTagClick})=>{
  return(
    <div className='mt-16 prompt_layout'>
    {data.map((post)=>(
      <PromptCard key={post._id} post={post} handleTagClick={handleTagClick}/>

    ))}
    </div>
  )
}

const Feed = () => {
  const [searchText,setSearchtext]=useState('');
  const [post, setPost] = useState([])
  const handleSearchChange=(e)=>{
    e.preventDefault();
  }
  useEffect(()=>{
    const fetchPosts=async()=>{
      const res=await fetch('api/prompt')
      const data=await res.json();
      setPost(data)
    }
    fetchPosts(); 
  },[])
  return (
    <section className='feed'>
      <form className='relative w-full flex-center'>
        <input type="text"
        placeholder='search for a tag or prompt' 
        // value={searchText} 
        onChange={handleSearchChange}
        required
        className={"search_input peer"}/>
      </form>

      <PromptCardList
      data={post}
      handleTagClick={()=>{}}/>
    </section>
  )
}

export default Feed
