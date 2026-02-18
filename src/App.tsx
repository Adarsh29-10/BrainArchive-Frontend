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
import AiTools from "./modules/ai/pages/AiToolsPage"
import NavLayout from "./modules/app-shell/layouts/NavLayout"

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
            <Route path="/public/nb/:notebookId" element={<PublicEditorPage />} />
          </Route>

          <Route element={<NavLayout />}>
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/nb/:notebookId" element={<EditorPage />} />
          </Route>
        </Route>

      </Routes>
    </>
  )
}

export default App
