/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable object-curly-spacing */

import './App.css'
import { Routes, Route, BrowserRouter, Navigate, useNavigate} from 'react-router-dom'
import Header from './component/Header/Header'
import 'bootstrap/dist/css/bootstrap.min.css'
import Home from './component/Home/Home'
import Quiz from './component/Quiz/Quiz'
import Result from './component/Result/Result'
import { useEffect, useState } from 'react'

function App () {
  return (
    <div className="App">
      <BrowserRouter>
          <Routes>
            <Route path='/home' element={ <Home /> }>
              
            </Route>
            <Route path='/result' element={ <Result />}></Route>
            <Route path='*' element={
              <div className='form'>
                  <Header className='form' />
              </div>
            }></Route>
            <Route path='/quiz/:id' element={ <Quiz />}></Route>
          </Routes>
        </BrowserRouter>
    </div>
  )
}

export default App
