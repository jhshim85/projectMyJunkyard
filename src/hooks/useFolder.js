import { useReducer, useEffect } from 'react'
import { db } from '../firebase'

const ACTIONS = {
  SELECT_FOLDER: 'select-folder',
  UPDATE_FOLDER: 'update-folder',
  SET_CHILD_FOLDERS: 'set-child-folders',
  SET_CHILD_FILES: 'set-child-files',
}

export const ROOT_FOLDER = {name: 'Root', id: null, path: []}

const reducer = (state, {type, payload}) => {
  switch (type) {
    case ACTIONS.SELECT_FOLDER:
      return {
        ...state,
        folderId: payload.folderId || null,
        folder: payload.folder,
        childFolders: [],
        childFiles: [],
      };
    case ACTIONS.UPDATE_FOLDER:
      return {
        ...state,
        folder: payload.folder
      }
    case ACTIONS.SET_CHILD_FOLDERS:
      return {
        ...state,
        childFolder: payload.childFolders
      }
    case ACTIONS.SET_CHILD_FILES:
      return {
        ...state,
        childFiles: payload.childFiles
      }
    default:
      return state
  }
}

export const useFolder = (folderId = null, folder) => {

  const [state, dispatch] = useReducer(reducer, {
    folderId,
    folder,
    childFolders: [],
    childFiles: []
  })

  useEffect(() => {
    dispatch({type: ACTIONS.SELECT_FOLDER, payload: {folder, folderId}})
  },[folderId, folder])

  useEffect(() => {
    if (folderId == null) {
      return dispatch({
        type: ACTIONS.UPDATE_FOLDER,
        payload: {folder: ROOT_FOLDER}
      })
    }

    db.folders.doc(folderId).get().then(doc => {
      const formattedDoc = {
        id: doc.id,
        ...doc.data(),
      }
      dispatch({
        type: ACTIONS.UPDATE_FOLDER,
        payload: {folder: db.formattedDoc(doc)}
      })
      console.log(doc.id);
    }).catch(() => {
      dispatch({
        type: ACTIONS.UPDATE_FOLDER,
        payload: {folder: ROOT_FOLDER}
      })
    })
  },[folderId])

  // useEffect(() => {
  //   return db.folders.where("parentId", "===", folderId).orderBy("createdAt").onSnapShot(snapshot => {
  //     const formattedDoc = {
  //       id: snapshot.doc.id,
  //       ...snapshot.doc.data(),
  //     };
  //     dispatch ({
  //       type: ACTIONS.SET_CHILD_FOLDERS,
  //       payload: {childFolder: snapshot.docs.map(db.formattedDoc)}
  //     })
  //   })
  // }, [folderId])

  // useEffect(() => {
  //   return db.files.where("parentId", "===", folderId).orderBy("createdAt").onSnapShot(snapshot => {
  //     const formattedDoc = {
  //       id: snapshot.doc.id,
  //       ...snapshot.doc.data(),
  //     };
  //     dispatch ({
  //       type: ACTIONS.SET_CHILD_FILES,
  //       payload: {childFiles: snapshot.docs.map(db.formattedDoc)}
  //     })
  //   })
  // }, [folderId])

  return (
    state
  )
}

// export default useFolder