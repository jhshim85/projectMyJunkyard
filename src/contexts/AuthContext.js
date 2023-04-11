import { createContext, useContext, useState, useEffect } from "react";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    sendPasswordResetEmail,
    updateEmail,
    updatePassword
  } from "firebase/auth";
import { auth } from "../firebase";

const UserContext = createContext()

export const AuthContextProvider = ({children}) => {

  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true)

  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password)
  }

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password)
  }

  const logout = () => {
    return signOut(auth)
  }

  const resetPassword = (email) => {
    return sendPasswordResetEmail(auth, email)
  }

  const updateUserEmail = (email) => {
    return updateEmail(user, email)
  }

  const updateUserPassword = (password) => {
    return updatePassword(user, password)
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
      setLoading(false)
    })
    return () => {
      unsubscribe();
    }
  },[])

  return (
    <UserContext.Provider value={{createUser, user, logout, login, resetPassword, updateUserEmail, updateUserPassword}}>
      {!loading && children}
    </UserContext.Provider>
  )
}

export const UserAuth = () => {
  return useContext(UserContext)
}