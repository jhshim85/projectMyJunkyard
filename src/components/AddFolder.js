import React, { useState, useEffect } from 'react'
import { Button, Modal, Form, Alert } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFolderPlus, faFolderOpen } from '@fortawesome/free-solid-svg-icons'
import { db } from '../firebase'
import { addDoc, collection, serverTimestamp, onSnapshot } from 'firebase/firestore'
import { UserAuth } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'

const AddFolder = ({currentFolder}) => {

  const [access, setAccess] = useState(false)
  const [folderName, setFolderName] = useState('')
  const [message, setMessage] = useState('')
  const [folders, setFolders] = useState([])
  const { user } = UserAuth();

  const collectionRef = collection(db, 'folders')

  const openModal = () => {
    setAccess(true)
    setMessage('')
  }
  const closeModal = () => {
    setAccess(false)
    setMessage('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (currentFolder == null) return

    const folderUpload = () => {
      addDoc(collectionRef, {
        name: folderName,
        // parentId: currentFolder.id,
        userId: user.uid,
        createdAt: serverTimestamp()
      })
      .then(() => {
        setFolderName('')
        closeModal()
      })
      .catch(e=> {
        alert(e.message)
      })
    }
    folderUpload();
    setMessage('Folder Added')
    // try {
    //   const docRef = await addDoc(collection(db, 'folders'), {
    //     name: folderName,
    //     parentId: currentFolder.id,
    //     userId: user.uid,
    //     // path,
    //     createdAt: serverTimestamp()
    //   });
    // } catch (e) {
    //   console.log(e.message);
    // }
  }
  useEffect(() => {
    const readData = () => {
      onSnapshot(collectionRef, (data) => {
        setFolders(data.docs.map((doc)=>{
          return {...doc.data(), id: doc.id}
        }));
      })
    }
    readData();
  }, [])
  
  const navigate = useNavigate();

  const openFolder = (id) => {
    navigate(`/folder/${id}`)
  }

  return (
    <>
      <Button onClick={openModal} variant='outline-success' size='lg'>
        <FontAwesomeIcon icon={faFolderPlus} />
      </Button>
      <Modal show={access} onHide={closeModal}>
        {message && <Alert variant="success">{message}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group>
              <Form.Label>Folder Name</Form.Label>
              <Form.Control type='text' required value={folderName} onChange={(e)=>setFolderName(e.target.value)}/>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant='secondary' onClick={closeModal}>
              Close
            </Button>
            <Button variant='success' type='submit'>
              Add Folder
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
      {
        folders.map((folder) => {
          return (
            <div className="d-inline-flex flex-row align-items-center" style={{marginRight: "10px", marginLeft: "10px"}} key={folder.id}>
              <Button variant="outline-dark" className="text-truncate w-100" onClick={() => openFolder(folder.id)}>
                <FontAwesomeIcon icon={faFolderOpen} style={{marginRight: "10px"}}/>
                {folder.name}
              </Button>
            </div>
          )
      })
      }
    </>
  )
}

export default AddFolder