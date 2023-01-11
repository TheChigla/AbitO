import React, { useState, useContext, useEffect } from 'react'
import LoginForm from '../components/Auth/LoginForm'
import axios from 'axios'
import Alert from '../components/Alert/Alert'
import { useNavigate } from 'react-router-dom'

const Login = ({ API_URL, UserLoggedContext }) => {
  const [alertType, setAlertType] = useState('')
  const [showAlert, setShowAlert] = useState(false)
  const [alertContent, setAlertContent] = useState('')

  const navigate = useNavigate()

  const setUserLogged = useContext(UserLoggedContext)

  useEffect(() => {
    const checkIfLogged = async () => {
      if (localStorage.getItem('token')) navigate('/profile')
    }

    checkIfLogged()
  })

  const handleSubmit = async (e, user) => {
    e.preventDefault()

    await axios
      .post(`${API_URL}/login`, user)
      .then(res => {
        localStorage.setItem('token', res.data.token)
        setAlertType('success')
        setShowAlert(true)
        setAlertContent('თქვენ წარმატებით გაიარეთ ავტორიზაცია')
        setUserLogged(true)

        navigate('/profile')
      })
      .catch(err => {
        console.log(err)
        setAlertType('error')
        setShowAlert(true)
        setAlertContent(err.response.data ? err.response.data : '')
      })
  }

  return (
    <main>
      <div className='container'>
        {showAlert ? <Alert content={alertContent} type={alertType} /> : ''}
        <LoginForm handleSubmit={handleSubmit} />
      </div>
    </main>
  )
}

export default Login
