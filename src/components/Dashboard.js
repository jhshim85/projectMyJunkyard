import React from 'react'
import { Container } from 'react-bootstrap'
import AddFolder from './AddFolder'
import { useFolder } from '../hooks/useFolder'

const Dashboard = () => {

  const { folder } = useFolder()

  return (
    <>
      <Container fluid>
        <AddFolder currentFolder={folder}/>
      </Container>
    </>
  )
}

export default Dashboard