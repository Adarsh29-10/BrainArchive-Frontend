import AuthAxiosBridge from "./modules/auth/components/AuthAxiosBridge"
import AuthBootstrap from "./modules/auth/components/AuthBootstrap"
import AuthRedirectHandler from "./modules/auth/components/AuthRedirectHandler"
import ProtectedRoute from "./modules/auth/components/ProtectedRoute"
import Dashboard from "./modules/notebook/pages/Dashboard"
import LandingPage from "./modules/landing/pages/LandingPage"
import { Route, Routes } from "react-router-dom"
import EditorPage from "./modules/editor/pages/EditorPage"
import AppLayout from "./modules/app-shell/layouts/AppLayout"
import ProfilePage from "./modules/profile/pages/ProfilePage"
import PublicNotebooks from "./modules/notebook/pages/PublicNotebooksPage"
import PublicEditorPage from "./modules/editor/pages/PublicEditorPage"
import NavLayout from "./modules/app-shell/layouts/NavLayout"
import PublicAwareLayout from "./modules/app-shell/layouts/PublicAwareLayout"
import { ChatPage } from "./modules/ai/pages/ChatPage"
import AiDashboard from "./modules/ai/pages/AiDashboard"

function App() {
  return (
    <>

      <AuthBootstrap />        {/*  //sync frontend-backend user (/user/me)   */}
      <AuthAxiosBridge />      {/*  //attach Auth0 token to axios globally    */}
      <AuthRedirectHandler />  {/*  //redirect user after auth state settles  */}

      <Routes>
        <Route path="/" element={<LandingPage />} />

        {/* Public routes */}
        <Route element={<PublicAwareLayout />}>
          <Route path="/notebooks" element={<PublicNotebooks />} />
          {/* <Route path="/public/profile/:userId" element={<PublicProfilePage />} /> */}
          <Route path="/public/nb/:notebookId" element={<PublicEditorPage />} />
        </Route>

        {/* Authenticated Routes */}
        <Route element={<ProtectedRoute />}>
          <Route element={<AppLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/ai" element={<AiDashboard />} />
          </Route>

          <Route element={<NavLayout />}>
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/nb/:notebookId" element={<EditorPage />} />
            <Route path="/ai/chat" element={<ChatPage />} />
            <Route path="/ai/chat/:sessionId" element={<ChatPage />} />
          </Route>
        </Route>

      </Routes>
    </>
  )
}

export default App
