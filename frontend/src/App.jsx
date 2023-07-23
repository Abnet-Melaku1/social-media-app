import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import NavBar from "./components/NavBar"
import React from "react"
import Home from "./pages/Home"
import SignUp from "./pages/SignUp"
import SignIn from "./pages/SignIn"
import SideBar from "./components/SideBar"
import Feed from "./pages/Feed"

function App() {
  const [user, setUser] = React.useState(true)
  return (
    <>
      <Router>
        {user ? <SideBar /> : <NavBar />}

        <Routes>
          <Route path='/signup' element={<SignUp />} />
        </Routes>
        <Routes>
          <Route path='/signin' element={<SignIn />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
