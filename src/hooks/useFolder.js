import { useReducer, useEffect } from 'react';
import { db } from '../firebase';
import { doc, collection, getDoc, query, where, orderBy, onSnapshot } from 'firebase/firestore';
import { UserAuth } from '../contexts/AuthContext';

const ACTIONS = {
  SELECT_FOLDER: 'select-folder',
  UPDATE_FOLDER: 'update-folder',
  SET_CHILD_FOLDERS: 'set-child-folders'
}

export const ROOT_FOLDER = {name: 'Root', id: null, path: []}

const reducer = (state, {type, payload}) => {

  switch (type) {
    case ACTIONS.SELECT_FOLDER:
      return {
        folderId: payload.folderId,
        folder: payload.folder,
        childFolders: [],
        childFiles: [],
      };
    case ACTIONS.UPDATE_FOLDER:
      return {
        ...state,
        folder: payload.folder,
      };
    case ACTIONS.SET_CHILD_FOLDERS:
      return {
        ...state,
        childFolders: payload.childFolders,
      };
    default:
      return state;
  }
}

export const useFolder = (folderId = null, folder = null) => {

  const { user } = UserAuth();

  const [state, dispatch] = useReducer(reducer, {
    folderId,
    folder,
    childFolders: [],
    childFiles: []
  })

  useEffect(() => {
    dispatch({
      type: ACTIONS.SELECT_FOLDER,
      payload: {folderId, folder}
    })
  },[folderId, folder])

  useEffect(() => {
    if (folderId == null) {
      return dispatch({
        type: ACTIONS.UPDATE_FOLDER,
        payload: {folder: ROOT_FOLDER}
      })
    }
    else if (folderId) {
      const updateFolder = async () => {
        const dbDoc = doc(db, "folders", folderId);
        const dbGetDoc = await getDoc(dbDoc);
        const formattedDoc = {
          id: folderId,
          ...dbGetDoc.data(),
        };
        return dispatch({
          type: ACTIONS.UPDATE_FOLDER,
          payload: { folder: formattedDoc },
        });
      }
      updateFolder();
    } else {
      return dispatch({
        type: ACTIONS.UPDATE_FOLDER,
        payload: { folder: ROOT_FOLDER },
      });
    }
  },[folderId])
  
  useEffect(() => {
    const dbQuery = query(
      collection(db, "folders"),
      where("parentId", "==", folderId),
      where("userId", "==", user.uid),
      orderBy("createdAt")
      );
    return (
      onSnapshot(dbQuery,(snapshot) => {
        dispatch({
          type: ACTIONS.SET_CHILD_FOLDERS,
          payload: {childFolders: snapshot.docs.map((doc) => {
          return {id: doc.id, ...doc.data()}})}
        })
      })
    )
  },[folderId, user])

  return (
    state
  )
}