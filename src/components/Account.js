import React from 'react'
import { Form, Button, Card, Alert } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom';
import { UserAuth } from '../contexts/AuthContext';

function Account() {

  const {user, logout} = UserAuth();

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout()
      navigate('/')
    } catch (e) {
      console.log(e.message);
    }
  }

  return (
    <Card>
      <Card.Body>
        <h2 className="font-bold mb-4">Account</h2>
        <p>User Email: {user && user.email}</p>
        <Link to='/'>  
          <Button onClick={handleLogout} className="w-100 mt-4" type='submit'>Log Out</Button>
        </Link>
      </ Card.Body>
    </ Card>
  )
}

export default Account