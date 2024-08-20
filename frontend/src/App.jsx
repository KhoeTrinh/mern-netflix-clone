import { Route, Routes } from "react-router-dom"
import { Toaster } from "react-hot-toast"

import Footer from "./components/Footer"

import useAuthStore from "./store/authUser"

import HomePage from "./pages/home/HomePage"
import LoginPage from "./pages/LoginPage"
import SignupPage from "./pages/SignupPage"


function App() {
  const { user, isCheckAuth } = useAuthStore()
  console.log(user)
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />}/>
        <Route path="/login" element={<LoginPage />}/>
        <Route path="/signup" element={<SignupPage />}/>
      </Routes>
      <Footer />
      <Toaster />
    </>
  )
}

export default App
