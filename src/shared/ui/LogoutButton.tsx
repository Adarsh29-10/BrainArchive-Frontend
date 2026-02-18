import { useAuth0 } from "@auth0/auth0-react"

function LogoutButton() {
    const {logout} = useAuth0()
  return (
    <button
        onClick={() =>
            logout({ logoutParams: { returnTo: window.location.origin } })
        }
        className="px-4 py-2 rounded-lg bg-red-600 text-white font-semibold hover:bg-red-700 transition-colors"
        >
        Logout
    </button>
  )
}

export default LogoutButton