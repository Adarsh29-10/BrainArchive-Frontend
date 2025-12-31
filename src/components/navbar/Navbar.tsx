import { Brain } from "lucide-react"
import { useAuth0 } from "@auth0/auth0-react";

interface NavbarProps {
    handleSignUp : () => void;
}

function Navbar({handleSignUp}:NavbarProps) {

    const { isAuthenticated, user, logout } = useAuth0();

  return (
    <nav className="bg-white/10 backdrop-blur-md border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Brain size={32} className="text-white" />
            <span className="text-xl font-bold text-white">BrainArchive</span>
          </div>

            { isAuthenticated ? (
                <>
                <span>{user?.name}</span>
                <button
                    onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
                    className="px-6 py-2 rounded-lg bg-white text-blue-600 font-semibold hover:bg-blue-50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white"
                >
                    Logout
                </button> 
                </>
            ) : (  
                <button
                    onClick={handleSignUp}
                    className="px-6 py-2 rounded-lg bg-white text-blue-600 font-semibold hover:bg-blue-50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white"
                >
                    Sign In
                </button>
            )}

         
        </div>
      </nav>
  )
}

export default Navbar