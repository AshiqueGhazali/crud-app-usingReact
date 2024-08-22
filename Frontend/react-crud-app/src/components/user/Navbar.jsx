import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { logout } from '../../redux/Store';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";




const UserNav = () => {

  const navigate = useNavigate('')
  const dispatch = useDispatch()


  const handleLogout = ()=>{
    localStorage.removeItem('user')
    dispatch(logout())
    navigate('/login')
  }


  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">CRUD</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/profile">Profile</Nav.Link>
          </Nav>
        </Container>
        <Row className='nav-btns'>
            <Col xs="auto">
                <Button onClick={handleLogout} type="submit" variant='outline-light' className='me-3'>Logout</Button>
            </Col>
            </Row>
      </Navbar>
    </>
  )
}

export default UserNav