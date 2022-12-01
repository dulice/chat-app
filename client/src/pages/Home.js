import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Sidebar from "../components/Sidebar";
import Chat from "./Chat";

const Home = () => {
  return (
    <Container>
      <Row>
        <Col md={4}>
          <Sidebar />
        </Col>
        <Col md={8}>
          <Chat />
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
