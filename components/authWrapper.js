import Cookies from 'js-cookie';
import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export function AuthWrapper({ children }) {

    let [token, setToken] = useState(null);

    useEffect(async () => {
        const token = Cookies.get("token");
        const response = await fetch("/api/me/user_id");
        const json = await response.json();
        if (json.user_id == null) { // Invalid Token
            Cookies.remove("token", { path: "/", httpOnly: false, secure: true });
        } else { // Valid Token
            setToken(token);
        }
    }, [])

    return (
        <AuthContext.Provider value={token}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuthContext() {
    return useContext(AuthContext);
}