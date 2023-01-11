import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import subjects from '../../subjects'
import { AiOutlineClose } from 'react-icons/ai'

const SubjectInnerPayPopup = ({
  subjectKey,
  setShowPopup,
  handlePay,
  currentMonth,
}) => {
  const params = useParams()

  const [money, setMoney] = useState(0)

  return (
    <div className='subject-inner-popup'>
      <AiOutlineClose
        style={{
          position: 'absolute',
          top: '10%',
          left: '96%',
          fontSize: '40px',
          color: '#fff',
          cursor: 'pointer',
        }}
        onClick={() => setShowPopup(false)}
      />
      <div className='subject-inner-popup__background'></div>
      <div className='subject-inner-popup__container'>
        <div className='subject-inner-popup__container__content'>
          <div className='subject-inner-popup__container__title'>
            <h2>საგანი: {subjects[params.subject].name}</h2>
            <p
              style={{
                marginTop: '10px',
              }}
            >
              თვე: {currentMonth}
            </p>
          </div>
          <div className='subject-inner-popup__container__form'>
            <form action='' onSubmit={e => handlePay(e, money)}>
              <input
                type='number'
                name=''
                id=''
                placeholder='შეიყვანეთ თანხა'
                onChange={e => setMoney(e.target.value)}
                required
              />
              <input
                type='submit'
                value='გადახდა'
                className='btn-outline small'
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SubjectInnerPayPopup
