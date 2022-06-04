import React from 'react'
import { IoMdClose } from 'react-icons/io'
import { BiUserCircle } from 'react-icons/bi'

const Infobar = ({room}) => {
  return (
    <div className="position-sticky">
      <div className='bg-primary text-white d-flex justify-content-between px-3 py-2'>
          <div className="d-flex align-items-center">
              < BiUserCircle className='me-2' />
              <h5>room {room}</h5>
          </div>
          <div className="">
              <a href="/" className='text-white'>
                  < IoMdClose />
              </a>
          </div>
      </div>
    </div>
  )
}

export default Infobar