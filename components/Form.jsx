import Link from 'next/link'
import React from 'react'

export default function Form({type,post,setPost,submitting, handleSubmit}) {
  return (
    <section className="w-full max-w-full flex-start flex-col">
      <h1 className='head_text text-left'><span className='blue_gradient'>{type} post</span></h1>
      <p className='desc text-left max-w-md'>
        {type} and share amezing prompts with world, and let you imagination run wild with any AI-powered platform.

      </p>
      <form onSubmit={handleSubmit} className='mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism'>
       <label>
        <span className={'font-sans font-semibold text-base text-gray-700'}>Your AI Prompt</span>
        <textarea
     value={post.prompt}
        onChange={(e)=>{setPost({...post,prompt:e.target.value})}}
        placeholder='Write your prompts here...'
        required
        className='form_textarea'
        />
        </label>
      <label>
        <span className={'font-sans font-semibold text-base text-gray-700'}>Tag <span className='font-normal'>(#prompt #webdevelopment #react)</span></span>
        <input
        value={post.tag}
        onChange={(e)=>{setPost({...post,tag:e.target.value})}}
        placeholder='#tag'
        required
        className='form_input'
        />
        </label>
        <div className='flex-end mx-3 md-5 gap-4'>
          <Link className='text-gray-500 text-sm' href='/'>Cancel</Link>
          <button
          type='submit'
          disabled={submitting}
          className='px-5 py-1.5 text-sm bg-orange-500 text-white rounded-full'
          >{submitting ?`${type}...`: type}</button>
        </div>
      </form>
    </section>
  )
}
