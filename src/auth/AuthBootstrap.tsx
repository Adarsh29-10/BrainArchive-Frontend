import { useAuth0 } from "@auth0/auth0-react";
import {useEffect, useRef} from 'react'
import { api } from "../apis/axios.api";


function AuthBootstrap() {
    const {isAuthenticated} = useAuth0();
    const ranRef = useRef(false);

    useEffect(()=>{
        if(!isAuthenticated || ranRef.current) return;
        ranRef.current = true;

        const syncUser = async () => {
            try {
                await api.get('/user/me')
            } catch (error) {
                console.log("Auth bootstrap failed", error)
            }
        };

        syncUser();

    }, [isAuthenticated])

    return null;
}

export default AuthBootstrap