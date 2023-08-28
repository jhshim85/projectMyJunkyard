import { Container } from 'react-bootstrap';
import { useFolder } from '../hooks/useFolder';
import AddFolderButton from './AddFolderButton';
import AddFile from './AddFile';
import Folder from './Folder';
import FolderBreadcrumbs from './FolderBreadcrumbs';
import { useParams } from 'react-router-dom';

const Dashboard = () => {
  const { folderId } = useParams();
  const { folder, childFolders } = useFolder(folderId);

  return (
    <>
      <Container fluid>
        {/* <AddFile  /> */}
        <div className="d-flex align-items-center">
          <FolderBreadcrumbs currentFolder={folder} />
          <AddFolderButton currentFolder={folder} />
        </div>
        {
        childFolders.length > 0
        ?
        (
          <div className="d-flex flex-wrap">
            {childFolders.map(childFolder => 
              <div key={childFolder.id} style={{maxWidth: '250px'}} className='p-2'>
                <Folder folder={childFolder}/>
              </div>
            )}
          </div>
        )
        : null}
      </Container>
    </>
  );
}

export default Dashboard