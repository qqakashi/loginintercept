import React, { createContext, useCallback, useContext, useState } from 'react';

const AuthContext = createContext<AuthState>({isLoggedIn: false, login:()=>{}, logout:()=>{}});

interface AuthState{
    isLoggedIn: boolean;
    login(): void;
    logout(): void;
}

/**全局登录状态容器 */
export function AuthProvider({ children }: { children: React.JSX.Element }){
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const login = useCallback(() => setIsLoggedIn(true),[]);
    const logout = useCallback(() => {
        setIsLoggedIn(false); 
    },[]);

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};



export function useAuth() {
    return useContext(AuthContext);
}
