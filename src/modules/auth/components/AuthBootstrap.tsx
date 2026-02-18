import { useAuth0 } from "@auth0/auth0-react";
import {useEffect, useRef} from 'react'
import { api } from "../../../shared/api/axios.api";


function AuthBootstrap() {
    const {user, isAuthenticated} = useAuth0();
    const ranRef = useRef(false);

    useEffect(()=>{
        if(!isAuthenticated || ranRef.current) return;
        ranRef.current = true;

        const syncUser = async () => {
            try {
                await api.post('/user/me', {
                    email: user?.email,
                    name: user?.name,
                    picture: user?.picture
                })
            } catch (error) {
                console.log("Auth bootstrap failed", error)
            }
        };

        syncUser();

    }, [isAuthenticated, user])

    return null;
}

export default AuthBootstrap