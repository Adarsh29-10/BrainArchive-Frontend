import { Outlet } from "react-router-dom"
import Navbar from "../navbars/Navbar"

function NavLayout() {
  return (
    <div className="h-dvh flex flex-col overflow-hidden">
        <Navbar />
        <div className="flex-1 min-h-0 overflow-hidden"><Outlet /></div>
        
    </div>
  )
}

export default NavLayout