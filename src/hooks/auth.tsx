import React, { createContext, useContext, ReactNode, useState } from "react";
import auth from '@react-native-firebase/auth';
import { Alert } from "react-native";
import firestore from '@react-native-firebase/firestore'
import AsyncStorage from "@react-native-async-storage/async-storage";

type User = {
  id: string
  name: string
  isAdmin: boolean
}

type AuthContextDate = {
  signIn: (email: string, password: string) => Promise<void>;
  isLogging: boolean
  user: User | null

}
type AuthProviderPropos = {
  children: ReactNode;
}
const USER_COLLECTION = '@gopizza:users'
export const AuthContext = createContext({} as AuthContextDate);

function AuthProvider({ children }: AuthProviderPropos) {
  const [user, setUser] = useState<User | null>(null)
  const [isLogging, setIsLogging] = useState(false);
  async function signIn(email: string, password: string) {
    if (!email || !password) {
      return Alert.alert('Login', 'Informe o e-mail e a senha.')
    }
    setIsLogging(true);
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(account => {
        firestore()
          .collection('users')
          .doc(account.user.uid)
          .get()
          .then(async (profile) => {
            const { name, isAdmin } = profile.data() as User;
            if (profile.exists) {
              const userData = {
                id: account.user.uid,
                name,
                isAdmin
              }
              console.log(userData)
              await AsyncStorage.setItem(USER_COLLECTION, JSON.stringify(userData))
              setUser(userData)
            }
          })
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
    <AuthContext.Provider value={{ signIn, isLogging, user }}>
      {children}
    </AuthContext.Provider>
  )
}

function useAuth() {
  const context = useContext(AuthContext)
  return context
}

export { AuthProvider, useAuth }