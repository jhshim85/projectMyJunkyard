import { Link } from 'react-router-dom'
import { Navbar, Nav } from 'react-bootstrap'

const NavMenu = () => {
  return (
    <Navbar bg='light' className='d-flex align-items-center justify-content-between'>
      <Navbar.Brand as={Link} to='/' className='m-3 mx-5'>
        My Junkyard
      </Navbar.Brand>
      <Nav>
        <Nav.Link as={Link} to='/account' className='m-3 mx-5'>
          Account
        </Nav.Link>
      </Nav>
    </Navbar>
  )
}

export default NavMenu