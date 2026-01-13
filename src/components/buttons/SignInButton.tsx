import { useAuth0 } from "@auth0/auth0-react"

function SignInButton() {
    const {loginWithRedirect} = useAuth0() 
  return (
    <button
        onClick={() => loginWithRedirect()}
        className="px-6 py-2 rounded-lg bg-black text-white font-bold hover:scale-105 transition-transform duration-300"
    >
        Sign In
    </button>
  )
}

export default SignInButton