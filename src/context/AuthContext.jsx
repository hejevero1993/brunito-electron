import { createContext, useContext } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children, auth, handleLogout }) => {
    return <AuthContext.Provider value={{ auth, handleLogout }}>{children}</AuthContext.Provider>;
};
