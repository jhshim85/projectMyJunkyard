import React from "react";
import LogIn from "./components/LogIn";

import ForgotPassword from "./components/ForgotPassword";
import Account from "./components/Account";
import ProtectedRoute from "./components/ProtectedRoute";
import UpdateAccount from "./components/UpdateAccount";
import { AuthContextProvider } from "./contexts/AuthContext";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Folder from "./components/Folder";
import NavMenu from "./components/NavMenu";

function App() {
  return (
    <>
      <NavMenu />
      <AuthContextProvider>
        <Routes>
          <Route path='/' element={<ProtectedRoute><Dashboard/></ProtectedRoute>}></Route>
          <Route path='/folder/:folderName' element={<ProtectedRoute><Folder/></ProtectedRoute>}></Route>

          <Route path='/account'
            element={
            <ProtectedRoute><Account /></ProtectedRoute>
          }></Route>
          <Route path='/update-account'
            element={
            <ProtectedRoute><UpdateAccount /></ProtectedRoute>
          }></Route>

          <Route path='/login' element={<LogIn />}></Route>
          {/* <Route path='/signup' element={<SignUp />}></Route> */}
          <Route path='/forgot-password' element={<ForgotPassword />}></Route>
        </Routes>
      </AuthContextProvider>
    </>
  );
}

export default App;
