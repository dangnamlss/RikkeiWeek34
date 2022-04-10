/* eslint-disable no-useless-escape */
import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../Login/Login.css'
import { useNavigate } from 'react-router-dom'
import Loading from '../LoadingScreen/Loading'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye } from '@fortawesome/free-solid-svg-icons'
const eye = <FontAwesomeIcon icon={faEye} />

export default function Register () {
  const navigate = useNavigate()
  const registerApi = 'https://english-backend-v2.herokuapp.com/users/register'
  const [formErrors] = useState({})

  function submit (event) {
    event.preventDefault()

    const data = new FormData(event.target)
    console.log(data)
    console.log(data.get('email'))

    // Get data
    const x = {
      firstName: data.get('firstName'),
      lastName: data.get('lastName'),
      email: data.get('email'),
      password: data.get('password'),
      username: data.get('username')
    }

    // ---------Validate form
    // username
    const specialChar = /^[a-zA-Z0-9]+$/
    if (!data.get('username')) {
      formErrors.username = 'Username is required!'
    } else if (data.get('username').length < 5) {
      formErrors.username = 'Username can not be less than 5 characters'
    } else if (data.get('username').length > 20) {
      formErrors.username = 'Username can not be more than 20 characters'
    } else if (!specialChar.test(data.get('username'))) {
      formErrors.username = 'Username can not contain special characters'
    } else {
      formErrors.username = ''
    }

    // password
    if (!data.get('password')) {
      formErrors.password = 'Password is required!'
    } else if (data.get('password').length < 6) {
      formErrors.password = 'Password can not be less than 6 characters'
    } else if (data.get('password').length > 20) {
      formErrors.password = 'Password can not be more than 20 characters'
    } else {
      formErrors.password = ''
    }

    // email
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    if (!data.get('email')) {
      formErrors.email = 'Email is required!'
    } else if (!regex.test(data.get('email'))) {
      formErrors.email = 'Invalid email!'
    } else {
      formErrors.email = ''
    }

    // first name
    const containNumber = /^([^0-9]*)$/
    if (!data.get('firstName')) {
      formErrors.firstName = 'Firstname is required!'
    } else if (!containNumber.test(data.get('firstName'))) {
      formErrors.firstName = 'Firstname can not contain number!'
    } else {
      formErrors.firstName = ''
    }

    // last name
    if (!data.get('lastName')) {
      formErrors.lastName = 'Lastname is required!'
    } else if (!containNumber.test(data.get('lastName'))) {
      formErrors.lastName = 'Lastname can not contain number!'
    } else {
      formErrors.lastName = ''
    }

    let count = 0
    if (formErrors.username !== '' || formErrors.password !== '' || formErrors.email !== '' || formErrors.firstName !== '' || formErrors.lastName !== '') {
      count++
    }

    if (count === 0) {
      setScreenLoading(true)
      fetch(registerApi, {
        method: 'POST', // or 'PUT'
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(x)
      })
        .then(response => {
          if (response.status === 200) {
            alert('Sign up successfully')
            setScreenLoading(false)
            navigate('/')
          } else {
            alert('Sign up failed!')
            setScreenLoading(false)
            navigate('/register')
          }
        })
        .catch((error) => {
          console.error('Error:', error)
        })
    } else {
      navigate('/register')
    }
  }

  const [screenLoading, setScreenLoading] = useState(false)
  const [passwordShown, setPasswordShown] = useState(false)
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
                    <h1>Register</h1>
                    <form onSubmit={submit} id='registerForm'>
                        <div className="field-wrap">
                            <input name='firstName' id="firstName" placeholder="First name" type={'text'} />
                        </div>
                        <p>{formErrors.firstName}</p>
                        <div className="field-wrap">
                            <input name='lastName' id="lastName" placeholder="Last name" type={'text'} />
                        </div>
                        <p>{formErrors.lastName}</p>
                        <div className="field-wrap">
                            <input name='email' id="email" placeholder="Email" type={'text'} />
                        </div>
                        <p>{formErrors.email}</p>
                        <div className="field-wrap">
                            <input name='username' id="username" placeholder="Username" type={'text'} />
                        </div>
                        <p>{formErrors.username}</p>
                        <div className="field-wrap">
                            <input name='password' id="password" placeholder="Password" type={passwordShown ? 'text' : 'password'} />
                            <i className="toggle-pass-eye" onClick={togglePasswordVisiblity}>{eye}</i>
                        </div>
                        <p>{formErrors.password}</p>
                        <br/>
                        <br/>

                        <button className="button button-block" type="submit">Register</button>
                    </form>
                </div>
        </div>
  )
}
