import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import subjects from '../../subjects'
import './SubjectInner.scss'
import SubjectInnerPayPopup from './SubjectInnerPayPopup'

const SubjectInnerTable = ({ subject, API_URL, yearly, currency, payDay }) => {
  const navigate = useNavigate()
  const params = useParams()

  const [gel, setGel] = useState()
  const [usd, setUsd] = useState()
  const [showPopup, setShowPopup] = useState(false)
  const [subjectKey, setSubjectKey] = useState(0)
  const [currentMonth, setCurrentMonth] = useState('')

  useEffect(() => {
    const handleGetCurrency = async () => {
      await axios
        .get(`${API_URL}/subjects/currency`)
        .then(res => {
          setGel(res.data.gel)
          setUsd(res.data.usd)
        })
        .catch(err => console.log(err))
    }
    handleGetCurrency()
  })

  const handlePay = async (e, toPay) => {
    if (!toPay) {
      alert('შეიყვანეთ თანხა')
    } else if (toPay > yearly) {
      alert(
        `შეყვანილმა თანხამ გადააჭარბა წლიურ გადასახადს ${yearly} ${
          currency === 'gel' ? 'ლარს' : 'დოლარს'
        }`
      )
    } else {
      await axios
        .post(
          `${API_URL}/months/${subjectKey}/`,
          {
            subject: subjects[params.subject].name,
            payedMoney: toPay,
          },
          {
            headers: {
              'Content-type': 'application/json',
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        )
        .then(async res => {
          setCurrentMonth('')
          setSubjectKey(0)
        })
        .catch(err => console.log(err))
    }
  }

  return (
    <div className='subject-table'>
      {showPopup && subjectKey && currentMonth ? (
        <SubjectInnerPayPopup
          setShowPopup={setShowPopup}
          subjectKey={subjectKey}
          currentMonth={currentMonth}
          handlePay={handlePay}
        />
      ) : (
        ''
      )}

      <table>
        <tr className='table-header'>
          <th>რიცხვი</th>
          <th>თვე</th>
          <th>წელი</th>
          <th>თანხა (თვიურად)</th>
          <th>თანხა (წლიურად)</th>
          <th>ვალუტა ₾ / $</th>
          <th>სტატუსი</th>
          <th>რედაქტირება</th>
        </tr>

        {Object.entries(subject.months).map(([key, sub]) => {
          if (sub.payed) {
            return (
              <tr key={sub.month} className='payed-row'>
                <td>{payDay}</td>
                <td>{sub.month}</td>
                <td>{sub.year}</td>
                <td>
                  {subject.currency === 'gel' ? '₾' : '$'}
                  {subject.monthly}
                </td>
                <td>
                  {subject.currency === 'gel' ? '₾' : '$'}
                  {subject.monthly * 10}
                </td>

                {subject.currency === 'usd' ? (
                  <td>
                    {gel && usd
                      ? `₾${parseInt(subject.monthly * 10 * usd)} / $${parseInt(
                          subject.monthly * 10
                        )}`
                      : ''}
                  </td>
                ) : (
                  <td>
                    {gel && usd
                      ? `₾${parseInt(subject.monthly * 10 * gel)} / $${parseInt(
                          (subject.monthly * 10) / usd
                        )}`
                      : ''}
                  </td>
                )}
                <td>
                  {sub.payed ? 'გადახდილი' : 'გადაუხდელი'} {' - '}
                  {subject.currency === 'gel' ? '₾' : '$'}
                  {sub.payedMoney}
                </td>
                <td>
                  <button
                    className='btn-outline small dark'
                    onClick={() => {
                      setShowPopup(true)
                      setSubjectKey(key)
                      setCurrentMonth(sub.month)
                    }}
                  >
                    შეცვლა
                  </button>
                </td>
              </tr>
            )
          } else {
            return (
              <tr key={sub.month}>
                <td>{payDay}</td>
                <td>{sub.month}</td>
                <td>{sub.year}</td>
                <td>
                  {subject.currency === 'gel' ? '₾' : '$'}
                  {subject.monthly}
                </td>
                <td>
                  {subject.currency === 'gel' ? '₾' : '$'}
                  {subject.monthly * 10}
                </td>

                {subject.currency === 'usd' ? (
                  <td>
                    {gel && usd
                      ? `₾${parseInt(subject.monthly * 10 * usd)} / $${parseInt(
                          subject.monthly * 10
                        )}`
                      : ''}
                  </td>
                ) : (
                  <td>
                    {gel && usd
                      ? `₾${parseInt(subject.monthly * 10 * gel)} / $${parseInt(
                          (subject.monthly * 10) / usd
                        )}`
                      : ''}
                  </td>
                )}
                <td>{sub.payed ? 'გადახდილი' : 'გადაუხდელი'}</td>
                <td>
                  <button
                    className='btn-outline small'
                    onClick={() => {
                      setShowPopup(true)
                      setSubjectKey(key)
                      setCurrentMonth(sub.month)
                    }}
                  >
                    გადახდა
                  </button>
                </td>
              </tr>
            )
          }
        })}
      </table>
    </div>
  )
}

export default SubjectInnerTable
