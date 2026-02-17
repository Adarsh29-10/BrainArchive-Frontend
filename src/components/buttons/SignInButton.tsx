import { useAuth0 } from "@auth0/auth0-react"

function SignInButton() {
    const {loginWithRedirect} = useAuth0() 
  return (
    <button
        onClick={() => loginWithRedirect()}
        className="px-6 py-2 rounded-lg bg-gradient-to-r from-green-700 to-green-600 text-white font-bold hover:from-green-500 hover:to-green-400 hover:shadow-lg hover:shadow-green-600/50 transition-all duration-300 transform hover:scale-105"
    >
        Sign In
    </button>
  )
}

export default SignInButton