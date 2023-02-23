import React from "react";
import {  BrowserRouter as Router,Routes,Route, } from "react-router-dom";
import CreatePost from "./components/CreatePost";
import UpdatePost from "./components/UpdatePost";
import Home from "./components/Home";
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from "./components/Login";

function App() {

  return (
    <Router>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">Go Plus</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/create">Create</Nav.Link> 
          
          </Nav>
        </Container>
      </Navbar>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<CreatePost />} />
        <Route path="/login" element={<Login />} />
        <Route path="/edit/:postId" element={<UpdatePost />} />
      </Routes>
    </Router>
  );
}

export default App;
