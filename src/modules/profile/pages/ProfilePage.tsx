import { useAuth0 } from "@auth0/auth0-react";
import { Mail, Edit2, Copy, Check } from "lucide-react";
import { useState } from "react";
import { LoadingState } from "../../../shared/ui/LoaderStates";
import LogoutButton from "../../../shared/ui/LogoutButton";

function ProfilePage() {
  const { user, isLoading } = useAuth0();
  const [copied, setCopied] = useState(false);

  if (isLoading) {
    return <LoadingState message="Loading profile..." fullScreen={true} />;
  }

  const handleCopyEmail = () => {
    if (user?.email) {
      navigator.clipboard.writeText(user.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950">
        
      {/* Main Content */}
      <div className="px-4 sm:px-8 lg:px-16 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Profile Card */}
          <div className="bg-zinc-900 rounded-lg border border-zinc-800 overflow-hidden">
            {/* Profile Header Background */}
            <div className="h-32 bg-gradient-to-r from-zinc-800 to-zinc-700"></div>

            {/* Profile Info Section */}
            <div className="px-6 sm:px-8 pb-8">
              {/* Avatar and Name */}
              <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4 -mt-16 mb-6">
                <img
                  src={user?.picture}
                  alt={user?.name}
                  className="w-32 h-32 rounded-lg border-4 border-zinc-900 bg-zinc-800 object-cover"
                />
                <div className="flex-1">
                  <h2 className="text-2xl sm:text-3xl font-bold text-white">{user?.name}</h2>
                </div>

                <button className="px-4 py-3 bg-blue-700 hover:bg-blue-800 text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2">
                    <Edit2 size={18} />
                    Edit Profile
                </button>
              </div>

              {/* Divider */}
              <div className="h-px bg-zinc-800 "></div>

              <h3 className="text-lg font-semibold text-white flex items-center gap-2 my-6">
                <Edit2 size={18} />
                Account Information
              </h3>

              {/* User Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-1 gap-4">

                {/* User ID */}
                <div className="space-y-2">
                  <label className="text-zinc-400 text-sm font-medium">User ID</label>
                  <div className="bg-zinc-800/50 rounded-lg px-4 py-3 border border-zinc-700">
                    <p className="text-white font-mono text-sm truncate">{user?.sub}</p>
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label className="text-zinc-400 text-sm font-medium flex items-center gap-2">
                    <Mail size={16} />
                    Email Address
                  </label>
                  <div className="flex items-center gap-2 bg-zinc-800/50 rounded-lg px-4 py-3 border border-zinc-700">
                    <span className="text-white flex-1 truncate">{user?.email}</span>
                    <button
                      onClick={handleCopyEmail}
                      className="text-zinc-400 hover:text-zinc-200 transition-colors p-1"
                      title="Copy email"
                    >
                      {copied ? (
                        <Check size={18} className="text-green-500" />
                      ) : (
                        <Copy size={18} />
                      )}
                    </button>
                  </div>
                </div>

                {/* Account Created */}
                <div className="space-y-2">
                  <label className="text-zinc-400 text-sm font-medium">Account Created</label>
                  <div className="bg-zinc-800/50 rounded-lg px-4 py-3 border border-zinc-700">
                    <p className="text-white">
                      {user?.updated_at
                        ? new Date(user.updated_at).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })
                        : 'N/A'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div className="h-px bg-zinc-800 my-6"></div>

              {/* Additional Info */}
              <div className="space-y-4">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                  
                  <div className="bg-zinc-800/30 rounded-lg px-4 py-3 border border-zinc-800">
                    <p className="text-zinc-400 mb-1">Nickname</p>
                    <p className="text-white font-medium">{user?.nickname || 'Not provided'}</p>
                  </div>
                  
                  <div className="bg-zinc-800/30 rounded-lg px-4 py-3 border border-zinc-800">
                    <p className="text-zinc-400 mb-1">Email Verified</p>
                    <p className="text-white font-medium flex items-center gap-2">
                      {user?.email_verified ? (
                        <>
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          Yes
                        </>
                      ) : (
                        <>
                          <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                          Pending
                        </>
                      )}
                    </p>
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div className="h-px bg-zinc-800 my-6"></div>

              {/* Actions */}
              <div>
                <LogoutButton />
              </div>
            </div>
          </div>


          {/* Danger Zone */}
          <div className="bg-red-950/20 border border-red-900/50 rounded-lg p-6 mt-6">
            <h3 className="text-lg font-semibold text-red-400 mb-2">Danger Zone</h3>
            <p className="text-red-300/80 text-sm mb-4">Irreversible actions that will permanently affect your account</p>
            <button className="px-6 py-2 bg-red-600 hover:bg-red-500 text-white font-medium rounded-lg text-sm transition-colors">
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
