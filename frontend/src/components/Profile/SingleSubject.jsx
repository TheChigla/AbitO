import React, { useState, useEffect } from 'react'
import './Profile.scss'
import { Link } from 'react-router-dom'
import subjects from '../../subjects'

const SingleSubject = ({ subject }) => {
  const [name, setName] = useState('')
  const [image, setImage] = useState('')
  const [link, setLink] = useState('')

  const choices = [
    { name: 'ქართული', english: 'georgian' },
    { name: 'მათემატიკა', english: 'math' },
    { name: 'ინგლისური', english: 'english' },
    { name: 'ისტორია', english: 'history' },
    { name: 'ბიოლოგია', english: 'biology' },
    { name: 'ფიზიკა', english: 'physics' },
    { name: 'ქიმია', english: 'chemistry' },
    { name: 'სამოქალაქო განათლება', english: 'law' },
  ]

  useEffect(() => {
    const handleGetSubject = () => {
      choices.map(choice => {
        if (subject.subject === choice.name) {
          setName(choice.name)
          setImage(subjects[choice.english].image)
          setLink(`/subjects/${choice.english}`)
        }
      })
    }

    handleGetSubject()
  }, [])

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
          <Link to={`${link}`} className='btn-outline small light'>
            ნახვა
          </Link>
        </div>
      </div>
    </div>
  )
}

export default SingleSubject
