import { BookOpen, Brain, Zap, Users } from 'lucide-react';
import NavbarLandingPage from '../components/NavbarLandingPage'

function LandingPage() {

  const Items = [
    {
      Icon : BookOpen, 
      title: "Rich Content", 
      description: "Add text, images, videos, code snippets, and PDFs to your notes."
    },
    {
      Icon : Brain, 
      title: "Smart Learning",
      description: "Organize your thoughts with intelligent categorization and tagging."
    },
    {
      Icon: Zap, 
      title: "Lightning Fast",
      description: "Experience blazing-fast performance with our optimized platform."
    },
    {
      Icon: Users, 
      title: "Collaborate",
      description:  "Share notebooks and learn together with friends and colleagues."
    }
  ]
  

  return (
    <div className="min-h-screen bg-zinc-950 ">
      {/* Navigation Bar */}
      <NavbarLandingPage />

      {/* Hero Section */}
      <div className="flex items-center justify-center min-h-screen bg-zinc-950 px-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-green-600/20 rounded-full -mr-48 -mt-48 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-green-500/10 rounded-full -ml-36 -mb-36 blur-3xl"></div>
        
        <div className="text-center max-w-5xl mx-auto relative z-10">
          {/* Headline */}
          <h1 className="text-6xl sm:text-7xl font-black text-white mb-1 leading-tight drop-shadow-lg px-6 py-3 rounded-lg">
            Learn Smarter,
            <br />
            <span className="bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent">Not Harder</span>
            
          </h1>

          {/* Subheading */}
          <p className="text-xl sm:text-md text-zinc-400 mb-12 max-w-3xl mx-auto leading-normal bg-transparent">
            Create, organize, and master your learning with intelligent note-taking and rich content support.
          </p>
                    
        </div>
      </div>

      {/* Features Section */}
      <div className="min-h-screen bg-zinc-900 py-28 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              Why Choose BrainArchive?
            </h2>
            <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
              Everything you need to master your learning in one beautiful platform
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {
              Items.map((item, index) => (
                <div key={index} className="group relative p-8 rounded-2xl bg-zinc-800 border-2 border-zinc-700 hover:border-green-500 hover:shadow-2xl hover:shadow-green-600/20 transition-all duration-300 transform hover:-translate-y-2">
                  
                  {/* Icon Container */}
                  <div className="w-14 h-14 bg-gradient-to-br from-green-600 to-green-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-green-600/50">
                    <item.Icon size={28} className="text-white" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-green-400 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-zinc-400 leading-relaxed mb-4">
                    {item.description}
                  </p>
                </div>
              ))
            }
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-b from-zinc-900 to-black py-24 px-4 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent mb-1 py-2">
            Start Learning Today
          </h2>
          <p className="text-xl text-zinc-400 mb-4 max-w-2xl mx-auto">
            Your notebook awaits. Click the Sign In button in the top navigation to get started.
          </p>
          <p className="text-sm text-zinc-400 mb-8">
            No credit card required. Start free, upgrade anytime.
          </p>
        </div>
      </div>

      {/* Footer */}
      {/* <footer className="bg-black text-gray-400 py-2 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <p className="mb-4">&copy; 2025 BrainArchive. All rights reserved.</p>
        </div>
      </footer> */}
    </div>
  );
}

export default LandingPage;

