import AuthAxiosBridge from "./auth/AuthAxiosBridge"
import AuthBootstrap from "./auth/AuthBootstrap"
import AuthRedirectHandler from "./auth/AuthRedirectHandler"
import ProtectedRoute from "./auth/ProtectedRoute"
import Dashboard from "./pages/Dashboard"
import LandingPage from "./pages/LandingPage"
import { Route, Routes } from "react-router-dom"
import Editor from "./pages/Editor"
import AppLayout from "./components/layouts/AppLayout"
import Profile from "./pages/Profile"
import PublicNotebooks from "./pages/PublicNotebooks"
import PublicEditor from "./pages/PublicEditor"
import AiTools from "./pages/AiTools"
import NavLayout from "./components/layouts/NavLayout"

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
          <Route element={<AppLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/notebooks" element={<PublicNotebooks />} />
            <Route path="/ai" element={<AiTools />} />
            <Route path="/public/nb/:notebookId" element={<PublicEditor />} />
          </Route>

          <Route element={<NavLayout />}>
            <Route path="/profile" element={<Profile />} />
            <Route path="/nb/:notebookId" element={<Editor />} />
          </Route>
        </Route>

      </Routes>
    </>
  )
}

export default App
