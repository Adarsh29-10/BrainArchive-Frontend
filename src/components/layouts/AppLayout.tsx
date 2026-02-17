import { Outlet } from "react-router-dom"
import Navbar from "../navbars/Navbar"
import AppPrimaryNav from "../sidebars/AppPrimaryNav"

function AppLayout() {
  return (
    <div className="h-dvh flex flex-col overflow-hidden">
        <Navbar />
        <div className="flex-1 min-h-0 flex overflow-hidden">
          <AppPrimaryNav />
          <div className="flex-1 min-h-0 overflow-hidden pb-16 md:pb-0">
            <Outlet />
          </div>
        </div>
    </div>
  )
}

export default AppLayout
