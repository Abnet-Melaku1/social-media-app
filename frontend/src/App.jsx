import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import NavBar from "./components/NavBar"
import React from "react"
import Home from "./pages/Home"
import SignUp from "./pages/SignUp"
import SignIn from "./pages/SignIn"
// import SideBar from "./components/SideBar"
import Feed from "./pages/Feed"
import Profile from "./pages/Profile"
import "./customScrollbar.css"
import Account from "./pages/Account"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { useSelector, useDispatch } from "react-redux"
import CommentPage from "./pages/CommentPage"

function App() {
  const { user } = useSelector((state) => state.auth)
  return (
    <>
      <Router>
        {!user && <NavBar />}
        <Routes>
          <Route path='/' element={<Home />} />
        </Routes>
        <Routes>
          <Route path='/feed' element={<Feed />} />
        </Routes>
        <Routes>
          <Route path='/comment' element={<CommentPage />} />
        </Routes>
        <Routes>
          <Route path='/signup' element={<SignUp />} />
        </Routes>
        <Routes>
          <Route path='/signin' element={<SignIn />} />
        </Routes>
        <Routes>
          <Route path='/profile' element={<Profile />} />
        </Routes>
        <Routes>
          <Route path='/setting' element={<Account />} />
        </Routes>

        <Routes>
          <Route path='/signin' element={<SignIn />} />
        </Routes>
      </Router>
      <ToastContainer />
    </>
  )
}

export default App
