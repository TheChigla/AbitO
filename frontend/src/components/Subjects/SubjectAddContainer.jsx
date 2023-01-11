import React from 'react'
import { useParams } from 'react-router-dom'
import subjects from '../../subjects'
import './Subjects.scss'
import '../Auth/Auth.scss'
import { useState } from 'react'

const SubjectAddContainer = ({ handleAdd }) => {
  const params = useParams()

  const [enableInput, setEnableInput] = useState(false)
  const [enableInput2, setEnableInput2] = useState(false)
  const [totalPayment, setTotalPayment] = useState(0)
  const [monthlyPayment, setMonthlyPayment] = useState(0)
  const [currency, setCurrency] = useState()
  const [payDay, setPayDay] = useState(0)

  return (
    <div className='add-subject'>
      <div className='add-subject__wrapper'>
        <div className='add-subject__title'>
          <h1>{subjects[params.subject].name}</h1>
          <div
            className='title-divider'
            style={{
              margin: '0px 235px',
            }}
          ></div>
        </div>
        <form
          action=''
          method='post'
          onSubmit={e => {
            handleAdd(e, monthlyPayment, currency, payDay)
          }}
        >
          <div className='add-form__group'>
            <select
              name=''
              id=''
              onChange={e => {
                setEnableInput(true)
                setCurrency(e.target.value)
              }}
            >
              <option value='' selected disabled>
                აირჩიეთ ვალუტა
              </option>
              <option value='gel'>ლარი - GEL</option>
              <option value='usd'>დოლარი - USD</option>
            </select>
          </div>
          <div
            className='add-form__group'
            style={{
              marginBottom: '5px',
            }}
          >
            {enableInput ? (
              <input
                type='number'
                name=''
                id=''
                placeholder='გადასახადი თვიურად'
                required
                onChange={e => {
                  setTotalPayment(e.target.value * 10)
                  setMonthlyPayment(e.target.value)
                  setEnableInput2(true)
                }}
              />
            ) : (
              <input
                type='number'
                name=''
                id=''
                placeholder='თავდაპირველად აირჩიეთ ვალუტა'
                required
                disabled
              />
            )}
          </div>
          <div
            className='add-form__group'
            style={{
              marginBottom: '5px',
            }}
          >
            {enableInput2 && enableInput ? (
              <input
                type='number'
                name=''
                id=''
                placeholder='გადახდის რიცხვი'
                min={1}
                max={28}
                required
                onChange={e => {
                  setPayDay(e.target.value)
                }}
              />
            ) : (
              <input
                type='number'
                name=''
                id=''
                placeholder='ჯერ შეიყვანეთ თვიურად გადასახდელი თანხა'
                required
                disabled
              />
            )}
          </div>
          <div className='payment-counter'>
            წლიური გადასახადი: {totalPayment}{' '}
            {currency ? currency.toUpperCase() : ''}
          </div>
          <div className='add-form__group'>
            <input
              type='submit'
              value='დამატება'
              className='btn-outline small'
            />
          </div>
        </form>
      </div>
    </div>
  )
}

export default SubjectAddContainer
