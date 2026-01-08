import AuthAxiosBridge from "./auth/AuthAxiosBridge"
import AuthBootstrap from "./auth/AuthBootstrap"
import AuthRedirectHandler from "./auth/AuthRedirectHandler"
import ProtectedRoute from "./auth/ProtectedRoute"
import Dashboard from "./pages/Dashboard"
import LandingPage from "./pages/LandingPage"
import LearningSession from "./pages/LearningSession"
import { Route, Routes } from "react-router-dom"

function App() {
  return (
    <>
    <AuthBootstrap />        {/*  //sync frontend-backend user (/user/me)   */}
    <AuthAxiosBridge />      {/*  //attach Auth0 token to axios globally    */}
    <AuthRedirectHandler />  {/*  //redirect user after auth state settles  */}

    <Routes>
      <Route path="/" element={<LandingPage />} />

      {/* Authenticated Routes */}
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/nb/:notebookId" element={<LearningSession />} />
      </Route>

    </Routes>
    </>
  )
}

export default App