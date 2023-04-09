import React, { useRef, useState } from 'react'
import { Form, Button, Card, Alert } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const LogIn = () => {
  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Log in to your account</h2>
          {/* {error && <Alert variant="danger">{error}</Alert>} */}
          <Form>
            <Form.Group id='email'>
              <Form.Label>Email</Form.Label>
              <Form.Control type='email' required />
            </Form.Group>
            <Form.Group id='password'>
              <Form.Label>Password</Form.Label>
              <Form.Control type='password' required />
            </Form.Group>
            {/* <Form.Group id='password-confirm'>
              <Form.Label>Password Confirmation</Form.Label>
              <Form.Control type='password' required />
            </Form.Group> */}
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