import { useAuth0 } from "@auth0/auth0-react";
import SignInButton from "../buttons/SignInButton";
import LogoutButton from "../buttons/LogoutButton";
import { AuthLoadingState } from "../loaders/LoaderStates";

function NavbarLandingPage() {
  const { isAuthenticated, user, isLoading, } = useAuth0();

  if (isLoading) {
    return <AuthLoadingState fullScreen={false} />;
  }

  return (
    <nav className="bg-white/10 backdrop-blur-md border-b border-black/20 sticky top-0 z-50">
      <div className="flex justify-between items-center px-4 sm:px-8 lg:px-16 py-3">
        
        {/* Logo */}
        <div className="flex items-center gap-2">
          <span className="text-xl sm:text-2xl font-bold text-black">BrainArchive</span>
        </div>

        <div className=" md:flex items-center gap-4">
          {isAuthenticated ? (
            <>
              <span className="text-black font-medium">{user?.name}</span>
              <LogoutButton />
            </>
          ) : (
            <SignInButton />
          )}
        </div>
        
      </div>
    </nav>
  );
}

export default NavbarLandingPage;
