import React, { useState } from 'react'
import { Form, Button, Card, Alert } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom';
import { UserAuth } from '../contexts/AuthContext';

const UpdateAccount = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false)
  // const [res, setRes] = useState()

  const { user, updateUserEmail, updateUserPassword } = UserAuth();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (password !== passwordConfirm) {
      return setError('Passwords do not match')
    }
    // try {
    //   setError('')
    //   setLoading(true)
    // await updateEmail(email)
    //   navigate('/')
    // } catch {
    //   setError('Failed to update an email')
    // }
    // setLoading(false)
    // setRes()
    // await updateEmail(email).then((res) => {
    //   setRes('Email updated Successfully')
    // }).catch ((err) => {
    //   setError('failed to update an email')
    // })

    const promises = []

    setLoading(true)
    setError('')

    if (email !== user.email) {
      promises.push(updateUserEmail(email))
    }
    if (password !== user.password) {
      promises.push(updateUserPassword(password))
    }

    Promise.all(promises).then(()=>{
      navigate('/')
    }).catch(()=>{
      setError('Failed to update account')
    }).finally(()=>{
      setLoading(false)
    })
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Update your account</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id='email'>
              <Form.Label>Email</Form.Label>
              <Form.Control type='email' required defaultValue={user.email} onChange={(e)=>setEmail(e.target.value)}/>
            </Form.Group>
            <Form.Group id='password'>
              <Form.Label>Password</Form.Label>
              <Form.Control type='password' placeholder="Leave blank to keep the same" onChange={(e)=>setPassword(e.target.value)}/>
            </Form.Group>
            <Form.Group id='password-confirm'>
              <Form.Label>Password Confirmation</Form.Label>
              <Form.Control type='password' placeholder="Leave blank to keep the same" onChange={(e)=>setPasswordConfirm(e.target.value)}/>
            </Form.Group>
            <Button disabled={loading} className="w-100 mt-4" type='submit'>Update</Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        <Link to='/' className='underline'>Cancel</Link>
      </div>
    </>
  )
}

export default UpdateAccount