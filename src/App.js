import { Routes, Route } from "react-router-dom";
import { AuthContextProvider } from "./contexts/AuthContext";
import LogIn from "./components/authentication/LogIn";
import SignUp from "./components/authentication/SignUp";
import ForgotPassword from "./components/authentication/ForgotPassword";
import Account from "./components/authentication/Account";
import UpdateAccount from "./components/authentication/UpdateAccount";
import ProtectedRoute from "./components/authentication/ProtectedRoute";
import NavMenu from "./components/NavMenu";
import Dashboard from "./components/Dashboard";

function App() {
  return (
    <>
      <NavMenu />
      <AuthContextProvider>
        <Routes>
          <Route path='/' element={<ProtectedRoute><Dashboard/></ProtectedRoute>}></Route>
          <Route path='/folder/:folderId' element={<ProtectedRoute><Dashboard/></ProtectedRoute>}></Route>

          <Route path='/account'
            element={
            <ProtectedRoute><Account /></ProtectedRoute>
          }></Route>
          <Route path='/update-account'
            element={
            <ProtectedRoute><UpdateAccount /></ProtectedRoute>
          }></Route>

          <Route path='/login' element={<LogIn />}></Route>
          <Route path='/signup' element={<SignUp />}></Route>
          <Route path='/forgot-password' element={<ForgotPassword />}></Route>
        </Routes>
      </AuthContextProvider>
    </>
  );
}

export default App;
