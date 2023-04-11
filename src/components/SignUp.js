import React, { useState } from 'react'
import { Form, Button, Card, Alert } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom';
import { UserAuth } from '../contexts/AuthContext';
import ContainerBox from './ContainerBox';

const SignUp = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false)

  const {createUser} = UserAuth();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (password !== passwordConfirm) {
      return setError('Passwords do not match')
    }
    try {
      setError('')
      setLoading(true)
      await createUser(email, password)
      navigate('/')
    } catch {
      setError('Failed to create an account')
    }
    setLoading(false)
  }
  
  return (
    <ContainerBox>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Sign up new account</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id='email'>
              <Form.Label>Email</Form.Label>
              <Form.Control type='email' required onChange={(e)=>setEmail(e.target.value)}/>
            </Form.Group>
            <Form.Group id='password'>
              <Form.Label>Password</Form.Label>
              <Form.Control type='password' required onChange={(e)=>setPassword(e.target.value)}/>
            </Form.Group>
            <Form.Group id='password-confirm'>
              <Form.Label>Password Confirmation</Form.Label>
              <Form.Control type='password' required onChange={(e)=>setPasswordConfirm(e.target.value)}/>
            </Form.Group>
            <Button disabled={loading} className="w-100 mt-4" type='submit'>Sign Up</Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Already have an account? <Link to='/login' className='underline'>Log In</Link>
      </div>
    </ContainerBox>
  )
}

export default SignUp;