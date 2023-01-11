import React, { useContext } from 'react'
import { useNavigate, Link } from 'react-router-dom'

const ProfileDetails = ({ UserLoggedContext, user }) => {
  const navigate = useNavigate()
  const setUserLogged = useContext(UserLoggedContext)

  const API_URL = '' // You need to add your own API_URL

  const handleLogout = () => {
    setUserLogged(false)
    localStorage.removeItem('token')
    navigate(0)
  }

  return (
    <div className='profile-details'>
      <div className='profile-details__wrapper'>
        <div
          className='profile-details__avatar'
          style={{
            textAlign: 'center',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          {user.avatar.length > 0 ? (
            <div
              class='profile-details__avatar__background'
              style={{
                backgroundImage: `url(${API_URL}/images/${user.avatar})`,
                backgroundSize: 'cover',
                width: '220px',
                height: '220px',
                borderRadius: '50%',
                backgroundPosition: 'center',
              }}
            ></div>
          ) : (
            <img
              src='https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfHw%3D&w=1000&q=80'
              alt=''
            />
          )}
        </div>
        <div className='profile-details__name'>
          <h2>
            {user.firstName} {user.lastName}
          </h2>
        </div>
        <div className='profile-details__buttons'>
          <Link to='/subjects/my' className='btn-outline small'>
            ჩემი საგნები
          </Link>
          <button className='btn-outline small' onClick={() => handleLogout()}>
            გასვლა
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProfileDetails
