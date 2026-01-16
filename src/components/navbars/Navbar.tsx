import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import { AuthLoadingState } from "../loaders/LoaderStates";

function Navbar() {
  const { user, isLoading } = useAuth0();

  const navigate = useNavigate()

  if (isLoading) {
    return <AuthLoadingState fullScreen={false} />;
  }


  return (
    <nav className="bg-zinc-950 backdrop-blur-md border-b border-black/20 sticky top-0 z-50">
      <div className="flex justify-between items-center px-4 sm:px-8 lg:px-16 py-3">
        
        {/* Logo */}
        <div className="flex items-center gap-2">
          <span className="text-xl sm:text-2xl font-bold text-white">BrainArchive</span>
        </div>

        <img
          onClick={()=>navigate('/profile')}
          src={user?.picture}
          alt={user?.name}
          className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-4 border-zinc-900 bg-zinc-800 object-cover"
        />
       
      </div>

     
    </nav>
  );
}

export default Navbar;
