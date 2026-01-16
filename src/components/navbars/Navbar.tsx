import { useAuth0 } from "@auth0/auth0-react";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import SignInButton from "../buttons/SignInButton";
import LogoutButton from "../buttons/LogoutButton";

function Navbar() {
  const { isAuthenticated, user, isLoading } = useAuth0();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  if (isLoading) {
    return null; 
  }


  return (
    <nav className="bg-zinc-950 backdrop-blur-md border-b border-black/20 sticky top-0 z-50">
      <div className="flex justify-between items-center px-4 sm:px-8 lg:px-16 py-3">
        
        {/* Logo */}
        <div className="flex items-center gap-2">
          <span className="text-xl sm:text-2xl font-bold text-white">BrainArchive</span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-4">
          {isAuthenticated ? (
            <>
              <span className="text-white font-medium">{user?.name}</span>
              <LogoutButton />
            </>
          ) : (
            <SignInButton />
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden p-2 rounded-lg transition-colors"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <X size={24} className="text-white" />
          ) : (
            <Menu size={24} className="text-white" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-zinc-900  backdrop-blur-md border-t  px-4 py-4 space-y-3">
          {isAuthenticated ? (
            <div className="flex flex-col">

              <div className="px-4 py-2 text-white font-medium">
                Hii, {user?.name}
              </div>
              <LogoutButton />
            </div>
          ) : (
            <SignInButton />
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
