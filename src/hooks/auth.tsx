import React, { createContext, useContext, ReactNode, useState } from "react";
import auth from '@react-native-firebase/auth';
import { Alert } from "react-native";
type AuthContextDate = {

}
type AuthProviderPropos = {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextDate);

function AuthProvider({ children }: AuthProviderPropos) {
  const [isLogging, setIsLogging] = useState(false);
  async function signIn(email: string, password: string) {
    if (!email || !password) {
      return Alert.alert('Login', 'Informe o e-mail e a senha.')
    }
    setIsLogging(true);
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(account => {
        console.log(account);
      })
      .catch(error => {
        const { code } = error;
        if (code === 'auth/user-not-found' || code === 'auth/wrog-password') {
          return Alert.alert('login', 'E-mail e/ou senha invalida.')

        } else {
          Alert.alert('login', 'Não foi possivel realizar o login')

        }
      })
      .finally(() => setIsLogging(false))
  }
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