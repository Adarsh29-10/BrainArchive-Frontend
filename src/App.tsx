import AuthBootstrap from "./auth/AuthBootstrap"
import Dashboard from "./pages/Dashboard"
import LandingPage from "./pages/LandingPage"
import LearningSession from "./pages/LearningSession"
import { Route, Routes } from "react-router-dom"

function App() {
  return (
    <>
    <AuthBootstrap />
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/notebooks" element={<Dashboard />} />
      <Route path="/learning-session" element={<LearningSession />} />
    </Routes>
    </>
  )
}

export default App