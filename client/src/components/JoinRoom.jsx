import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const JoinRoom = () => {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
  return (
    <div className='container my-5 border rounded-3 bg-secondary p-5'>
        <h4 className="text-white">Join</h4>
        <form>
            <input 
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                className='form-control mb-3' placeholder='Name'/>
            <input 
                value={room}
                onChange={(e) => setRoom(e.target.value)}
                type="text"
                className='form-control mb-3' placeholder='Room Number'/>
            <button className="btn btn-primary">
                <Link to={`/chat?room=${room}&name=${name}`} className="text-white text-decoration-none">Join</Link>
            </button>
        </form>
    </div>
  )
}

export default JoinRoom