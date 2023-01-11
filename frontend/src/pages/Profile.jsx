import React, { useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import ProfileContainer from '../components/Profile/ProfileContainer'
import { useNavigate } from 'react-router-dom'

const Profile = ({ API_URL, UserLoggedContext }) => {
  const navigate = useNavigate()

  useEffect(() => {
    const checkLogged = async () => {
      if (!localStorage.getItem('token')) {
        await navigate('/login')
      }
    }

    checkLogged()
  }, [])

  return (
    <main>
      <div className='container fluid'>
        <ProfileContainer
          API_URL={API_URL}
          UserLoggedContext={UserLoggedContext}
        />
      </div>
    </main>
  )
}

export default Profile
