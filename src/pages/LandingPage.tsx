import { BookOpen, Brain, Zap, Users } from 'lucide-react';
import Navbar from '../components/navbar/Navbar';

function LandingPage() {

  return (
    <div className="min-h-screen bg-pink-400">
      {/* Navigation Bar */}
      <Navbar />

      {/* Hero Section */}
      <div className="flex items-center justify-center min-h-[calc(100vh-80px)] px-4">
        <div className="text-center max-w-4xl mx-auto">
          {/* Headline */}
          <h1 className="text-5xl sm:text-6xl font-black text-black mb-6 leading-tight">
            Learn Smarter,
            <br />
            Not Harder
          </h1>

          {/* Subheading */}
          <p className="text-xl sm:text-2xl text-pink-950 mb-12 max-w-2xl mx-auto">
            Create, organize, and master your learning with BrainArchive. Transform your education experience with intelligent note-taking.
          </p>

          {/* CTA Buttons */}
          {/* <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <button
              onClick={handleGetStarted}
              className="px-8 py-4 rounded-lg bg-white text-blue-600 font-bold text-lg hover:bg-blue-50 hover:shadow-2xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white active:scale-95"
            >
              Get Started Free
            </button>
            <button
              onClick={handleSignUp}
              className="px-8 py-4 rounded-lg bg-transparent border-2 border-white text-white font-bold text-lg hover:bg-white/10 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white active:scale-95"
            >
              Sign Up Now
            </button>
          </div> */}

          {/* Trust Badge */}
          <p className="text-black/70 text-sm">
            ✓ Free forever • ✓ No credit card required • ✓ 100% secure
          </p>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-pink-100 py-20 mt-2 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 text-center mb-16">
            Why Choose BrainArchive?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Feature 1 */}
            <div className="p-6 rounded-lg bg-black hover:scale-105 hover:shadow-lg transition-all duration-700">
              <div className="w-12 h-12 bg-gray-700 rounded-lg flex items-center justify-center mb-4">
                <BookOpen size={24} className="text-white" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Rich Content</h3>
              <p className="text-gray-300">
                Add text, images, videos, code snippets, and PDFs to your notes.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-6 rounded-lg bg-black hover:scale-105 hover:shadow-lg transition-all duration-700">
              <div className="w-12 h-12 bg-gray-700 rounded-lg flex items-center justify-center mb-4">
                <Brain size={24} className="text-white" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Smart Learning</h3>
              <p className="text-gray-300">
                Organize your thoughts with intelligent categorization and tagging.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-6 rounded-lg bg-black hover:scale-105 hover:shadow-lg transition-all duration-700">
              <div className="w-12 h-12 bg-gray-700 rounded-lg flex items-center justify-center mb-4">
                <Zap size={24} className="text-white" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Lightning Fast</h3>
              <p className="text-gray-300">
                Experience blazing-fast performance with our optimized platform.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="p-6 rounded-lg bg-black hover:scale-105 hover:shadow-lg transition-all duration-700">
              <div className="w-12 h-12 bg-gray-700 rounded-lg flex items-center justify-center mb-4">
                <Users size={24} className="text-white" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Collaborate</h3>
              <p className="text-gray-300">
                Share notebooks and learn together with friends and colleagues.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-black py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to transform your learning?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of students and professionals mastering their subjects.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
            //   onClick={handleGetStarted}
              className="px-8 py-4 rounded-lg bg-white text-blue-600 font-bold text-lg hover:bg-blue-50 hover:shadow-2xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white active:scale-95"
            >
              Get Started Now
            </button>
            
          </div>
        </div>
      </div>

      {/* Footer */}
      {/* <footer className="bg-black text-gray-400 py-12 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <p className="mb-4">&copy; 2025 BrainArchive. All rights reserved.</p>
          <div className="flex justify-center gap-6 text-sm">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Contact</a>
          </div>
        </div>
      </footer> */}
    </div>
  );
}

export default LandingPage;
