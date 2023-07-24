import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import NavBar from "./components/NavBar"
import React from "react"
import Home from "./pages/Home"
import SignUp from "./pages/SignUp"
import SignIn from "./pages/SignIn"
// import SideBar from "./components/SideBar"
import Feed from "./pages/Feed"
import Profile from "./pages/Profile"

function App() {
  const [user, setUser] = React.useState(true)
  return (
    <>
      <Router>
        {user && <NavBar />}
        <Routes>
          <Route path='/' element={<Feed />} />
        </Routes>
        <Routes>
          <Route path='/signup' element={<SignUp />} />
        </Routes>
        <Routes>
          <Route path='/profile' element={<Profile />} />
        </Routes>

        <Routes>
          <Route path='/signin' element={<SignIn />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
