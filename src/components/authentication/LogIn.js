import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserAuth } from "../../contexts/AuthContext";
import ContainerBox from "./ContainerBox";
import { Form, Button, Card, Alert } from 'react-bootstrap'

const LogIn = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false)

  const {login} = UserAuth();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setError('')
      setLoading(true)
      await login(email, password)
      navigate('/')
    } catch {
      setError('Failed to log in')
    }
  } 

  return (
    <ContainerBox>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Log in to your account</h2>
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
            <Button disabled={loading} className="w-100 mt-4" type='submit'>Log In</Button>
          </Form>
          <div className="mt-3 mb-2">
            <Link to='/forgot-password'>Forgot Password?</Link>
          </div>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Don't have an account yet? <Link to='/signup' className='underline'>Sign up</Link>
      </div>
    </ContainerBox>
  )
}

export default LogIn