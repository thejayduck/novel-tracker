import Cookies from 'js-cookie';
import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export function AuthWrapper({ children }) {

    let [user, setUser] = useState({
        logged_in: false,
        loading: true,
    });

    useEffect(async () => {
        let info = null;
        if (Cookies.get("token") != null) {
            const response = await fetch("/api/me/info");
            const json = await response.json();
            if (json.status == "Error") {
                if (json.code == "no_user") {
                    Cookies.remove("token", { path: "/", httpOnly: false, sameSite: "lax" });
                } else {
                    throw json;
                }
            } else {
                info = json.info;
            }
        }
        if (info == null) { // Invalid User
            setUser({ logged_in: false, loading: false });
        } else { // Valid User
            setUser({ ...info, logged_in: true, loading: false });
        }
    }, [])

    return (
        <AuthContext.Provider value={user}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuthContext() {
    return useContext(AuthContext);
}