import React from 'react'
import { useState, createContext } from 'react'
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import Header from './components/Header/Header'
import Home from './pages/Home'
import Login from './pages/Login'
import Profile from './pages/Profile'
import ProfileSubjects from './pages/ProfileSubjects'
import Register from './pages/Register'
import SubjectAdd from './pages/SubjectAdd'
import SubjectInner from './pages/SubjectInner'
import Subjects from './pages/Subjects'

const UserContext = createContext()
const UserLoggedContext = createContext()

const App = () => {
  const API_URL = '' // You need to add your own API_URL

  const [logged, setLogged] = useState(false)

  return (
    <BrowserRouter>
      <UserContext.Provider value={logged}>
        <UserLoggedContext.Provider value={setLogged}>
          <Header
            UserContext={UserContext}
            UserLoggedContext={UserLoggedContext}
          />

          <Routes>
            <Route path='/' element={<Home />} />
            <Route
              path='/register'
              element={
                <Register
                  API_URL={API_URL}
                  UserLoggedContext={UserLoggedContext}
                />
              }
            />
            <Route
              path='/login'
              element={
                <Login
                  API_URL={API_URL}
                  UserLoggedContext={UserLoggedContext}
                />
              }
            />
            <Route
              path='/profile'
              element={
                <Profile
                  API_URL={API_URL}
                  UserLoggedContext={UserLoggedContext}
                />
              }
            />
            <Route path='/subjects' element={<Subjects />} />
            <Route
              path='/subjects/my'
              element={<ProfileSubjects API_URL={API_URL} />}
            />
            <Route
              path='/subjects/:subject'
              element={<SubjectInner API_URL={API_URL} />}
            />
            <Route
              path='/subjects/add/:subject'
              element={<SubjectAdd API_URL={API_URL} />}
            />
          </Routes>
        </UserLoggedContext.Provider>
      </UserContext.Provider>
    </BrowserRouter>
  )
}

export default App
