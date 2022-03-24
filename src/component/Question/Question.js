import './Question.css'

export default function Question (props) {
    var questionString= JSON.stringify(props.questionContent) 
    
    var answer = questionString.split('|')
 
    const {answerGridBtn, setAnswerGridBtn} = props
    const {listAnswer, setListAnswer} = props
    const {completedQuiz, setCompletedQuiz} = props

    function handleChange(e) {
        
        var target = e.target
        console.log(props.listAnswer)
        const answerId = props.listAnswer.findIndex(arr => {return arr.id == target.name})
        console.log(answerId)

        if(answerId < 0) {
            setCompletedQuiz(completedQuiz + 1)
            setListAnswer([
                ...listAnswer,
                {id: parseInt(target.name), questionAnswer: target.value}
            ])

            const newAnswerList = [...answerGridBtn]
            newAnswerList[target.name - 1] = {
                id: target.name,
                isAnswer: true
            }
            setAnswerGridBtn(newAnswerList)
        } else {
            const newListAnswer = [...listAnswer]
            newListAnswer[answerId] = {
                id: parseInt(target.name),
                questionAnswer: target.value
            }
            setListAnswer(newListAnswer)
        }
    }

    return (
        <div className="container question-wrapper">
            <div className='question'>
                <p>{props.id}. {props.questionTitle}</p>
            </div>
            <div className='row'>
                <div className='col-lg-6'>
                    <label className="rad-label">
                        <input type="radio" className="rad-input" name={props.id} onChange={handleChange}/>
                        <div className="rad-design"></div>
                        <div className="rad-text">A. {answer[0]}</div>
                    </label>
                </div>
                <div className='col-lg-6'>
                    <label className="rad-label">
                        <input type="radio" className="rad-input" name={props.id} onChange={handleChange}/>
                        <div className="rad-design"></div>
                        <div className="rad-text">B. {answer[1]}</div>
                    </label>
                </div>
                <div className='col-lg-6'>
                    <label className="rad-label">
                        <input type="radio" className="rad-input" name={props.id} onChange={handleChange}/>
                        <div className="rad-design"></div>
                        <div className="rad-text">C. {answer[2]}</div>
                    </label>
                </div>
                <div className='col-lg-6'>
                    <label className="rad-label">
                        <input type="radio" className="rad-input" name={props.id} onChange={handleChange}/>
                        <div className="rad-design"></div>
                        <div className="rad-text">D. {answer[3]}</div>
                    </label>
                </div>
            </div>
        </div>
    )
}