import { createContext, useContext, useEffect, useState } from 'react';

const AppContext = createContext();

export function AppWrapper({ children }) {

    let sharedState = useState({
        darkMode: false,
    });

    useEffect(() => {
        const savedState = localStorage.getItem('sharedState');
        sharedState[1](savedState ? JSON.parse(savedState) : sharedState[0]);
    }, [])
    useEffect(() => {
        localStorage.setItem('sharedState', JSON.stringify(sharedState[0]));
    }, [sharedState[0]])

    return (
        <AppContext.Provider value={sharedState}>
            {children}
        </AppContext.Provider>
    );
}

export function useAppContext() {
    return useContext(AppContext);
}