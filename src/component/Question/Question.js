/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
import './Question.css'

export default function Question (props) {
  const questionString = props.questionContent

  const answer = questionString.split('|')

  const { answerGridBtn, setAnswerGridBtn } = props
  const { listAnswer, setListAnswer } = props
  const { completedQuiz, setCompletedQuiz } = props

  function handleChange (e) {
    console.log(answer[0])
    const target = e.target
    console.log(props.listAnswer)
    const answerId = props.listAnswer.findIndex(arr => { return arr.id === target.name })

    if (answerId < 0) {
      setCompletedQuiz(completedQuiz + 1)
      setListAnswer([
        ...listAnswer,
        { id: parseInt(target.name), questionAnswer: target.value }
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
    console.log(listAnswer)
    console.log(answerGridBtn)
  }

  return (
        <div className="container question-wrapper" id={props.id}>
            <div className='question'>
                <p>{props.id}. {props.questionTitle}</p>
            </div>
            <div className='row'>
                <div className='col-lg-6'>
                    <label className="rad-label">
                        <input type="radio" className="rad-input" name={props.id} onChange={handleChange} value={answer[0]}/>
                        <div className="rad-design"></div>
                        <div className="rad-text">A. {answer[0]}</div>
                    </label>
                </div>
                <div className='col-lg-6'>
                    <label className="rad-label">
                        <input type="radio" className="rad-input" name={props.id} onChange={handleChange} value={answer[1]}/>
                        <div className="rad-design"></div>
                        <div className="rad-text">B. {answer[1]}</div>
                    </label>
                </div>
                <div className='col-lg-6'>
                    <label className="rad-label">
                        <input type="radio" className="rad-input" name={props.id} onChange={handleChange} value={answer[2]}/>
                        <div className="rad-design"></div>
                        <div className="rad-text">C. {answer[2]}</div>
                    </label>
                </div>
                <div className='col-lg-6'>
                    <label className="rad-label">
                        <input type="radio" className="rad-input" name={props.id} onChange={handleChange} value={answer[3]}/>
                        <div className="rad-design"></div>
                        <div className="rad-text">D. {answer[3]}</div>
                    </label>
                </div>
            </div>
        </div>
  )
}
