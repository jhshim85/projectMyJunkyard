import { Link } from 'react-router-dom'
import { db } from '../firebase'
import { doc, deleteDoc } from 'firebase/firestore'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFolder, faClose } from '@fortawesome/free-solid-svg-icons'
import { Button } from 'react-bootstrap'

const Folder = ({folder}) => {

  const handleClick = () => {
    if (folder.id == null) return;

    const folderDelete = async () => {
      await deleteDoc(doc(db, "folders", folder.id));
    };
    folderDelete();
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "5px",
      }}
    >
      <Button
        as={Link}
        to={`/folder/${folder.id}`}
        variant="outline-dark"
        className="text-truncate w-100"
      >
        <FontAwesomeIcon icon={faFolder} style={{ marginRight: "5px" }} />
          {folder.name}
      </Button>
      <div
        onClick={handleClick}
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          margin: 0,
          cursor: "pointer",
        }}
      >
        <FontAwesomeIcon icon={faClose} />
        <p
          style={{
            fontSize: "10px",
            display: "inline-block",
            margin: 0,
          }}
        >
          Delete
        </p>
      </div>
    </div>
  );
}

export default Folder