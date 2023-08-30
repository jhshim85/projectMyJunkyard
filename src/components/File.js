import { useState } from 'react';
import { db, storage } from '../firebase';
import { deleteDoc, doc } from 'firebase/firestore';
import { deleteObject, ref } from 'firebase/storage';
import { UserAuth } from '../contexts/AuthContext';
import { ROOT_FOLDER } from '../hooks/useFolder';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFile, faClose } from '@fortawesome/free-solid-svg-icons';
import { Button, Collapse } from 'react-bootstrap';

const File = ({file, currentFolder}) => {
  
  const [open, setOpen] = useState(false);

  const { user } = UserAuth();

  const fileSizeString = (fileSize) => {
    let i = -1;
    const byteUnits = [" kB", " MB", " GB", " TB", "PB", "EB", "ZB", "YB"];
    do {
      fileSize = fileSize / 1024;
      i++;
    } while (fileSize > 1024);
    return Math.max(fileSize, 0.1).toFixed(1) + byteUnits[i];
  };

  const handleClick = () => {
    if (file.name == null) return;

    const parentPath =
      currentFolder.path.length > 0
        ? currentFolder.path
            .map((path) => {
              return `${path.name}`;
            })
            .join("/")
        : "";

    const filePath =
      currentFolder === ROOT_FOLDER
        ? `${parentPath}/${file.name}`
        : `${parentPath}/${currentFolder.name}/${file.name}`;

    const storageRef = ref(storage, `/files/${user.uid}/${filePath}`);
    
    const fileDelete = async () => {
      await deleteDoc(doc(db, "files", file.id))
    };
    fileDelete();
    deleteObject(storageRef).then(()=>{
      console.log('File deleted');
    }).catch((e) => {
      console.log(e.message);
    })
  };

  return (
    <>
      <Button
        className="text-truncate w-100"
        type="button"
        onClick={() => setOpen(!open)}
        aria-controls="collapseContainer"
        aria-expanded={open}
        variant="outline-dark"
      >
        <FontAwesomeIcon icon={faFile} className="me-2" />
        {file.name}
      </Button>
      <Collapse in={open}>
        <div className="collapse" id="collapseContainer">
          <div className="card card-body">
            <a
              href={file.url}
              target="_blank"
              rel="noreferrer"
              className="btn btn-outline-dark text-truncate w-100"
            >
              Download({fileSizeString(file.size)})
            </a>
            <Button
              className="text-truncate w-100"
              type="button"
              onClick={handleClick}
              variant="outline-dark"
            >
              <FontAwesomeIcon icon={faClose} className="me-2" />
              Delete
            </Button>
          </div>
        </div>
      </Collapse>
    </>
  );
}

export default File