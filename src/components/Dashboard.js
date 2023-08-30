import { useParams } from 'react-router-dom';
import { useFolder } from '../hooks/useFolder';
import { Badge, Container } from 'react-bootstrap';
import AddFolderButton from './AddFolderButton';
import AddFileButton from "./AddFileButton";
import Folder from './Folder';
import FolderBreadcrumbs from './FolderBreadcrumbs';
import File from './File';

const Dashboard = () => {
  const { folderId } = useParams();
  const { folder, childFolders, childFiles } = useFolder(folderId);

  return (
    <>
      <Container fluid>
        <div
          className="d-flex align-items-center justify-content-between gap-3"
          style={{ marginTop: "10px" }}
        >
          <FolderBreadcrumbs currentFolder={folder} />
          <AddFileButton currentFolder={folder} />
          <AddFolderButton currentFolder={folder} />
        </div>
        {childFolders.length > 0 ? (
          <>
            <Badge className="bg-secondary mb-3">
              <p
                style={{
                  textTransform: "uppercase",
                  display: "inline-block",
                  margin: 0,
                  padding: "10px",
                  fontSize: "20px",
                }}
              >
                <span>Folders</span>
              </p>
            </Badge>
            <div className="d-flex flex-wrap">
              {childFolders.map((childFolder) => (
                <div
                  key={childFolder.id}
                  style={{ maxWidth: "250px" }}
                  className="p-2"
                >
                  <Folder folder={childFolder} />
                </div>
              ))}
            </div>
          </>
        ) : null}
        {childFolders.length > 0 && childFiles.length > 0 && (
          <>
            <hr />
            <Badge className="bg-secondary mb-3">
              <p
                style={{
                  textTransform: "uppercase",
                  display: "inline-block",
                  margin: 0,
                  padding: "10px",
                  fontSize: "15px",
                }}
              >
                <span>Files</span>
              </p>
            </Badge>
          </>
        )}
        {childFiles.length > 0 ? (
          <div className="d-flex flex-wrap">
            {childFiles.map((childFile) => (
              <div
                key={childFile.id}
                style={{ maxWidth: "250px" }}
                className="p-2"
              >
                <File file={childFile} currentFolder={folder} />
              </div>
            ))}
          </div>
        ) : null}
      </Container>
    </>
  );
}

export default Dashboard