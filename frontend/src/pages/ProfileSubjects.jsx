import React, { useEffect } from 'react'
import ProfileSubjectsContainer from '../components/Profile/ProfileSubjectsContainer'
import axios from 'axios'
import { useState } from 'react'

const ProfileSubjects = ({ API_URL }) => {
  // Subjects
  const [subjects, setSubjects] = useState()

  // Get user subjects list
  useEffect(() => {
    const handleGetSubjects = async () => {
      await axios
        .get(API_URL, {
          headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        })
        .then(res => {
          setSubjects(res.data.subjects)
          if (subjects) console.log(subjects)
        })
        .catch(err => console.log(err))
    }

    handleGetSubjects()
  }, [])

  if (subjects) {
    return (
      <main>
        <div className='container fluid long'>
          <ProfileSubjectsContainer subjects={subjects} />
        </div>
      </main>
    )
  }
}

export default ProfileSubjects
