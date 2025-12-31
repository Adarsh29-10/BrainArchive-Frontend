import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import {useEffect} from 'react'


function AuthBootstrap() {
    const {isAuthenticated, getAccessTokenSilently} = useAuth0();

    useEffect(()=>{
        if(!isAuthenticated) return;
        const syncUser = async () => {
            try {
                const token = await getAccessTokenSilently()
                await axios.get('http://localhost:8000/user/me', {
                    headers: {
                        Authorization: `Bearer ${token}` 
                    }
                })
            } catch (error) {
                console.log(error)
            }
        };

        syncUser();

    }, [isAuthenticated, getAccessTokenSilently])

    return null;
}

export default AuthBootstrap