import React, { useEffect, useState } from 'react'
import SubjectAddContainer from '../components/Subjects/SubjectAddContainer'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import subjects from '../subjects'
import months from '../months'

const SubjectAdd = ({ API_URL }) => {
  const params = useParams()
  const navigate = useNavigate()

  const [ownsSubject, setOwnsSubject] = useState()
  const [userId, setUserId] = useState('')

  useEffect(() => {
    if (!localStorage.getItem('token')) navigate('/login')

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
          await setUserId(res.data._id)
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
        })
        .catch(err => console.log(err))
    }

    handleGetUser()
  }, [])

  const handleAdd = async (e, monthlyPayment, currency, payDay) => {
    e.preventDefault()

    const newSubject = {
      subject: subjects[params.subject].name,
      monthly: parseInt(monthlyPayment),
      currency: currency,
      months: months,
      left: 0,
      payDay: payDay,
    }

    if (userId) {
      await axios
        .post(`${API_URL}/subjects/${userId}`, newSubject, {
          headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        })
        .then(async res => {
          navigate(`/subjects/${params.subject}`)
        })
        .catch(err => console.log(err))
    }
  }

  if (!ownsSubject) {
    return (
      <main>
        <div className='container fluid'>
          <SubjectAddContainer handleAdd={handleAdd} />
        </div>
      </main>
    )
  } else {
    navigate(`/subjects/${params.subject}`)
  }
}

export default SubjectAdd
