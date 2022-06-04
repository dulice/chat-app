import React, { useEffect, useState } from 'react'
import queryString from 'query-string';
import io from 'socket.io-client'
import { useLocation } from 'react-router-dom';
import Infobar from './Infobar';
import Input from './Input';
import Messages from './Messages';

const socket = io.connect('http://localhost:5000');

const Chat = () => {
  const location = useLocation();
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const {name, room} = queryString.parse(location.search);
    socket.emit('join', room);

    socket.emit('userData', {room, name});
    setRoom(room);
    setName(name)

    socket.on('message', (payload) => {
      setMessages([...messages, {message: payload.message, name: payload.name}]);
    })
  },[name, room, messages, location.search]);

  const sendMessage = () => {
    socket.emit('message', { message, name, room });
    setMessage('');
  }

  return (
    <div className=''>
      <div className="container my-3 shadow-lg p-0 position-relative rounded-3">
        <div>
          <Infobar  room={room}/>
          <Messages messages={messages} name={name}/>
          <Input message={message} setMessage={setMessage} sendMessage={sendMessage}/>
        </div>
      </div>
    </div>
  )
}

export default Chat