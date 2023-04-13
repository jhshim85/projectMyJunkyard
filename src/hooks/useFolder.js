import { useReducer, useEffect } from 'react'
import { db } from '../firebase'

const ACTIONS = {
  SELECT_FOLDER: 'select-folder',
  UPDATE_FOLDER: 'update-folder'
}

const ROOT_FOLDER = {name: 'Root', id: null, path: []}

const reducer = (state, {type, payload}) => {
  switch (type) {
    case ACTIONS.SELECT_FOLDER:
      return {
        folderId: payload.folderId,
        folder: payload.folder,
        childFiles: [],
        childFolders: []
      }
    case ACTIONS.UPDATE_FOLDER:
      return {
        ...state,
        folder: payload.folder
      }
    default:
      return state
  }
}

export const useFolder = (folderId = null, folder = null) => {

  const [state, dispatch] = useReducer(reducer, {
    folderId,
    folder,
    childFolders: [],
    childFiles: []
  })

  useEffect(() => {
    dispatch({type: ACTIONS.SELECT_FOLDER, payload: {folderId, folder}})
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

  return (
    state
  )
}

// export default useFolder