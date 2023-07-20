import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import SignupCard from "./pages/SignUp"
import SidebarWithHeader from "./components/Nav"

function App() {
  return (
    <>
      <Router>
        <div>
          <SidebarWithHeader />
          <Routes></Routes>
        </div>
      </Router>
    </>
  )
}

export default App
