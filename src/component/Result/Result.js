/* eslint-disable react/react-in-jsx-scope */
import { faFaceFrown } from '@fortawesome/free-regular-svg-icons'
import { faFaceSmile } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './Result.css'

export default function Result () {
  let commentText = ''
  const finalScore = localStorage.getItem('score')
  const totalScore = localStorage.getItem('total')
  let isLow = false
  const navigate = useNavigate()
  function backHome (e) {
    localStorage.removeItem('score')
    localStorage.removeItem('total')
    navigate('/home')
  }

  useEffect(()=> {
    const token = localStorage.getItem('token')
    if(!token) {
      navigate('/')
    }
    if(!finalScore && !totalScore) {
      navigate('/home')
    }
  })
  if (finalScore >= totalScore * 0.6) {
    isLow = false
    commentText = 'Congratulation!'
  } else {
    isLow = true
    commentText = 'The score is quite low. You need to try better'
  }

  return (
    <div style={{ background: 'black', height: '100vh' }}>
        <div className='container result-wrapper'>
            <div className='result-nav-bar'>
                <div className='result-nav-bar-items'>
                    <button onClick={backHome} className='back-btn'><p>Back</p></button>
                </div>
            </div>

            <div className='result-mes'>
                <div className='result-icon' >
                    <i style={{ color: 'red', fontSize: '80px' }}>
                        <FontAwesomeIcon icon={isLow ? faFaceFrown : faFaceSmile} />
                    </i>
                </div>
                <div className='result-text'>
                    <h5>Your score: {finalScore}/{totalScore}</h5>
                    <p>{commentText}</p>
                </div>
            </div>
        </div>
    </div>
  )
}
