import React from 'react'
import { Navbar, Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const NavMenu = () => {
  return (
    <Navbar bg='light' className='d-flex align-items-center justify-content-between'>
      <Navbar.Brand as={Link} to='/' className='m-3'>
        My Junkyard
      </Navbar.Brand>
      <Nav>
        <Nav.Link as={Link} to='/account' className='m-3'>
          Account
        </Nav.Link>
      </Nav>
    </Navbar>
  )
}

export default NavMenu