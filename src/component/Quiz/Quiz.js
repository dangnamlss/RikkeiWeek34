import './Quiz.css'
import 'bootstrap/dist/css/bootstrap.css'
import React, { useEffect, useState , useRef} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Clock from '../Clock/Clock';
import Question from '../Question/Question';
import Loading from '../LoadingScreen/Loading'


export default function Quiz() {
    const getGameAPI = 'https://english-backend-v2.herokuapp.com/games/getGame'
    const finishGameAPI = 'https://english-backend-v2.herokuapp.com/games/finishGame'

    var loginRes = JSON.parse(localStorage.getItem('resData')) 
    const [screenLoading, setScreenLoading] = useState(false)
    const [listQuestion, setListQuestion] = useState([])
    const [listAnswer, setListAnswer] = useState([])
    const [totalTestTime, setTotalTestTime] = useState()
    const[completedQuiz, setCompletedQuiz] = useState(0)
    const [numberOfQuiz, setNumberOfQuiz] = useState(0)
    const [answerGrid, setAnswerGrid] = useState([])
    

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
            quizListLength = res.data.data.length
            setNumberOfQuiz(quizListLength)
            var arr = []
            for(var i = 0; i < quizListLength; i++) {
                arr.push({id : res.data.data[i].id, isAnswer: false})
            }
            setAnswerGrid(arr)

            setTotalTestTime(res.data.totalTime)

            setListQuestion(res.data.data)
            
            setScreenLoading(false)
          })
          .catch(error => {
              console.log("Error")
          })
    },[])


    function test() {
        console.log(totalTestTime)
    }

    
    return(
        <div>
            <div style={{display: screenLoading? 'block':'none'}}>
                <Loading />
            </div>

            <div style={{background: screenLoading? 'white' : 'black', height: '100%', display: screenLoading? 'none':'block'}}>
                <div className='nav-bar' >
                    <div className='nav-bar-items'>
                        <div id='id-text'><p>Your ID: {_id}</p></div>
                        <button onClick={backHome} className='back-btn'><p>Back</p></button>
                    </div>
                </div>
                <div className='container'>
                    <div className='row wrapper'>
                        <div className = 'col-lg-3 form-controler'>
                            <div style={{display: screenLoading? 'none':'block'}}>
                                <Clock startTime= {totalTestTime} />
                            </div>
                            {/* END OF CLOCK */}

                            <div className='completed' style={{display: screenLoading? 'none':'block'}}>
                                <p className='answer-count'>Completed: {completedQuiz}/{numberOfQuiz}</p>
                            </div>
                            {/* END OF ANSWER COUNT */}
                            
                            <div className='quiz-grid container'>
                                {answerGrid.map(function(item) {
                                    var linkId = '#ques-'
                                    linkId += item.id-1
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
                            
                            <button className="button-82-pushable sub-btn" onClick={test} style={{display: screenLoading? 'none':'block'}}>
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
                            <br/>

                            <div>
                                {listQuestion.map((question) => {
                                    var defaultClass = 'ques-'
                                    var questionId = question.id
                                    
                                    defaultClass += questionId
                                    console.log(defaultClass)
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