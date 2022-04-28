import { setCookie } from 'nookies';
import { createContext } from 'use-context-selector';

import { api } from '../service/api';

type AuthContextType = {
  isAuthenticated: boolean;
};

type SignInData = {
  email: string;
  password: string;
};

export const AuthContext = createContext({} as AuthContextType);

export default function AuthProvider({ children }) {
  const isAuthenticated = false;

  async function signIn({ email, password }: SignInData) {
    const { data } = await api.get('/sessions', { email, password });

    setCookie(undefined, 'uplay.token', data.token, {
      maxAge: 60 * 60 * 1, // 1 hour
    });
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
