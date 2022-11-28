import React, { createContext, useContext, ReactNode } from "react";

type AuthContextDate = {

}
type AuthProviderPropos = {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextDate);

function AuthProvider({ children }: AuthProviderPropos) {
  return (
    <AuthContext.Provider value={{}}>
      {children}
    </AuthContext.Provider>
  )
}

function userAuth() {
  const context = useContext(AuthContext)
  return context
}

export { AuthProvider, userAuth }