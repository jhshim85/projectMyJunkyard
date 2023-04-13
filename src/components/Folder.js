import React, {useEffect, useState} from 'react'
import { Button } from 'react-bootstrap'
import { Link, useParams } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileUpload, faFile } from '@fortawesome/free-solid-svg-icons'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { db } from '../firebase'
import { updateDoc, doc, onSnapshot, collection } from 'firebase/firestore'

const Folder = () => {

  const storage = getStorage();
  let params = useParams();
  const collectionRef = collection(db, 'folders')
  const dbRef = doc(db, 'folders', params?.folderName)
  const [folders, setFolders] = useState([])

  const getFile = (e) => {
    const fileRef = ref(storage, e.target.files[0].name);
    // getDownloadURL(fileRef)
    //   .then((url)=>{
    //     console.log(url);
    //   })
    //   .catch((e)=>{
    //     switch (e.code) {
    //       case 'storage/object-not-found':
    //         break;
    //       case 'storage/unauthorized':
    //         break;
    //       case 'storage/canceled':
    //         break;
    //       case 'storage/unkown':
    //         break;
    //     }
    //   })
    const uploadTask = uploadBytesResumable(fileRef, e.target.files[0]);

    uploadTask.on('state_changed', 
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
        }
    }, (e) => {
      console.log(e.message);
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        updateDoc(dbRef, {
          fileLink: [downloadURL]
        })
      });
    }
    )
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
      <label className='btn btn-outline-success btn-lg' style={{margin: '10px'}}>
        <FontAwesomeIcon icon={faFileUpload} />
        <input type="file" style={{opacity: 0, position: "absolute", left: "-9999px"}}
        onChange={getFile}/>
      </label>
      {
        folders.map((folder) => {
          return (
              <div className="d-inline-flex flex-row align-items-center" style={{marginRight: "10px", marginLeft: "10px"}} key={folder.id}>    
                <Button variant="outline-dark" className="text-truncate w-100" as={Link} to={folder.fileLink}>
                  <FontAwesomeIcon icon={faFile} style={{marginRight: "10px"}}/>
                </Button>
              </div>
          )
      })
      }
    </>
  )
}

export default Folder