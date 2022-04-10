import './Quiz.css'
import './Clock.css'
import 'bootstrap/dist/css/bootstrap.css'
import { FiClock } from 'react-icons/fi'
import '../../Responsive.css'
import React, { useEffect, useState, useStates } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import Question from '../Question/Question'
import Loading from '../LoadingScreen/Loading'
import SubPopUp from '../SubPopUp/SubPopUp'
import ScrollToTop from '../scrollToTop/ScrollToTop'
import '../../Responsive.css'

export default function Quiz () {
  const getGameAPI = 'https://english-backend-v2.herokuapp.com/games/getGame'
  const finishGameAPI = 'https://english-backend-v2.herokuapp.com/games/finishGame'

  const loginRes = JSON.parse(localStorage.getItem('resData'))
  const [screenLoading, setScreenLoading] = useState(false)
  const [listQuestion, setListQuestion] = useState([])
  const [listAnswer, setListAnswer] = useState([])
  // const [totalTestTime, setTotalTestTime] = useState()
  const [completedQuiz, setCompletedQuiz] = useState(0)
  const [numberOfQuiz, setNumberOfQuiz] = useState(0)
  const [answerGrid, setAnswerGrid] = useState([])
  const [isOpen, setIsOpen] = useState(false)
  const [totalScore, setTotalScore] = useState()
  const [givenTime, setGivenTime] = useState(0)
  const [minute, setMinute] = useState(0)
  const [second, setSecond] = useState(0)
  const params = useParams()

  // BACK HOME
  const navigate = useNavigate()
  function backHome (e) {
    navigate('/home')
  }

  // USER ID
  const _id = JSON.stringify(loginRes.id)

  // GET TOKEN
  const userToken = loginRes.token

  // SET DATA
  const getGame = {
    examId: params.id,
    userId: _id
  }

  // GET GAME
  useEffect(() => {
    setScreenLoading(true)
    axios.post(getGameAPI, getGame, {
      headers: {
        Authorization: `Bearer ${userToken}`
      }
    }
    )
      .then(res => {
        setTotalScore(res.data.totalPoint)
        setNumberOfQuiz(res.data.data.length)
        const arr = []
        for (let i = 0; i < res.data.data.length; i++) {
          arr.push({ id: res.data.data[i].id, isAnswer: false })
        }
        setAnswerGrid(arr)

        setListQuestion(res.data.data)

        setScreenLoading(false)

        setGivenTime(res.data.totalTime)
        setMinute(res.data.totalTime)
      })
      .catch(() => {
        console.log('Error')
      })
  }, [])

  //TIMER
  useEffect(() => {
    const timer = setInterval(() => {
      setSecond(second - 1)
      if (second === 0 && minute !== 0) {
        setSecond(59)
        setMinute(minute - 1)
      }
      if (minute === 0 && second === 0) {
        setMinute(0)
        setSecond(0)
        finalSubmit()
      }
    }, 1000)
    return () => clearInterval(timer)
  })
  // Pop up
  function togglePopup () {
    setIsOpen(true)
  }

  function closePopup () {
    setIsOpen(false)
  }

  // Submit
  const finalSubmit = () => {
    var totalMinute
    var totalSecond
    if(second === 0) {
      totalMinute = givenTime - minute
      totalSecond = totalMinute * 60
    } else {
      totalMinute = givenTime - minute - 1
      totalSecond = (60 - second) + totalMinute * 60
    }
   
    setScreenLoading(true)
    setIsOpen(false)
    axios.post(finishGameAPI,
      {
        examId: getGame.examId,
        listAnswer: listAnswer,
        totalTime: totalSecond,
        userId: _id
      },
      {
        headers: {
          Authorization: `Bearer ${userToken}`
        }
      }
    )
      .then(res => {
        localStorage.setItem('score', res.data.scores)

        localStorage.setItem('total', totalScore)
      })
      .then(() => {
        setScreenLoading(false)
        navigate('/result')
      }
      )
      .catch(error => {
        console.log(error)
      })
  }

  function scrollToQues (id) {
    const target = document.getElementById(id).getBoundingClientRect().top - 40
    console.log(id)
    window.scrollTo({ top: target, behavior: 'smooth' })
  }

  //CLOCK

  return (
        <div>
            <div style={{ display: screenLoading ? 'none' : 'block' }}>
                <ScrollToTop/>
            </div>

            <div style={{ display: screenLoading ? 'block' : 'none' }}>
                <Loading />
            </div>

            <div style={{ display: isOpen ? 'block' : 'none' }}>
                <SubPopUp 
                closePopup={closePopup} 
                finalSubmit={finalSubmit}
                />
            </div>

            <div style={{zIndex: '-99',height: 'wrap-content', background: 'black', display: screenLoading ? 'none' : 'block' }}>
                <div className='nav-bar' >
                    <div className='nav-bar-items'>
                        <div id='id-text'><p>Your ID: {_id}</p></div>
                        <button onClick={backHome} className='back-btn'><p>Back</p></button>
                    </div>

                </div>

                <div className='container test'>
                    <div className='row wrapper'>
                        <div className = 'col-lg-3 form-controler'>
                            <div style={{ display: screenLoading ? 'none' : 'block' }}>
                            <div className='clock-container container'>
                                <div className='clock-icon'>
                                    <i>
                                    <FiClock style={{ marginBottom: '34px' }} />
                                    </i>
                                </div>
                                <div className='clock'>
                                    <div className='time-field'><p className='countdown'>{minute}:{second}</p></div>
                                </div>
                            </div>
                            </div>
                            {/* END OF CLOCK */}

                            <div className='completed' style={{ display: screenLoading ? 'none' : 'block' }}>
                                <p className='answer-count'>Completed: {completedQuiz}/{numberOfQuiz}</p>
                            </div>
                            {/* END OF ANSWER COUNT */}

                            <div className='quiz-grid container'>
                                {answerGrid.map(function (item, idx) {
                                  return <div className='quiz-item' key={item.id}>
                                                <button onClick={() => scrollToQues(item.id)} style={item.isAnswer ? { color: 'white', background: 'black' } : { color: 'black', background: 'white' }}>
                                                    {idx + 1}
                                                </button>
                                            </div>
                                })

                                }
                            </div>

                            {/* END OF QUIZ GRID */}
                            <br/>
                            <br/>

                            <button onClick={togglePopup} className="button-82-pushable sub-btn" style={{ display: screenLoading ? 'none' : 'block' }}>
                                <span className="button-82-shadow"></span>
                                <span className="button-82-edge"></span>
                                <span className="button-82-front text">
                                    Submit
                                </span>
                            </button>
                        </div>

                        <div className = 'col-lg-9 quiz-field'>
                            <br/>
                            <br/>

                            <div>
                                {listQuestion.map((question, idx) => {
                                  return <Question
                                                    id={question.id}
                                                    questionName = {question.questionName}
                                                    questionType = {question.questionType}
                                                    questionTitle = {question.questionTitle}
                                                    questionContent = {question.questionContent}
                                                    key = {question.id}
                                                    listAnswer = {listAnswer}
                                                    setListAnswer = {setListAnswer}
                                                    answerGridBtn = {answerGrid}
                                                    setAnswerGridBtn = {setAnswerGrid}
                                                    completedQuiz = {completedQuiz}
                                                    setCompletedQuiz = {setCompletedQuiz}

                                                />
                                })
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
  )
}
