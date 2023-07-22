import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import NavBar from "./components/NavBar"
import Home from "./pages/Home"
import SignUp from "./pages/SignUp"
import SignIn from "./pages/SignIn"

function App() {
  return (
    <>
      <Router>
        <NavBar />
        <Routes>
          <Route path='/' element={<Home />} />
        </Routes>
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
