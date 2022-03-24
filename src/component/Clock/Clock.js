import './Clock.css'
import '../Quiz/Quiz.css'
import 'bootstrap/dist/css/bootstrap.css'
import { FiClock } from "react-icons/fi"
import React, { useEffect, useState } from 'react';

export default function Clock(props) {
    var startMinute = props.startTime
    //CLOCK

    const [minute, setMinute] = useState(startMinute)
    const [second, setSecond] = useState(0)
    var timer
    useEffect(() => {
        timer = setInterval(() => {
            setSecond(second - 1)
            if(second === 0 && minute !== 0) {
                setSecond(59)
                setMinute(minute - 1)
            }
            if(minute === 0 && second === 0) {
                setMinute(0)
                setSecond(0)
            }
        }, 1000)
        return () => clearInterval(timer)
    })

    return(
        <div className='clock container'>
            <div className='row clock-container'>
                <div className='col-lg-3 clock-icon'>
                    <i>
                    <FiClock style={{marginBottom: '34px'}} />
                    </i>
                </div>
                <div className='col-lg-5 clock row'>
                    <div className='time-field'><p className='countdown'>{minute}:{second}</p></div>
                </div>
            </div>
        </div>
    );
}