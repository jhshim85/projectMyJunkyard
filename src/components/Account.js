import React, { useState } from 'react'
import { Button, Card, Alert } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom';
import { UserAuth } from '../contexts/AuthContext';

const Dashboard = () => {

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
    <>
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
      {/* <Link to='/'>   */}
        <Button onClick={handleLogout} className="w-100 mt-4" type='submit'>Log Out</Button>
      {/* </Link> */}
    </>
  )
}

export default Dashboard