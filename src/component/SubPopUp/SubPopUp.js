/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */

import { faCircleExclamation, faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import './SubPopUp.css'

export default function SubPopUp (props) {
  return (
        <div className='modal-container'>
            <div className="modal">
                <button id='close-btn' onClick={props.closePopup} >
                    <FontAwesomeIcon icon={faXmark} />
                </button>

                <i id='warning-icon'>
                    <FontAwesomeIcon icon={faCircleExclamation} style={{ color: 'red' }} />
                </i>

                <p className="message">Are you sure finish ?</p>
                <div className="options">
                    <button onClick={props.finalSubmit} className="btn">Yes</button>
                    <button onClick={props.closePopup} className="btn">No</button>
                </div>
            </div>
        </div>
  )
}
