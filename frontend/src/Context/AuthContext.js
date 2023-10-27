import {createContext, useState} from "react";

export const AuthContext = createContext();

const getFromLocalStroage = () => {
    if(typeof window !== undefined) {
        const value = localStorage.getItem("token");
        return value || 'no_auth';
    }
}

export const AuthContextProvider = ({children}) => {
    const [auth, setAuth] = useState(() => {
      return getFromLocalStroage();
    });

    return <AuthContext.Provider value={{auth, setAuth}}>{children}</AuthContext.Provider>
}
