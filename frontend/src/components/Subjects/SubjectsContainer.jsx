import React, { useEffect } from 'react'
import SingleSubject from './SingleSubject'
import './Subjects.scss'
import subjects from '../../subjects'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'

const SubjectsContainer = ({ API_URL }) => {
  return (
    <div className='subjects-container'>
      <div className='subjects__wrapper'>
        {Object.entries(subjects).map(([key, value]) => {
          return (
            <SingleSubject
              name={value.name}
              image={value.image}
              link={key}
              key={value.name}
              API_URL={API_URL}
            />
          )
        })}
      </div>
    </div>
  )
}

export default SubjectsContainer
