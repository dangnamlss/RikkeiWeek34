import './Quiz.css'
import 'bootstrap/dist/css/bootstrap.css'
import React, { useEffect, useState , useRef} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Clock from '../Clock/Clock';
import Question from '../Question/Question';
import Loading from '../LoadingScreen/Loading'
import SubPopUp from '../SubPopUp/SubPopUp';

export default function Quiz() {
    const getGameAPI = 'https://english-backend-v2.herokuapp.com/games/getGame'
    const finishGameAPI = 'https://english-backend-v2.herokuapp.com/games/finishGame'

    var loginRes = JSON.parse(localStorage.getItem('resData')) 
    const [screenLoading, setScreenLoading] = useState(false)
    const [listQuestion, setListQuestion] = useState([])
    const [listAnswer, setListAnswer] = useState([])
    // const [totalTestTime, setTotalTestTime] = useState()
    const[completedQuiz, setCompletedQuiz] = useState(0)
    const [numberOfQuiz, setNumberOfQuiz] = useState(0)
    const [answerGrid, setAnswerGrid] = useState([])
    const [isOpen, setIsOpen] = useState(false)
    const [finalScore, setFinalScore] = useState(0)

    //BACK HOME
    const navigate = useNavigate()
    function backHome(e){
        navigate('/home')
    }
    
    //USER ID
    const _id = JSON.stringify(loginRes.id)
    
    //GET TOKEN
    const userToken = loginRes.token

    //SET DATA
    var getGame = {
        examId: 24,
        userId: _id
    }

    //GET GAME
    var quizListLength = 0
    useEffect(()=>{
        setScreenLoading(true)
        axios.post(getGameAPI, getGame, {
            headers: {
              Authorization: `Bearer ${userToken}`,
            },
          }
        )
          .then(res => {
            localStorage.setItem('time', res.data.totalTime)

            quizListLength = res.data.data.length
            setNumberOfQuiz(quizListLength)
            var arr = []
            for(var i = 0; i < quizListLength; i++) {
                arr.push({id : res.data.data[i].id, isAnswer: false})
            }
            setAnswerGrid(arr)

            // setTotalTestTime(res.data.totalTime)

            setListQuestion(res.data.data)
            
            setScreenLoading(false)
          })
          .catch(error => {
              console.log("Error")
          })
    },[])


    //Pop up
    function togglePopup() {
        setIsOpen(true)
    }

    function closePopup() {
        setIsOpen(false)
    }

    //Submit
    function finalSubmit() {
        axios.post(finishGameAPI,
            {
                examId: 24,
                listAnswer: listAnswer,
                totalTime: 30,
                userId: _id
            },
            {
            headers: {
              Authorization: `Bearer ${userToken}`,
            },
          }
        )
          .then(res => {
            console.log(listAnswer)
            console.log(res.data)
            setFinalScore(res.data.score)
            localStorage.setItem('score', finalScore)
            console.log(finalScore)
            navigate('/result')
          })
          .catch(error => {
              console.log("Error")
          })
    }
    return(
        <div>
            <div style={{display: screenLoading? 'block':'none'}}>
                <Loading />
            </div>

            <div style={{display: isOpen? 'block':'none'}}>
                <SubPopUp closePopup={closePopup} finalSubmit={finalSubmit} />
            </div>
            <div style={{background: screenLoading? 'white' : 'black', height: '100%', display: screenLoading? 'none':'block'}}>
                <div className='nav-bar' >
                    <div className='nav-bar-items'>
                        <div id='id-text'><p>Your ID: {_id}</p></div>
                        <button onClick={backHome} className='back-btn'><p>Back</p></button>
                    </div>
                    
                </div>
                
              
                <div className='container test' >
                    <div className='row wrapper'>
                        <div className = 'col-lg-3 form-controler'>
                            <div style={{display: screenLoading? 'none':'block'}}>
                                <Clock />
                            </div>
                            {/* END OF CLOCK */}

                            <div className='completed' style={{display: screenLoading? 'none':'block'}}>
                                <p className='answer-count'>Completed: {completedQuiz}/{numberOfQuiz}</p>
                            </div>
                            {/* END OF ANSWER COUNT */}
                            
                            <div className='quiz-grid container'>
                                {answerGrid.map(function(item) {
                                    var linkId = '#ques-'
                                    if(item.id == 1) {
                                        linkId = '#ques-1'
                                    } else {
                                        linkId += item.id
                                    }
                                    return <div className='quiz-item' id={item.id} key={item.id} style={item.isAnswer ? {background: 'black'} : {background: 'white'}}>
                                            <a href={linkId}  style={item.isAnswer ? {color:'white'} : {color: 'black'}}>
                                                {item.id}
                                            </a>
                                            </div>
                                }) 
                                    
                                }
                            </div>
                        
                            {/* END OF QUIZ GRID */}
                            <br/>
                            <br/>
                            
                            <button onClick={togglePopup} className="button-82-pushable sub-btn" style={{display: screenLoading? 'none':'block'}}>
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
                                {listQuestion.map((question) => {
                                    var defaultClass = 'ques-'
                                    var questionId = question.id
                                    
                                    defaultClass += questionId
                                    
                                    return <div id={defaultClass}>
                                        <Question
                                                    id={question.id}
                                                    questionName = {question.questionName}
                                                    questionType = {question.questionType}
                                                    questionTitle = {question.questionTitle}
                                                    questionContent = {question.questionContent}
    
                                                    listAnswer = {listAnswer}
                                                    setListAnswer = {setListAnswer}
                                                    answerGridBtn = {answerGrid}
                                                    setAnswerGridBtn = {setAnswerGrid}
                                                    completedQuiz = {completedQuiz}
                                                    setCompletedQuiz = {setCompletedQuiz}
                                                    
                                                /> 
                                    </div>
                                     }) 
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}