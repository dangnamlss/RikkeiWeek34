/* eslint-disable react/react-in-jsx-scope */
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import { useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate'
import './TestGrid.css'

export default function TestGrid (props) {
    const {lessions} = props
    const itemsPerPage = 8 
    const [items, setItems] = useState([])

    useEffect(() => {
        const newList = lessions.slice(0, itemsPerPage)
        setItems(newList)
    }, [])
    
    function handlePageClick (data) {
        console.log(lessions)
       const currentPage = data.selected + 1
       const newList = lessions.slice(currentPage - 1 * itemsPerPage, currentPage * itemsPerPage)
       setItems(newList)
       console.log(items)
        console.log(lessions)
    }

    return (
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
                <div className='lession-field row'>
                    {props.isLoaded ? (
                        items.map((item) => {
                            return <div key={item.id} className='col-lg-6' style={{ marginBottom: '30px'}}>
                                <div className='lession-card'>
                                    <div className='lession-card-body'>
                                        <p>{item.id}</p>
                                        <p>{item.totalPoint}</p>
                                    </div>
                                </div>
                            </div>
                        })
                    ) : (
                        <div></div>
                    )
                    }
                </div>

                <div>
                    <ReactPaginate
                    previousLabel={'<<'}
                    nextLabel={'>>'}
                    breakLabel={'...'}
                    pageCount={2}
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
                    // activeClassName={'active'}
                    />
                </div>
            </div>
    )
}