import React from 'react'
import Sidebar from '../components/common/Sidebar'
import PostContent from '../components/post/PostContent'


const Post = () => {
  
  return (
    <div className='flex'>
      <Sidebar/>
      <PostContent/>
    </div>
  )
}

export default Post