import React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../assets/css/Home.css";

const AdminPage = () => {
  return (
    <Container className="margin-top">
      <h2>Welcome to the Admin Panel</h2>
      <Row className="mt-4">
        <Col>
          <h4>Manage Quizzes</h4>
          <Link to="/quizzes" className="btn btn-primary space">
            View Quizzes
          </Link>
          <Link to="/create" className="btn btn-success ml-2">
            Create Quiz
          </Link>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminPage;
