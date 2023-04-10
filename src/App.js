import React from "react";
import LogIn from "./components/LogIn";
import SignUp from "./components/SignUp";
import Account from "./components/Account";
import ProtectedRoute from "./components/ProtectedRoute"
import { Container } from "react-bootstrap";
import { AuthContextProvider } from "./contexts/AuthContext";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Container className="d-flex align-items-center justify-content-center"
    style={{minHeight: "100vh"}}>
      <div className="w-100" style={{maxWidth:'400px'}}>
        <h1 className='text-center font-bold'>Welcome to My Junkyard!</h1>
        <AuthContextProvider>
          <Routes>
            <Route path='/' element={<LogIn />}></Route>
            <Route path='/signup' element={<SignUp />}></Route>
            <Route path='/account'
              element={
              <ProtectedRoute><Account /></ProtectedRoute>
              }>
            </Route>
          </Routes>
        </AuthContextProvider>
      </div>
    </Container>
  );
}

export default App;
