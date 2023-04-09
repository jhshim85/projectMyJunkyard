import React from "react";
import LogIn from "./components/LogIn";
import SignUp from "./components/SignUp";
import Account from "./components/Account";
import { Container } from "react-bootstrap";
// import { AuthProvider } from "./contexts/AuthContext";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    // <AuthProvider>
      <Container className="d-flex align-items-center justify-content-center"
        style={{minHeight: "100vh"}}>
        <div className="w-100" style={{maxWidth:'400px'}}>
          <h1 className='text-center font-bold'>Welcome to My Junkyard!</h1>
          <Routes>
            <Route path='/' element={<LogIn />}></Route>
            <Route path='/signup' element={<SignUp />}></Route>
            <Route path='/account' element={<Account />}></Route>
          </Routes>
        </div>
      </Container>
    // </AuthProvider>
  );
}

export default App;
