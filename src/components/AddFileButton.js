import { useState } from "react";
import { createPortal } from "react-dom";
import { v4 as uuidv4 } from "uuid";
import { db, storage } from "../firebase";
import { getDownloadURL, ref, uploadBytes, uploadBytesResumable } from "firebase/storage";
import { addDoc, collection, serverTimestamp, onSnapshot, query, where, updateDoc, getDoc } from 'firebase/firestore';
import { UserAuth } from "../contexts/AuthContext";
import { ROOT_FOLDER } from "../hooks/useFolder";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileUpload } from "@fortawesome/free-solid-svg-icons";
import { ProgressBar, Toast } from "react-bootstrap";

const AddFileButton = ({ currentFolder }) => {

  const [ uploadingFiles, setUploadingFiles ] = useState([])

  const { user } = UserAuth();

  const handleUpload = (e) => {
    const file = e.target.files[0]
    if (currentFolder == null || file == null) return

    const id = uuidv4();

    setUploadingFiles(prevUploadingFiles => [
      ...prevUploadingFiles,
      {
        id: id,
        name: file.name,
        progress: 0,
        error: false,
      }
    ])

    const parentPath =
      currentFolder.path.length > 0
      ? currentFolder.path
        .map( (path) => {
          return (
            `${path.name}`
          )
        }).join("/")
      : ""

    const filePath =
      currentFolder === ROOT_FOLDER
        ? `${parentPath}/${file.name}`
        : `${parentPath}/${currentFolder.name}/${file.name}`;
    console.log(filePath);

    const storageRef = ref(storage, `/files/${user.uid}/${filePath}`)
    const uploadTask = uploadBytesResumable(storageRef, file)

    uploadTask.on('state_changed',
      (snapshot) => {
        const progress = snapshot.bytesTransferred / snapshot.totalBytes;

        setUploadingFiles(prevUploadingFiles => {
          return prevUploadingFiles.map((uploadFile) => {
            if (uploadFile.id === id) {
              return { ...uploadFile, progress: progress}
            }
            return uploadFile
          })
        })
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
        setUploadingFiles((prevUploadingFiles) => {
          return prevUploadingFiles.map((uploadFile) => {
            if (uploadFile.id === id) {
              return { ...uploadFile, error: true };
            }
            return uploadFile;
          });
        });
      },
        () => {
          setUploadingFiles(prevUploadingFiles => {
            return prevUploadingFiles.filter(uploadFile => {
              return uploadFile.id !== id
            });
          });

          getDownloadURL(uploadTask.snapshot.ref).then((url) => {

            const updateFile = async () => {
              const dbQuery = query(
                collection(db, "files"),
                where("name", "==", file.name),
                where("userId", "==", user.uid),
                where("folderId", "==", currentFolder.id)
              );
              const dbGetDoc = await getDoc(dbQuery);
              console.log(dbGetDoc);
              // const existingFile = dbGetDoc.docs[0];
              // console.log(existingFile);
              // if (existingFile) {
              //   updateDoc(dbQuery, { url: url });
              // } else {
              //   addDoc(collection(db, "files"), {
              //     url: url,
              //     name: file.name,
              //     createdAt: serverTimestamp(),
              //     folderId: currentFolder.id,
              //     userId: user.uid,
              //   });
              // }
            }
            updateFile();
            // updateDoc(dbQuery, {url: url})
            // .then( existingFiles => {
            //   console.log('updated');
            //   const existingFile = existingFiles.docs[0]
            //   if (existingFile) {
                
            //   }
            // })
            // .catch(e => {
            //   console.log(e);
            // })

            // addDoc(collection(db, 'files'), {
            //   url: url,
            //   name: file.name,
            //   createdAt: serverTimestamp(),
            //   folderId: currentFolder.id,
            //   userId: user.uid
            // })
            console.log('File available at', url);
          })
        }
      )
  }
  
  return (
    <>
      <label className="btn btn-outline-success btn-lg m-0 mr-2">
        <FontAwesomeIcon icon={faFileUpload} />
        <input
          type="file" onChange={handleUpload}
          style={{ opacity: 0, position: "absolute", left: "-99999px" }}
        />
      </label>
      {
        uploadingFiles.length > 0 &&
        createPortal(
          <div style={{position: 'absolute', bottom: '1rem', right: '1rem', maxWidth: '250px'}}>
            {
              uploadingFiles.map((file) => {
                return (
                  <Toast key={file.id}
                    onClose={() => {
                      setUploadingFiles((prevUploadingFiles) => {
                        return prevUploadingFiles.filter((uploadFile) => {
                          return uploadFile.id !== file.id;
                        });
                      });
                    }}
                  >
                    <Toast.Header className="text-truncate w-100 d-block">
                      {file.name}
                    </Toast.Header>
                    <Toast.Body>
                      <ProgressBar
                        animated={!file.error}
                        variant={file.error ? 'danger' : 'primary'}
                        now={file.error ? 100 : file.progress * 100}
                        label={
                          file.error
                            ? "Error"
                            : `${Math.round(file.progress * 100)}%`
                        }
                      />
                    </Toast.Body>
                  </Toast>
                )
              })
            }
          </div>
          ,document.body
        )
      }
    </>
  );
};

export default AddFileButton;