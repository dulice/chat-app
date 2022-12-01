import React, { useState } from 'react'
import User from '../assets/user.jpg';
import {
  Container,
  Row,
  Col,
  Form,
  InputGroup,
  Button,
  Card,
  FormGroup,
} from "react-bootstrap";
import { BiEnvelope, BiLock, BiUser } from "react-icons/bi";
import axios from "axios";
import { useSignupUserMutation } from '../services/UserApi';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const SignUp = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState(null);
  const [ previewImage, setPreviewImage] = useState(null);
  const [uploadingImg, setUploadingImg] = useState(false);
  const [signupUser, {isLoading, error}] = useSignupUserMutation();

  const validateImage = (e) => {
    const file = e.target.files[0];
    if(file.size >= 1048576) {
      return alert("Mac file size is 1mb.")
    }else {
      setImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  }

  const uploadImage = async () => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "cwemx3sl");
    try{
      setUploadingImg(true);
      const res = await axios.post("https://api.cloudinary.com/v1_1/grace26/image/upload", data);
      // console.log(res.data.url);
      setUploadingImg(false);
      return res.data.url;
    } catch (err) {
      setUploadingImg(false);
    }
  }

  const handleSignup = async (e) => {
    e.preventDefault();
    if(!image) return alert("Please upload an image");
    const imgURL = await uploadImage();

    //signup user
    signupUser({name, email, password, image: imgURL}).then(res => {
      if(res.data) {
        console.log(res.data);
        navigate('/signIn');
      }
    })
  }

  return (
    <Container>
      <div className="overflow-hidden" style={{ height: "90vh" }}>
        <Card>
          <Row>
            
            <Col md={6} sm={12} className="mt-5">
              <Card.Body>
                <h3 className="text-primary text-uppercase text-center">
                  Sign up
                </h3>
                <Form onSubmit={handleSignup}>
                  <FormGroup>
                    <Form.Label htmlFor='image' className="d-flex justify-content-center my-3">
                      <img src={previewImage || User} alt='' style={{width: "50px", height: "50px", borderRadius: "50%", objectFit: "center"}}/>
                    </Form.Label>
                    <Form.Control id='image' type='file' onChange={validateImage} hidden />
                  </FormGroup>
                  <InputGroup className="mb-2">
                    <InputGroup.Text>
                      <BiUser />
                    </InputGroup.Text>
                    <Form.Control type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
                  </InputGroup>
                  <InputGroup className="mb-2">
                    <InputGroup.Text>
                      <BiEnvelope />
                    </InputGroup.Text>
                    <Form.Control type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                  </InputGroup>
                  <InputGroup className="mb-2">
                    <InputGroup.Text>
                      <BiLock />
                    </InputGroup.Text>
                    <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                  </InputGroup>
                  <div className='float-end'>                   
                    Already have an account? <Link to="/signIn">SignIn</Link>
                    <Button variant="primary" className="mb-2 ms-2" type="submit">
                      {uploadingImg || isLoading ? "Signing Up..." : "Sign Up"}
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Col>
            <Col md={6} sm={0}>
              <Card.Img
                src="https://images.unsplash.com/photo-1522051311534-1f53d56b49df?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjN8fGNoYXR8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60"
                alt=""
              />
            </Col>
          </Row>
        </Card>
      </div>
    </Container>
  )
}

export default SignUp;