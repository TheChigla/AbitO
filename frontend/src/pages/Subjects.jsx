import React from 'react'
import SubjectsContainer from '../components/Subjects/SubjectsContainer'

const Subjects = ({ API_URL }) => {
  return (
    <main>
      <div className='container fluid long'>
        <h2>საგნების ჩამონათვალი</h2>
        <br />
        <SubjectsContainer API_URL={API_URL} />
      </div>
    </main>
  )
}

export default Subjects
