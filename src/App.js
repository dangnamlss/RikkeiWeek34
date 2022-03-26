import { useEffect, useState } from "react";
import './App.css';
import { Routes, Route, BrowserRouter, useNavigate } from "react-router-dom";
import Header from './component/Header/Header';
import "bootstrap/dist/css/bootstrap.min.css";
import Home from './component/Home';
import Quiz from './component/Quiz/Quiz';
import Result from './component/Result/Result';

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/home' element={
            <div className='form'><Home /></div>
          }>
          </Route>
          <Route path='/result' element={<Result />}></Route>
          <Route path='*' element={
            <div className='form'>
                <Header className='form' />
            </div>
          }></Route>
          <Route path='/quiz' element={<Quiz />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );

}



export default App;
