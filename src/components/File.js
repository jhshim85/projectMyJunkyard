import { Link, useParams } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileUpload, faFile, faFolder } from '@fortawesome/free-solid-svg-icons'

const File = ({file}) => {
  return (
    <a
      href={file.url}
      target="_blank"
      className="btn btn-outline-dark text-truncate w-100"
    >
      <FontAwesomeIcon icon={faFile} className="me-2" />
      {file.name}
      <p>{file.id}</p>
    </a>
  );
}

export default File