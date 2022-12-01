import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  InputGroup,
  Button,
  Card,
  Alert,
} from "react-bootstrap";
import { BiEnvelope, BiUser } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { socket } from "../context/userContext";
import { useSignInUserMutation } from "../services/UserApi";

const SignIn = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signInUser, { isLoading, error }] = useSignInUserMutation();

  const handleSignIn = (e) => {
    e.preventDefault();
      signInUser({ email, password }).then(({ data }) => {
        if (data) {
          socket.emit("new-user");
          navigate("/chat");
        }
      });
  };

  return (
    <Container>
      <div className="align-items-center d-flex" style={{ height: "80vh" }}>
        <Card>
          <Row>
            <Col md={6} sm={0}>
              <Card.Img
                src="https://images.unsplash.com/photo-1488509082528-cefbba5ad692?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
                alt=""
              />
            </Col>
            <Col md={6} sm={12} className="mt-5">
              <Card.Body>
                <h3 className="text-primary text-uppercase text-center">
                  Sign in
                </h3>
                {error && <Alert variant="danger">Incorrect Email or Password</Alert>}
                <Form onSubmit={handleSignIn}>
                  <InputGroup className="mb-2">
                    <InputGroup.Text>
                      <BiEnvelope />
                    </InputGroup.Text>
                    <Form.Control
                      type="email"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </InputGroup>
                  <InputGroup className="mb-2">
                    <InputGroup.Text>
                      <BiUser />
                    </InputGroup.Text>
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </InputGroup>
                  <div className="float-end">
                    Don't have an account? <Link to="/signUp">SignUp</Link>
                    <Button
                      variant="primary"
                      className="mb-2 ms-2"
                      type="submit"
                    >
                      {isLoading ? "Signing In..." : "Sign In"}
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Col>
          </Row>
        </Card>
      </div>
    </Container>
  );
};

export default SignIn;
