import React from 'react'
import subjects from '../../subjects'
import SingleSubject from './SingleSubject'
import './Profile.scss'

const ProfileSubjectsContainer = ({ subjects }) => {
  return (
    <div className='profile-subjects-container subjects__wrapper'>
      {subjects.map(subject => {
        return <SingleSubject subject={subject} />
      })}
    </div>
  )
}

export default ProfileSubjectsContainer
