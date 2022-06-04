import React from 'react'
import { MdSend } from 'react-icons/md'
import InputEmoji from 'react-input-emoji'

const Input = ({message, setMessage, sendMessage}) => {
  return (
    <div className="container">
        <div className='position-sticky bottom-0'>
            <form className="input-group mb-3" onSubmit={e => e.preventDefault()}>
                <InputEmoji
                 value={message}
                 onChange={setMessage}
                 cleanOnEnter
                 onEnter={sendMessage}
                 placeholder="Type a message..."
                />
                <button onClick={sendMessage} className="btn btn-primary input-group-text">Send <MdSend /></button>
            </form>        
        </div>
    </div>
  )
}

export default Input