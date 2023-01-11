import React from 'react'
import './Auth.scss'
import { Link } from 'react-router-dom'
import { useState } from 'react'

const RegistrationForm = ({ handleRegister }) => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [avatar, setAvatar] = useState()

  return (
    <div className='auth-form'>
      <div className='auth-form__title'>
        <div className='auth-form__title__wrapper'>
          <h2>რეგისტრაცია</h2>
          <div className='title-divider'></div>
        </div>
      </div>
      <div className='auth-form__content'>
        <div className='auth-form__content__wrapper'>
          <form
            action=''
            onSubmit={e => {
              const user = {
                firstName,
                lastName,
                email,
                password,
                confirmPassword,
                avatar,
              }

              handleRegister(e, user)
            }}
            encType='multipart/form-data'
          >
            <div className='auth-form__flex'>
              <div className='auth-form__group'>
                <input
                  type='text'
                  name=''
                  id='name'
                  placeholder='სახელი*'
                  onChange={e => setFirstName(e.target.value)}
                  required
                />
              </div>
              <div className='auth-form__group'>
                <input
                  type='text'
                  name=''
                  id='lastname'
                  placeholder='გვარი*'
                  onChange={e => setLastName(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className='auth-form__group'>
              <input
                type='email'
                name=''
                id='email'
                placeholder='ელ.ფოსტა*'
                onChange={e => setEmail(e.target.value)}
                required
              />
            </div>
            <div className='auth-form__group'>
              <input
                type='password'
                name='password'
                id=''
                placeholder='პაროლი*'
                onChange={e => setPassword(e.target.value)}
                required
              />
            </div>
            <div className='auth-form__group'>
              <input
                type='password'
                name=''
                id='confirmpassword'
                placeholder='დაადასტურეთ პაროლი*'
                onChange={e => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <div className='auth-form__group'>
              <label htmlFor='profile_picture'>პროფილის სურათი:</label>
              <br />
              <input
                type='file'
                name=''
                id='profile_picture'
                onChange={e => setAvatar(e.target.files[0])}
              />
            </div>
            <div className='auth-form__group'>
              <input
                className='btn-outline small'
                type='submit'
                value='რეგისტრაცია'
              />
            </div>
            <div className='auth-link'>
              უკვე დარეგისტრირებული ხარ? <Link to='/login'>ავტორიზაცია</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default RegistrationForm
