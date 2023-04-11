import React, { useState } from 'react'
import { Form, Button, Card, Alert } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import { UserAuth } from '../contexts/AuthContext';

const ForgotPassword = () => {

  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('')

  const {resetPassword} = UserAuth();

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setMessage('')
      setError('')
      setLoading(true)
      await resetPassword(email)
      setMessage('Check your inbox for password reset instructions')
    } catch {
      setError('Failed to reset password')
    }
  } 

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Reset your password</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          {message && <Alert variant="success">{message}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id='email'>
              <Form.Label>Email</Form.Label>
              <Form.Control type='email' required onChange={(e)=>setEmail(e.target.value)}/>
            </Form.Group>
            <Button disabled={loading} className="w-100 mt-4" type='submit'>Reset Password</Button>
          </Form>
          <div className="mt-3 mb-2">
            <Link to='/login'>Log In</Link>
          </div>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Don't have an account yet? <Link to='/signup' className='underline'>Sign up</Link>
      </div>
    </>
  )
}

export default ForgotPassword