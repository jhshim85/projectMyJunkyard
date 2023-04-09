import React from 'react'
import { Form, Button, Card, Alert } from 'react-bootstrap'
import { Link } from 'react-router-dom';

function Account() {
  return (
    <Card>
      <Card.Body>
        <h2 className="font-bold mb-4">Account</h2>
        <p>User Email:</p>
        <Link to='/'>  
          <Button className="w-100 mt-4" type='submit'>Log Out</Button>
        </Link>
      </ Card.Body>
    </ Card>
  )
}

export default Account