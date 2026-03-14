import { useAuth0 } from "@auth0/auth0-react";
import { History, Home } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

function Navbar() {
  const { user, isLoading } = useAuth0();
  const {pathname} = useLocation()
  const navigate = useNavigate()
  const hideBackButton = ['/dashboard', '/ai', '/notebooks'].includes(pathname)
  const hideAiHistoryButton = ['/profile', '/dashboard', '/notebooks', '/ai'].includes(pathname)
  const hideHistoryButtonFromNotebook = pathname.startsWith('/nb/') 
  const hideHistoryButtonFromPublicNotebook = pathname.startsWith('/public/nb/') 


  if (isLoading) {
    return null;
  }

  const handleBack = () => {
    if(pathname.startsWith('/nb/')) { navigate('/dashboard')}
    else if(pathname.startsWith('/ai/chat/')) { navigate('/dashboard')}
    else navigate(-1)
  }


  return (
    <nav className="bg-zinc-950 backdrop-blur-md border-b border-black/20 sticky top-0 z-50">
      <div className="flex justify-between items-center px-4 sm:px-8 lg:px-16 py-3">
          
        {/* Logo */}
        <div className="flex items-center gap-2">
          <span className="text-xl sm:text-2xl font-bold text-white">BrainArchive</span>
        </div>

        <div className="flex gap-4">

          {!hideBackButton && !hideHistoryButtonFromPublicNotebook && <button
              className="text-xl sm:text-xl font-semibold text-white"
              onClick={handleBack}>
                {<Home /> }
            </button> 
          }

          {!hideAiHistoryButton && !hideHistoryButtonFromNotebook && !hideHistoryButtonFromPublicNotebook && <button
              className="text-xl sm:text-xl font-semibold text-white"
              onClick={() => navigate('/ai')}>
                {<History /> }
            </button> 
          }

          <img
            onClick={()=>navigate('/profile')}
            src={user?.picture}
            alt={user?.name}
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-4 border-zinc-900 bg-zinc-800 object-cover"
            />
        </div>
       
      </div>
    </nav>
  );
}

export default Navbar;
