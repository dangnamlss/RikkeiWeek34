import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './Home.css'
import './History.css'
import '../Category/Category.css'
import '../TestGrid/TestGrid.css'
import { faUser } from '@fortawesome/free-regular-svg-icons'
// import Category from '../Category/Category'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import ReactPaginate from 'react-paginate'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import Loading from '../LoadingScreen/Loading'

export default function Home () {
  const userToken = localStorage.getItem('token')
  const navigate = useNavigate()
  const name = localStorage.getItem('lastName') + ' ' + localStorage.getItem('firstName')
  const [lessions, setLessions] = useState([])
  const [lessionItems, setLessionItems] = useState([])
  const [pageCount, setPageCount] = useState(0)
  const [historyData, setHistoryData] = useState([])
  const [screenLoading, setScreenLoading] = useState(false)
  const [cateList, setCateList] = useState([])
  const [active, setActive] = useState(0)
  
  const itemPerPage = 8
  function signOut () {
    navigate('/')
    localStorage.removeItem('password')
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    localStorage.removeItem('resData')
    localStorage.removeItem('firstName')
    localStorage.removeItem('lastName')
    localStorage.removeItem('score')
    localStorage.removeItem('total')
  }

  function startTest(id){
    navigate(`/quiz/${id}`)
  }

  useEffect(() => {
    if(!userToken) {
      navigate('/')
    } else {
      setScreenLoading(true)
  
      axios.get('https://english-backend-v2.herokuapp.com/categories')
      .then(function (res) {
        setCateList(res.data.data)
      })
      .catch(function (error) {
        console.log(error)
      })
  
      axios.get('https://english-backend-v2.herokuapp.com/exams/getListExamByCategory/1', {
        headers: {
          Authorization: `Bearer ${userToken}`
        }
      })
      .then(res => {
        setLessions(res.data.data)
        setPageCount(Math.ceil(res.data.data.length / itemPerPage))
        const newList = res.data.data.slice(0, itemPerPage)
        setLessionItems(newList)
        setScreenLoading(false)
      })
  
      axios.get(`https://english-backend-v2.herokuapp.com/results/getByUser/${localStorage.getItem('userId')}`, {
        headers: {
          Authorization: `Bearer ${userToken}`
        }
      })
      .then(res => {
        setHistoryData(res.data.data)
        console.log(res.data.data)
      })
      .catch((error) => {
        console.log(error)
      })

    }

  }, [])

  function handleClickCategory (cateId, idx) {
    setScreenLoading(true)
    setActive(idx)
    const getLession = 'https://english-backend-v2.herokuapp.com/exams/getListExamByCategory/' + cateId
    
    axios.get(getLession, {
      headers: {
        Authorization: `Bearer ${userToken}`

      }
    })
    .then(res => {
      setLessions(res.data.data)
      setPageCount(Math.ceil(res.data.data.length / itemPerPage))
      const newList = res.data.data.slice(0, itemPerPage)
      
      setLessionItems(newList)
      setScreenLoading(false)
    })
    .catch(function (error) {
      console.log(error)
    })
  }

  function handlePageClick (data) {
    const currentPage = data.selected + 1;
    const newList = lessions.slice(
      (currentPage - 1) * itemPerPage,
      currentPage * itemPerPage
    );  
    setLessionItems(newList);
  }

  return (
        <div>
            <div style={{ display : screenLoading ? 'block' : 'none'}}>
              <Loading/>
            </div>
            <div style={{ display : screenLoading ? 'none' : 'block'}}>
              <div className='nav-bar home-nav' >
                    <div className='nav-bar-items'>
                        <div id='user-info'>
                          <div className='user-icon'>
                            <FontAwesomeIcon icon={faUser} />
                          </div>
                          <p>{name}</p>
                        </div>
                        <button onClick={signOut} className='back-btn'><p>Log out</p></button>
                    </div>
              </div>
              <div className='row'>
                <div className='col-lg-3 category-wrapper seperator'>
                  <div className='category'>
                    <br />
                    <br />
                    <br />
                    <br />
                    <p style={{ color: 'black', fontSize: '30px' }}>{localStorage.getItem('lastName') + ' ' + localStorage.getItem('firstName')}</p>
                    <br/>
                    <div className='category-menu'>
                      {cateList.map(function (item, idx) {
                        return <div 
                          key={idx} 
                          id={item.id}
                          onClick={ () => {
                            handleClickCategory(item.id, idx)
                          }
                          }

                          className= {active === idx ? 'active category-item' : 'inactive category-item'}
                        >
                          <p>{item.categoryName}</p>
                        </div>
                      })}
                    </div>
                  </div>
                </div>
                <div className='col-lg-6 test-grid seperator'>
                  <div className='container'>
                      <br />
                      <br />
                      <br />
                      <div className='search-field'>
                          <form>
                              <input type="text" placeholder="Search.." name="search" />
                              <button className="search-btn"><i> <FontAwesomeIcon icon={faSearch}/></i></button>
                          </form>
                      </div>
                      <br />
                      <br />
                      <div className='lession-field row'>
                        <div style={{ display : screenLoading ? 'block' : 'none'}}>
                          <Loading/>
                        </div>
                          
                            {lessionItems.length > 0 ? (
                              lessionItems.map((lessionItem) => {

                                  return <div key={lessionItem.id} className='col-lg-6' style={{ marginBottom: '30px'}}>
                                      <div className='lession-card'>
                                          <div className='lession-card-body' onClick={() => {startTest(lessionItem.id)}}>
                                              <div className='card-text'>
                                                <h6>{lessionItem.examName}</h6>
                                                <h6>Total point: {lessionItem.totalPoint}</h6>
                                                <h6>Total time: {lessionItem.totalTime}</h6>
                                              </div>
                                              <div className='start-btn' onClick={() => {startTest(lessionItem.id)}}>
                                                Start
                                              </div>
                                              <div className='point-wrapper'>
                                                {lessionItem.totalPoint}
                                                
                                              </div>
                                          </div>
                                      </div>
                                  </div>
                              })

                            ) : (
                              <div>No lession</div>
                            )}
                          
                      </div>

                      <div>
                          <ReactPaginate
                          renderOnZeroPageCount={null}
                          previousLabel={'<<'}
                          nextLabel={'>>'}
                          breakLabel={'...'}
                          pageCount={pageCount}
                          marginPagesDisplayed={4}
                          pageRangeDisplayed={3}
                          onPageChange={handlePageClick}
                          containerClassName={'pagination justify-content-center'}
                          pageClassName={'page-item'}
                          pageLinkClassName={'page-link'}
                          previousClassName={'page-item'}
                          previousLinkClassName={'page-link'}
                          nextClassName={'page-item'}
                          nextLinkClassName={'page-link'}
                          breakClassName={'page-item'}
                          breakLinkClassName={'page-link'}
                          activeClassName={'active'}
                          />
                      </div>
                  </div>
                </div>
                <div className='col-lg-3 history-wrapper'>
                    <br />
                    <br />
                    <br />
                  <p style={{ color: 'black', fontSize: '30px' }}>HISTORY</p>

                  <div className='lession-field history-list'>
                    {
                      [...historyData].reverse().map((data) => {
                        var minute = parseInt(data.totalTime / 60)
                        var second = parseInt(data.totalTime % 60)
                        return <div key={data.id} style={{ marginBottom: '30px', width: '94%'}}>
                          <div className='lession-card'>
                            <div className='lession-card-body'>
                              <h6 style={{fontWeight: 'bold'}}>{data.examName}</h6>
                              <div className='h-card-text row' style={{display: 'flex', marginLeft: '4px'}}>
                                <div className='col-lg-4'>
                                  <p>Correct: </p>{data.numberOfCorrect}/{data.totalRecords}
                                </div>
                                <div className='col-lg-4'>
                                  <p>
                                    Time: 
                                  </p>
                                  {minute} min {second} sec
                                </div>
                                <div className='col-lg-4'>
                                  <p>
                                    Scores: 
                                  </p>
                                  {data.totalPoint}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      })
                    }
                  </div>        
                </div>
              </div>
            </div>
        </div>
  )
}
