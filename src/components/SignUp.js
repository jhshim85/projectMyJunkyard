import React, { useRef, useState } from 'react'
import { Form, Button, Card, Alert } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom';
import { UserAuth } from '../contexts/AuthContext';

const SignUp = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const {createUser} = UserAuth();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      await createUser(email, password)
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
          <h2 className="text-center mb-4">Sign up new account</h2>
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
            {/* <Form.Group id='password-confirm'>
              <Form.Label>Password Confirmation</Form.Label>
              <Form.Control type='password' required />
            </Form.Group> */}
            <Button className="w-100 mt-4" type='submit'>Sign Up</Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Already have an account? <Link to='/' className='underline'>Log In</Link>
      </div>
    </>
  )
}

export default SignUp;