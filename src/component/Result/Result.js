import './Result.css'

export default function Result () {
    const finalScore = localStorage.getItem('score')

    return(
        <div>
            <h1 style={{color: 'black'}}>{finalScore} hello</h1>
        </div>
    )
}