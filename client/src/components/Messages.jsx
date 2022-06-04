import React from 'react'
import ScrollToBottom from 'react-scroll-to-bottom';

const Messages = ({messages, name}) => {
  return (
    <ScrollToBottom className='py-3'>
      <div style={{height: "70vh"}}>
        {messages.map((chat, index) => (
          name === chat.name
          ? (
            <div key={index} className="d-flex justify-content-end me-3">
                <p className='mt-3 ms-3'>
                  <small className='text-white-50'>{chat.name}</small>
                  <span className='ms-2 rounded-pill p-2 bg-primary text-white'>{chat.message}</span>
                </p>
            </div>
          )
          : (
            <div key={index} className="d-flex">
                <p className='mt-3 ms-3'>
                  <span className='me-2 rounded-pill p-2 bg-secondary text-white'>{chat.message}</span>
                  <small className='text-white-50'>{chat.name}</small>
                </p>
            </div>
          )
                     
        ))}
      </div>
  </ScrollToBottom>
  )
}

export default Messages