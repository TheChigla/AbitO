import React, { useState, useEffect } from 'react'
import './Header.scss'
import { FaBars } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { useContext } from 'react'

const Header = ({ UserContext }) => {
  const userInfo = useContext(UserContext)

  return (
    <header>
      <nav>
        <div className='nav-wrapper'>
          <span className='nav-logo'>AbitObshiaki</span>

          <input type='checkbox' name='' id='mobile-btn' />
          <label htmlFor='mobile-btn' className='mobile-burger'>
            <FaBars />
          </label>

          {userInfo || localStorage.getItem('token') ? (
            <ul>
              <li>
                <Link to='/'>მთავარი</Link>
              </li>
              <li>
                <Link to='/subjects'>საგნები</Link>
              </li>
              <li>
                <Link to='/profile'>პროფილი</Link>
              </li>
            </ul>
          ) : (
            <ul>
              <li>
                <Link to='/'>მთავარი</Link>
              </li>
              <li>
                <Link to='/subjects'>საგნები</Link>
              </li>
              <li>
                <Link to='/login'>შესვლა</Link>
              </li>
              <li>
                <Link to='/register' className='btn-outline light'>
                  რეგისტრაცია
                </Link>
              </li>
            </ul>
          )}
        </div>
      </nav>
    </header>
  )
}

export default Header
