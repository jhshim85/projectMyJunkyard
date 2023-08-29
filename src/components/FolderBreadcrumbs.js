import { Link } from "react-router-dom";
import { ROOT_FOLDER } from "../hooks/useFolder";
import { Breadcrumb } from "react-bootstrap";

const FolderBreadcrumbs = ({ currentFolder }) => {

  let path = currentFolder === ROOT_FOLDER ? [] : [ROOT_FOLDER]
  if (currentFolder) path = [...path, ...currentFolder.path]

  return (
    <Breadcrumb
      className="flex-grow-1"
      listProps={{ className: "bg-white p-3 m-0" }}
    >
      {[...path].map((folder, index) => {
        return (
          <Breadcrumb.Item
            key={folder.id}
            className="text-truncate d-inline-block"
            style={{ maxWidth: "150px" }}
            linkAs={Link}
            linkProps={{
              to: {
                pathname: folder.id ? `/folder/${folder.id}` : "/",
              },
            }}
          >
            {folder.name}
          </Breadcrumb.Item>
        );
      })}
      {currentFolder && (
        <Breadcrumb.Item
          className="text-truncate d-inline-block"
          style={{ maxWidth: "200px" }}
          active
        >
          {currentFolder.name}
        </Breadcrumb.Item>
      )}
    </Breadcrumb>
  );
};

export default FolderBreadcrumbs