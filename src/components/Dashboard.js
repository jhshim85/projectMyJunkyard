import { Container } from 'react-bootstrap';
import { useFolder } from '../hooks/useFolder';
import AddFolderButton from './AddFolderButton';
import AddFile from './AddFile';

const Dashboard = () => {

  const { folder } = useFolder()

  return (
    <>
      <Container fluid>
        <AddFile currentFolder={folder} />
        <AddFolderButton currentFolder={folder} />
      </Container>
    </>
  );
}

export default Dashboard