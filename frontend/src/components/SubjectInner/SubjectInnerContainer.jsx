import React from 'react'
import { useState } from 'react'
import './SubjectInner.scss'
import SubjectInnerTable from './SubjectInnerTable'
import { useNavigate, useParams } from 'react-router-dom'
import subjects from '../../subjects'
import { useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { BsCheck2Square } from 'react-icons/bs'

const SubjectInnerContainer = ({ handleUncheck, handleCheck, API_URL }) => {
  const params = useParams()
  const navigate = useNavigate()

  const [ownsSubject, setOwnsSubject] = useState()
  const [user, setUser] = useState()
  const [subject, setSubject] = useState()
  const [totalLeft, setTotalLeft] = useState(0)
  const [payDay, setPayDay] = useState(0)

  useEffect(() => {
    const handleGetUser = async () => {
      await axios
        .get(
          API_URL,

          {
            headers: {
              'Content-type': 'application/json',
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        )
        .then(async res => {
          setUser(res.data)

          for (let i = 0; i < res.data.subjects.length; i++) {
            if (
              res.data.subjects[i].subject === subjects[params.subject].name
            ) {
              await setOwnsSubject(true)
              break
            } else {
              await setOwnsSubject(false)
            }
          }

          if (res.data.subjects.length === 0) {
            await setOwnsSubject(false)
          }
        })
        .catch(err => console.log(err))
    }

    handleGetUser()
  }, [])

  useEffect(() => {
    const handleSetSubject = () => {
      if (user) {
        let total = 0
        for (let i = 0; i < user.subjects.length; i++) {
          if (user.subjects[i].subject === subjects[params.subject].name) {
            user.subjects[i].months.map(month => {
              if (month.payed) {
                parseInt((total += month.payedMoney))
              }
            })

            setSubject(user.subjects[i])
            setPayDay(user.subjects[i].payDay)
            setTotalLeft(parseInt(user.subjects[i].monthly * 10 - total))
            break
          }
        }
      }
    }

    handleSetSubject()
  })

  const handleRemoveSubject = async () => {
    await axios
      .delete(`${API_URL}/subjects/${subject.subject}`, {
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then(res => {
        console.log(res)
        navigate(0)
      })
      .catch(err => {
        console.log(err)
      })
  }

  if (ownsSubject && subject) {
    return (
      <div className='subject-inner'>
        <div
          className='subject-inner__title'
          style={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <h2
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
            }}
          >
            საგანი: {subjects[params.subject].name}{' '}
            {totalLeft === 0 ? (
              <span
                style={{
                  fontSize: '1rem',
                  display: 'flex',
                  alignItems: ' center',
                  // gap: '5px',
                }}
              >
                ( სრულად გადახდილია{' '}
                <BsCheck2Square
                  style={{
                    marginLeft: '5px',
                    marginRight: '5px',
                  }}
                />{' '}
                )
              </span>
            ) : (
              ''
            )}
          </h2>
          <h2>
            სულ დარჩენილი თანხა: {subject.currency === 'gel' ? '₾' : '$'}
            {totalLeft}
          </h2>
        </div>
        <SubjectInnerTable
          payDay={payDay}
          subject={subject}
          handleCheck={handleCheck}
          handleUncheck={handleUncheck}
          API_URL={API_URL}
          yearly={parseInt(subject.monthly * 10)}
          currency={subject.currency}
        />
        <form action='' onSubmit={() => handleRemoveSubject()}>
          <button
            className='btn-outline small danger'
            type='submit'
            style={{
              marginBottom: '30px',
            }}
          >
            საგნის წაშლა
          </button>
        </form>
      </div>
    )
  } else if (ownsSubject === undefined) {
    return <div className='loader'></div>
  } else if (ownsSubject === false) {
    return (
      <h1
        style={{
          textAlign: 'center',
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      >
        თქვენ არ დაგიმატებიათ ეს საგანი
        <br />
        <div
          style={{
            marginTop: '15px',
          }}
        >
          <Link className='btn-outline' to={`/subjects/add/${params.subject}`}>
            დამატება
          </Link>
        </div>
      </h1>
    )
  }
}

export default SubjectInnerContainer
