import React from 'react'
import Sidebar from '../components/common/Sidebar'
import UserProfile from '../components/user/UserProfile'

const User = () => {
  return (
    <div className='flex'>
      <Sidebar/>
      <UserProfile/>
    </div>
  )
}

export default User