import React from "react";
import { Routes, Route, Link, Navigate, useNavigate } from "react-router-dom";
import Register from "../Register/Register";
import Login from "../Login/Login";
import "bootstrap/dist/css/bootstrap.min.css";
import './header.css';
import Home from "../Home";


export default function Header() {
    // console.log(localStorage.getItem("password")&&localStorage.getItem("username"))
    return(
        <ul className='tab-group'>
            <Link to='/'>
                <li class="tab active"><a href="#signup">Log in</a></li>
            </Link>
            <Link to='/register'>
                <li class="tab"><a href="#Rlogin">Sign up</a></li>
            </Link>
            <div>
                <Routes>
                    <Route path='/' element={<Login />} />
                    <Route path='/register' element={<Register/>} />
                    <Route path="/home" element = {<Home />} />
                </Routes>
            </div>
            
        </ul>
    );
}
