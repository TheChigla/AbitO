import React from 'react'
import './Subjects.scss'
import { Link } from 'react-router-dom'

const SingleSubject = ({ link, name, image }) => {
  return (
    <div
      className='single-subject'
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, .65), rgba(0, 0, 0, .65)), url(${image})`,
      }}
    >
      <div className='single-subject__wrapper'>
        <div className='single-subject__title'>{name}</div>
        <div className='single-subject__button'>
          <Link to={`/subjects/${link}`} className='btn-outline small light'>
            ნახვა
          </Link>
        </div>
      </div>
    </div>
  )
}

export default SingleSubject
