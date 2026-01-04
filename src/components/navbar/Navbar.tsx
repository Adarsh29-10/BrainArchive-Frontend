import { Brain } from "lucide-react";
import { useAuth0 } from "@auth0/auth0-react";

function Navbar() {
  const { isAuthenticated, user, isLoading, loginWithRedirect, logout } = useAuth0();

  if (isLoading) {
    return null; 
  }

  return (
    <nav className="bg-white/10 backdrop-blur-md border-b border-black/20 sticky top-0 z-50 flex justify-between items-center px-16 py-4">
      
        <div className="flex items-center gap-2 justify-center">
          <Brain size={32} className="text-black" />
          <span className="text-xl font-bold text-black">BrainArchive</span>
        </div>

        {isAuthenticated ? (
          <div className="flex items-center gap-4">

            <span className="text-black">{user?.name}</span>
            
            <button
              onClick={() =>
                logout({ logoutParams: { returnTo: window.location.origin } })
              }
              className="px-4 py-2 rounded-lg bg-red-600 text-white font-semibold hover:bg-red-700"
            >
              Logout
            </button>
          </div>
        ) : (
          <button
            onClick={() => loginWithRedirect()}
            className="px-6 py-2 rounded-lg bg-black text-white font-semibold"
          >
            Sign In
          </button>
        )}
      
    </nav>
  );
}

export default Navbar;
