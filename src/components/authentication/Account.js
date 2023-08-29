import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { UserAuth } from "../../contexts/AuthContext";
import ContainerBox from './ContainerBox';
import { Button, Card, Alert } from 'react-bootstrap'

const Account = () => {

  const [error, setError] = useState('');

  const {user, logout} = UserAuth();

  const navigate = useNavigate();

  const handleLogout = async () => {
    setError('')

    try {
      await logout()
      navigate('/login')
    } catch {
      setError('Failed to logout')
    }
  }


  return (
    <ContainerBox>
      <Card>
        <Card.Body>
          <h2 className="text-center font-bold mb-4">Account</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <strong>Email:</strong> {user.email}
          <Link to='/update-account'>  
          <Button className="w-100 mt-4" type='submit'>Update Account</Button>
        </Link>
        </ Card.Body>
      </ Card>
      <Button onClick={handleLogout} className="w-100 mt-4" type='submit'>Log Out</Button>
    </ContainerBox>
  )
}

export default Account