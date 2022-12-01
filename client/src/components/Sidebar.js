import React, { useContext, useEffect } from 'react'
import { Badge, Col, Image, ListGroup, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { socket, Store } from '../context/userContext';
import userImg from "../assets/user.jpg";
import { useNavigate } from 'react-router-dom'
import { addNotifications, resetNotifications } from '../redux/userSlice';
import axios from "axios";

const Sidebar = () => {
  const {user} = useSelector(state => state.user);
  console.log(user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { members, setMembers, rooms, setRooms, currentRoom, setCurrentRoom, privateRoom, setPrivateRoom} = useContext(Store);

  const getRooms = async () => {
    const {data} = await axios.get("http://localhost:5000/rooms");
    setRooms(data);
  }

  const joinRoom = (room, isPublic=true) => {
    if(!user) return navigate('/signIn');
    socket.emit("room", room, currentRoom);
    setCurrentRoom(room);

    if(isPublic) {
      setPrivateRoom(null);
    }

    dispatch(resetNotifications(room))
  }

  socket.off("notifications").on("notifications", (room) => {
    if(room !== currentRoom) dispatch(addNotifications(room))
  })

  socket.off("new-user").on("new-user", (payload) => {
    setMembers(payload);
  })

  const orderId = (id1, id2) => {
    if(id1 > id2) {
      return id1 + id2;
    } else {
      return id2 + id1;
    }
  }

  const privateRoomMsg = (member) => {
    setPrivateRoom(member);
    // console.log(privateRoom?.name);
    const roomId = orderId(member._id, user._id);
    joinRoom(roomId, false);
  }

  useEffect(() => {
    if(user) {
      setCurrentRoom("general");
      getRooms();
      socket.emit("room", "general");
      socket.emit("new-user");
    }
  },[]);

  return (
    <div>
      <ListGroup>
        <h3 className='my-3 text-primary'>Public</h3>
        {rooms.map((room, index) => (
          <ListGroup.Item key={index} onClick={() => joinRoom(room)} active={room === currentRoom} action>
            <Row>
              <Col md={10}>
                <span className='h6'>{room}</span>
              </Col>
              <Col md={2}>
              <Badge className="">{user.newMessages[room]}</Badge>
              </Col>
            </Row>
          </ListGroup.Item>
        ))}
      </ListGroup>
      <ListGroup>
        <h3 className='my-3 text-primary'>Members</h3>
        {user && members.map((member) => (
          <ListGroup.Item key={member._id} onClick={() => privateRoomMsg(member)} active={member._id === privateRoom?._id} disabled={member._id === user._id} action>
            <Row>
              <Col md={10}>
                <Image src={member.image || userImg} alt={member.name} className="rounded-circle img-thumbnail" style={{width: "50px", height: "50px"}} />
                <span className='h6 mx-3'>{member.name} {member._id === user._id && "(You)"}</span>
                <span className={member.status == "online" ? "text-success" : "text-warning"}>{member._id !== user._id && `(${member.status})`}</span>
              </Col>
              <Col md={2}>
                <Badge className="">{user.newMessages[orderId(member._id, user._id)]}</Badge>
              </Col>
            </Row>
          </ListGroup.Item>         
        ))}
      </ListGroup>
    </div>
  )
}

export default Sidebar