import React from 'react'
import './Auth.scss'
import { Link } from 'react-router-dom'
import { useState } from 'react'

const LoginForm = ({ handleSubmit }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <div className='auth-form'>
      <div className='auth-form__title'>
        <div className='auth-form__title__wrapper'>
          <h2>ავტორიზაცია</h2>
          <div className='title-divider'></div>
        </div>
      </div>
      <div className='auth-form__content'>
        <div className='auth-form__content__wrapper'>
          <form
            action=''
            method='post'
            onSubmit={e => {
              const user = {
                email,
                password,
              }

              handleSubmit(e, user)
            }}
          >
            <div className='auth-form__group'>
              <input
                type='email'
                name=''
                id='email'
                placeholder='ელ.ფოსტა'
                onChange={e => setEmail(e.target.value)}
                required
              />
            </div>
            <div className='auth-form__group'>
              <input
                type='password'
                name=''
                id='password'
                placeholder='პაროლი'
                onChange={e => setPassword(e.target.value)}
                required
              />
            </div>
            <div className='auth-form__group'>
              <input
                className='btn-outline small'
                type='submit'
                value='ავტორიზაცია'
              />
            </div>
            <div className='auth-link'>
              არ ხარ დარეგისტრირებული? <Link to='/register'>რეგისტრაცია</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default LoginForm
