import React from 'react'
import './Alert.scss'

const Alert = ({ content, type }) => {
  return (
    <div
      className='alert'
      style={{
        background: type === 'success' ? '#27ae60' : '#ea2027',
      }}
    >
      <div className='alert-content'>{content}</div>
    </div>
  )
}

export default Alert
