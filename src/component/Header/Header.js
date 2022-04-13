import React, { useEffect, useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import Register from '../Register/Register'
import Login from '../Login/Login'
import 'bootstrap/dist/css/bootstrap.min.css'
import './header.css'

export default function Header () {
  const navigate = useNavigate()
  const [isLogin, setIsLogin] = useState(false)
  

  function handleOnClickLogin() {
       navigate('/')
  }

  function handleOnClickSignup() {
      navigate('/register')
  }

  useEffect(() => {
    const token = localStorage.getItem('token')
    if(token) {
        setIsLogin(true)
        navigate('/home')
    } else {
        setIsLogin(false)
        navigate('/')
    }
  }, [])
  return (
      <div className='container'>
          {isLogin ? null : (
            <ul className='tab-group'>
                
                <div onClick={handleOnClickLogin}>
                    <li className="tab active"><a>Log in</a></li>
                </div>
                <div onClick={handleOnClickSignup}>
                    <li className="tab"><a>Sign up</a></li>
                </div>
                <div>
                    <Routes>
                        <Route path='/' element={<Login />} />
                        <Route path='/register' element={<Register/>} />
                    </Routes>
                </div>

            </ul>
          )}
      </div>
  )
}
