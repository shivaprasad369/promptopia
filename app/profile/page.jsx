"use client";
import React, { useCallback, useEffect, useState } from "react";
import Profile from "@components/Profile";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
export default function MyProfile() {
  const { data: session } = useSession();
  const [posts, setPosts] = useState([]);
  const router = useRouter();
  //console.log(session.user.id)
  useEffect(() => {
    const fetchPosts = async () => {
      var id = await session.user.id;
      // console.log(id);
      const res = await fetch(`/api/user/${id}/posts`);
      const data = await res.json();
      setPosts(data);
    };
    if (session?.user.id) fetchPosts();
  }, [session?.user.id]);
  console.log(posts);
  const handleEdit = (post) => {
    console.log(post)
    router.push(`/update-prompt/${post}`)
  };
  
  const handleDelete =async (post) => {
      const isConfirmed=confirm("Are you sure to delete this post")
      if(isConfirmed)
      {
          try {
            await fetch(`/api/prompt/${post._id}`,{
              method:'DELETE'
            })
            const filterPost=posts.filter((p)=>{
              p._id !==post._id
            })
            setPosts(filterPost)
          } catch (error) {
            console.log(error)
          }
      }
    }

  return (
    <Profile
      name={"My"}
      desc={"Welcome to your personalized profile page"}
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
}
