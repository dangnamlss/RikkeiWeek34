import './Clock.css'
import '../Quiz/Quiz.css'
import 'bootstrap/dist/css/bootstrap.css'
import { FiClock } from "react-icons/fi"
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Clock() {
    var startMinute = parseInt(localStorage.getItem('time')) 
    //CLOCK
    const navigate = useNavigate()
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
                navigate('/result')
            }
        }, 1000)
        return () => clearInterval(timer)
    })

    return(
        <div className='clock container'>
            <div className='row clock-container'>
                <div className='col-lg-2 clock-icon'>
                    <i>
                    <FiClock style={{marginBottom: '34px'}} />
                    </i>
                </div>
                <div className='col-lg-6 clock row'>
                    <div className='time-field'><p className='countdown'>{minute}:{second}</p></div>
                </div>
            </div>
        </div>
    );
}