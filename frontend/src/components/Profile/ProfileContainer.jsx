import React, { useEffect } from 'react'
import ProfileDetails from './ProfileDetails'
import './Profile.scss'
import axios from 'axios'
import { useState } from 'react'

const ProfileContainer = ({ API_URL, UserLoggedContext }) => {
  const [user, setUser] = useState()

  useEffect(() => {
    const handleGetUser = async () => {
      await axios
        .get(
          API_URL,

          {
            headers: {
              'Content-type': 'application/json',
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        )
        .then(res => setUser(res.data))
        .catch(err => console.log(err))
    }

    handleGetUser()
  }, [])

  return user ? (
    <div className='profile-container'>
      <ProfileDetails
        API_URL={API_URL}
        UserLoggedContext={UserLoggedContext}
        user={user}
      />
    </div>
  ) : (
    <div className='loader'></div>
  )
}

export default ProfileContainer
