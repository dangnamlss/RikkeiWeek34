/* eslint-disable camelcase */
import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import './Login.css'
import '../../App.css'
import { useNavigate } from 'react-router-dom'
import Loading from '../LoadingScreen/Loading'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'

const eye = <FontAwesomeIcon icon={faEye} />

export default function Login () {
  const name_from_storage = localStorage.getItem('username')
  const navigate = useNavigate()
  const loginApi = ' https://english-backend-v2.herokuapp.com/users/authenticate'
  const [screenLoading, setScreenLoading] = useState(false)
  const [passwordShown, setPasswordShown] = useState(false)
  const [storeUsername, setStoreUsername] = useState(name_from_storage ?? '')
  const [formErrors] = useState({
    username: '',
    password: ''
  })

  function submit (event) {
    event.preventDefault()

    const data = new FormData(event.target)

    // Get data
    const x = {
      password: data.get('password'),
      username: data.get('username')
    }

    // Validate
    if (!data.get('username')) {
      formErrors.username = 'Username is required!'
    } else {
      formErrors.username = ''
    }

    if (!data.get('password')) {
      formErrors.password = 'Password is required!'
    } else {
      formErrors.password = ''
    }

    let count = 0
    if (formErrors.username !== '' || formErrors.password !== '') {
      count++
    }
    if (count === 0) {
      setScreenLoading(true)
      axios.post(loginApi,
        x,
        {
          headers: {
            'Content-type': 'application/json; charset=UTF-8'
          }
        }
      )
        .then(response => {
          if (response.status === 200) {
            console.log(response.data)
            localStorage.setItem('token', response.data.data.token)
            localStorage.setItem('userId', response.data.data.id)
            localStorage.setItem('firstName', response.data.data.firstName)
            localStorage.setItem('lastName', response.data.data.lastName)
            localStorage.setItem('resData', JSON.stringify(response.data.data))
            // Remember me
            const checkbox_status = data.get('rememberMe')
            if (checkbox_status != null) {
              localStorage.setItem('username', data.get('username'))
              console.log(response.data.data)
            } else if (checkbox_status == null) {
              localStorage.removeItem('username')
            }
            setScreenLoading(false)
            navigate('/home')
          } else {
            alert('Sign in failed! Check your username and password!')
            setScreenLoading(false)
            navigate('/')
          }
        })
        .catch((error) => {
          alert('Sign in failed! Check your username and password!')
          setScreenLoading(false)
          console.error('Error:', error)
        })
    } else {
      navigate('/')
    }
  }

  const togglePasswordVisiblity = () => {
    setPasswordShown(!passwordShown)
  }

  return (
        <div className="container">

            <div style={{ display: screenLoading ? 'block' : 'none' }}>
                <Loading />
            </div>
                <br/>
                <br/>
                <br/>
                <br/>
                <div className="Rlogin" >
                    <h1>Login</h1>
                    <form id='loginForm' onSubmit={submit}>
                        <div className="field-wrap">
                            <input name='username'
                            id="username"
                            placeholder="Username"
                            type={'text'}
                            value={storeUsername}
                            onChange={e => setStoreUsername(e.target.value)}/>
                        </div>
                        {formErrors.username && <span >{formErrors.username}</span> }

                        <div className="field-wrap">
                            <input name='password' id="password" placeholder="Password" type={passwordShown ? 'text' : 'password'} />
                            <i className="toggle-pass-eye" onClick={togglePasswordVisiblity}>{eye}</i>
                        </div>
                        {formErrors.password && <span >{formErrors.password}</span> }

                        <div className="check-field">
                            <input className="form-check-input" type={'checkbox'} name='rememberMe' />
                            <label>
                                Remember me
                            </label>
                        </div>

                        <br/>
                        <br/>
                        <button className="button button-block">Log in</button>
                    </form>
                </div>
        </div>
  )
}
