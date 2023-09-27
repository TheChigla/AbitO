import React, { useState, useContext, useEffect } from 'react'
import RegistrationForm from '../components/Auth/RegistrationForm'
import axios from 'axios'
import Alert from '../components/Alert/Alert'
import { useNavigate } from 'react-router-dom'

const Register = ({ API_URL, UserLoggedContext }) => {
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

  const handleRegister = async (e, user) => {
    e.preventDefault()

    if (user.firstName.length < 4) {
      setAlertType('error')
      setShowAlert(true)
      setAlertContent('სახელი უნდა შედგებოდეს მინიმუმ 4 ასოსგან')
    } else if (user.lastName.length < 4) {
      setAlertType('error')
      setShowAlert(true)
      setAlertContent('გვარი უნდა შედგებოდეს მინიმუმ 4 ასოსგან')
    } else if (user.password.length < 6) {
      setAlertType('error')
      setShowAlert(true)
      setAlertContent('პაროლი უნდა შედგებოდეს მინიმუმ 6 ასოსგან')
    } else if (user.password !== user.confirmPassword) {
      setAlertType('error')
      setShowAlert(true)
      setAlertContent('დადასტურებული პაროლი არასწორია')
    } else {
      const formData = new FormData()
      formData.append('firstName', user.firstName)
      formData.append('lastName', user.lastName)
      formData.append('email', user.email)
      formData.append('password', user.password)
      formData.append('avatar', user.avatar)

      await axios
        .post(`${API_URL}/register`, formData)
        .then(res => {
          setUserLogged(true)
          localStorage.setItem('token', res.data.token)
          setAlertType('success')
          setShowAlert(true)
          setAlertContent('თქვენ წარმატებით დარეგისტრირდით პლატფორმაზე')
          navigate('/profile')
        })
        .catch(err => {
          console.log(err)
          setAlertType('error')
          setShowAlert(true)
          if(err.response && err.response.data.err) setAlertContent(err.response.data.err)
        })
    }
  }

  return (
    <main>
      <div className='container'>
        {showAlert ? <Alert content={alertContent} type={alertType} /> : ''}
        <RegistrationForm handleRegister={handleRegister} />
      </div>
    </main>
  )
}

export default Register
