import {useEffect, useState} from 'react'
import { Link, useParams } from 'react-router-dom'
import { db } from '../firebase'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { updateDoc, doc, onSnapshot, collection } from 'firebase/firestore'
import { Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileUpload, faFile, faFolder } from '@fortawesome/free-solid-svg-icons'

const Folder = ({folder}) => {
  return (
    <Button as={Link} to={`/folder/${folder.id}`} variant="outline-dark" className='text-truncate w-100'>
      <FontAwesomeIcon icon={faFolder} className="me-2"/>{folder.name}
    </Button>
  );
}

export default Folder