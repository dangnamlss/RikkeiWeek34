import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
export default function Home() {
    const navigate = useNavigate()
    function signOut(e){
        navigate('/')
        localStorage.removeItem('password')
        localStorage.removeItem('token')
    }
    function startTest(e){
        navigate('/quiz')
    }
    return(
        <div className="container">
            <h1>Home</h1>
            <button className="button button-block" onClick={startTest} >Start test</button>
            <br />
            <button className="button button-block" onClick={signOut} >Log out</button>
        </div>
    );
}