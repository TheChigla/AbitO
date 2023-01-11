import React, { useState } from 'react'
import SubjectInnerContainer from '../components/SubjectInner/SubjectInnerContainer'
import { Link } from 'react-router-dom'

const SubjectInner = ({ API_URL }) => {
  return (
    <main>
      <div className='container fluid long mobile'>
        {localStorage.getItem('token') ? (
          <SubjectInnerContainer API_URL={API_URL} />
        ) : (
          <h1
            style={{
              textAlign: 'center',
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          >
            თქვენ არ ხართ შესული სისტემაში
            <br />
            <div
              style={{
                marginTop: '15px',
              }}
            >
              <Link className='btn-outline' to='/login'>
                შესვლა
              </Link>
            </div>
          </h1>
        )}
      </div>
    </main>
  )
}

export default SubjectInner
