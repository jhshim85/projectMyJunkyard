import { Button, Modal, Form, Alert } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileUpload } from "@fortawesome/free-solid-svg-icons";

const AddFile = ({currentFolder}) => {
  return (
    <>
      <label className="btn btn-outline-success btn-lg m-0 mr-2">
        <FontAwesomeIcon icon={faFileUpload}/>
        <input
          type="file"
          style={{opacity: 0, position: 'absolute', right: '0'}} />
      </label>
    </>
  )
}

export default AddFile