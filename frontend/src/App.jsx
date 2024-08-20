import { Navigate, Route, Routes } from "react-router-dom"
import { Toaster } from "react-hot-toast"
import { Loader } from "lucide-react"

import Footer from "./components/Footer"

import useAuthStore from "./store/authUser"

import HomePage from "./pages/home/HomePage"
import LoginPage from "./pages/LoginPage"
import SignupPage from "./pages/SignupPage"
import { useEffect } from "react"


function App() {
  const { user, isCheckAuth, authCheck } = useAuthStore()

  useEffect(() => {
    authCheck()
  }, [authCheck])

  if(isCheckAuth) {
    return (
      <div className="h-screen">
        <div className="flex justify-center items-center bg-black h-full">
          <Loader className="animated-spin text-red-600 size-10"/>
        </div>
      </div>
    )
  }
  
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />}/>
        <Route path="/login" element={!user ? <LoginPage /> : <Navigate to={'/'}/>}/>
        <Route path="/signup" element={!user ? <SignupPage /> : <Navigate to={'/'}/>}/>
      </Routes>
      <Footer />
      <Toaster />
    </>
  )
}

export default App
