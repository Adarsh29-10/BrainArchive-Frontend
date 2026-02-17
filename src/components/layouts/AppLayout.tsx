import { Outlet } from "react-router-dom"
import Navbar from "../navbars/Navbar"

function AppLayout() {
  return (
    <div className="h-[100dvh] flex flex-col overflow-hidden">
        <Navbar />
        <div className="flex-1 overflow-hidden"><Outlet /></div>
        
    </div>
  )
}

export default AppLayout