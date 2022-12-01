import React, { useContext, useState } from "react";
import { Alert, Card, Form, Image, InputGroup } from "react-bootstrap";
import { socket, Store } from "../context/userContext";
import ScrollToBottom from "react-scroll-to-bottom";
import { BiSend } from "react-icons/bi";
import { useSelector } from "react-redux";
import UserImg from "../assets/user.jpg";

const Chat = () => {
  const user = useSelector(state => state.user);
  const { currentRoom, privateRoom, messages, setMessages } = useContext(Store);
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const roomId = currentRoom;
    socket.emit("message-room", roomId, message, user);
    setMessage("");
  }

  socket.off("room-messages").on("room-messages", (roomMessages) => {
    console.log(roomMessages);
    setMessages(roomMessages);
  })

  return (
    <Card style={{position: "relative", height: "90vh"}}>
      <Card.Body >      
        <div>
          {!privateRoom ? (
            <Alert variant="success">You are in {currentRoom} room. </Alert>
          ) : (
            <Alert variant="success">
              <Image src={privateRoom.image || UserImg} alt="" className="img-thumbnail rounded-circle" style={{width: "50px", height: "50px"}}/>
              <span className="h6 ms-3">{privateRoom.name}</span>
            </Alert>
          )}
          <ScrollToBottom>
            <div style={{height: "75vh"}}>

            
            {user && messages.map(message => (
              <div key={message._id}>
                {/* <Alert variant="success">{message._id.substring(0, 10)}</Alert> */}
                {message.messagesByDate?.map(text => (
                  <div key={text._id}>
                    <div className={`d-flex ${text.from._id === user._id && "justify-content-start flex-row-reverse"}`}>
                      <Image src={text.from.image} className="img-thumbnail rounded-circle" style={{width: "50px", height: "50px"}} />
                      <Alert variant="primary" style={{width: "fit-content"}}>
                        <p>{text.content}</p>
                        <small style={{fontSize: "12px"}}>{message._id.substring(11, 16)}</small>
                      </Alert>
                    </div>
                  </div>
                ))}
              </div>
            ))}
            </div>
          </ScrollToBottom>
          <div className="w-100" style={{position: "absolute", bottom: "0", right: 0}}>

            <Form onSubmit={handleSubmit}>
              <InputGroup>
                <Form.Control type="text" placeholder="Message..." value={message} onChange={(e) => setMessage(e.target.value)} />
                <InputGroup.Text>
                  <BiSend className="text-primary"/>
                </InputGroup.Text>
              </InputGroup>
            </Form>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default Chat;
