import { useAuth0 } from "@auth0/auth0-react"

function SignInButton() {
    const {loginWithRedirect} = useAuth0() 
  return (
    <button
        onClick={() => loginWithRedirect()}
        className="inline-flex items-center justify-center rounded-lg border border-emerald-400/70 bg-emerald-500 px-5 py-2.5 text-sm font-semibold text-black transition-all duration-200 hover:bg-emerald-400 hover:shadow-lg hover:shadow-emerald-500/25 focus:outline-none focus:ring-2 focus:ring-emerald-300/50"
    >
        Sign In
    </button>
  )
}

export default SignInButton
