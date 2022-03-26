import { faFaceFrown } from '@fortawesome/free-regular-svg-icons'
import { faFaceSmile } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useNavigate } from 'react-router-dom'
import './Result.css'

export default function Result () {
    var commentText = ''
    var finalScore = localStorage.getItem('score')
    var totalScore = localStorage.getItem('total')
    var isLow = false
    const navigate = useNavigate()
    function backHome(e){
        navigate('/home')
    }

    if(finalScore >= 70) {
        isLow = false
        commentText = 'Congratulation!'
    }
    else {
        isLow = true
        commentText = 'The score is quite low. You need to try better'
    }

    return(
    <div style={{background: 'black', height:'100vh'}}>
        <div className='container result-wrapper'>
            <div className='result-nav-bar'>
                <div className='result-nav-bar-items'>
                    <button onClick={backHome} className='back-btn'><p>Back</p></button>
                </div>
            </div>
            
            <div className='result-mes'>
                <div className='result-icon' >
                    <i style={{color: 'red', fontSize:'80px'}}>
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