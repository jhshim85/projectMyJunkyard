import React, { useRef, useState } from 'react'
import { Form, Button, Card, Alert } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { UserAuth } from '../contexts/AuthContext';

const LogIn = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const {login} = UserAuth();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      await login(email, password)
      navigate('/account')
    } catch (e) {
      setError(e.message)
      console.log(e.message);
    }
  } 

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Log in to your account</h2>
          {/* {error && <Alert variant="danger">{error}</Alert>} */}
          <Form onSubmit={handleSubmit}>
            <Form.Group id='email'>
              <Form.Label>Email</Form.Label>
              <Form.Control type='email' required onChange={(e)=>setEmail(e.target.value)}/>
            </Form.Group>
            <Form.Group id='password'>
              <Form.Label>Password</Form.Label>
              <Form.Control type='password' required onChange={(e)=>setPassword(e.target.value)}/>
            </Form.Group>
            <Button className="w-100 mt-4" type='submit'>Log In</Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Don't have an account yet? <Link to='/signup' className='underline'>Sign up</Link>
      </div>
    </>
  )
}

export default LogIn