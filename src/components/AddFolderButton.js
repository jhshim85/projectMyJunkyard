import { useState, useEffect } from 'react';
import { Button, Modal, Form, Alert } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolderPlus } from '@fortawesome/free-solid-svg-icons';
import { db } from '../firebase';
import { addDoc, collection, serverTimestamp, onSnapshot } from 'firebase/firestore';
import { UserAuth } from '../contexts/AuthContext';
import { ROOT_FOLDER } from '../hooks/useFolder';

const AddFolderButton = ({currentFolder}) => {

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

    const path = [...currentFolder.path]
    if (currentFolder !== ROOT_FOLDER) {
      path.push({name: currentFolder.name, id: currentFolder.id})
    }

    const folderUpload = () => {
      addDoc(collection(db, 'folders'), {
        name: folderName,
        userId: user.uid,
        parentId: currentFolder.id,
        path: path,
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
    </>
  )
}

export default AddFolderButton;