import './App.css';
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Header from './component/Header/Header';
import "bootstrap/dist/css/bootstrap.min.css";
import Home from './component/Home';
import { Navigate } from 'react-router-dom';
import Login from './component/Login/Login';
import { Nav } from 'react-bootstrap';

function App() {
  return (
    <div className="App">
      <div className='form'>
        <BrowserRouter>
          <Routes>
            <Route path='/home' element={<Home />}></Route>
            <Route path='*' element={<Header />}></Route>
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );

}



export default App;
