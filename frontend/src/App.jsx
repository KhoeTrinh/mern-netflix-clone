import { useEffect } from "react"
import { Navigate, Route, Routes } from "react-router-dom"
import { Toaster } from "react-hot-toast"
import { Loader } from "lucide-react"

import Footer from "./components/Footer"

import useAuthStore from "./store/authUser"

import HomePage from "./pages/home/HomePage"
import LoginPage from "./pages/LoginPage"
import SignupPage from "./pages/SignupPage"
import WatchPage from "./pages/WatchPage"
import SearchPage from "./pages/SearchPage"
import HistoryPage from "./pages/HistoryPage"
import Page404 from "./pages/Page404"


function App() {
  const { user, isCheckingAuth, authCheck } = useAuthStore()

  useEffect(() => {
    authCheck()
  }, [authCheck])

  if(isCheckingAuth) {
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
        <Route path="/watch/:id" element={user ? <WatchPage /> : <Navigate to={'/login'}/>}/>
        <Route path="/search" element={user ? <SearchPage /> : <Navigate to={'/login'}/>}/>
        <Route path="/history" element={user ? <HistoryPage /> : <Navigate to={'/login'}/>}/>

        <Route path="/*" element={<Page404 />}/>
      </Routes>
      <Footer />
      <Toaster />
    </>
  )
}

export default App
