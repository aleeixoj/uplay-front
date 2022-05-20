import Router from 'next/router';
import { setCookie, parseCookies, destroyCookie } from 'nookies';
import { createContext, useEffect, useState } from 'react';

import { api } from '../service/api';

type SignInData = {
  email: string;
  password: string;
};

type Address = {
  street: string;
  city: string;
  state: string;
  province: string;
  number: string;
  complement: string;
  name?: string;
  district: string;
};
type Profile = {
  id: string;
  name: string;
  created_at: string;
  updated_at: string;
  resourceIds: string[];
};
type Product = {
  id: string;
  name: string;
  price: number;
  description: string;
  warranty: string;
  brand: string;
  color: string;
  reference: string;
  code: string;
  stock: string;
  created_at: string;
  updated_at: string;
  note: any;
  cartId: any[];
  favoritesId: any[];
  ordersId: any[];
  categoryId: string;
};
type ProductQtn = {
  productId: string;
  qtn: number;
  totalPrice: number;
};
type Cart = {
  userId: string;
  productsIds: string[];
  products: Product[];
  productsQtn: ProductQtn[];
};
type User = {
  id: string;
  name: string;
  email: string;
  phone: string;
  password: string;
  avatar: string;
  status: string;
  created_at: string;
  updated_at: string;
  profileId: string;
  address: Address[];
  ordersId: any[];
  profile: Profile;
  cart: Cart;
  avatar_url: string;
};

type AuthContextType = {
  isAuthenticated: boolean;
  user: User | null;
  signIn: (data: SignInData) => Promise<void>;
  fillUserData: (user?: User) => Promise<void>;
  signOut: () => void;
  handleUpdateAvatar: (avatarUrl: string) => void;
};

export const AuthContext = createContext({} as AuthContextType);

export default function AuthProvider({ children }) {
  const [user, setUser] = useState<User | null>(null);
  const isAuthenticated = !!user;

  const fillUserData = async (user?: User) => {
    if (!user) {
      const { data } = await api.get('/users/profile');
      setUser(data);
    } else {
      setUser(user);
    }
  };

  const handleUpdateAvatar = async (avatarUrl: string) => {
    const newUser = {
      ...user,
      avatar_url: avatarUrl,
    };

    setUser(newUser as User);
  };
  useEffect(() => {
    const { 'uplay.token': token } = parseCookies();

    if (token) {
      fillUserData();
    }
  }, []);

  async function signIn({ email, password }: SignInData) {
    const { data } = await api.post('/sessions', { email, password });

    setCookie(undefined, 'uplay.token', data.token, {
      maxAge: 60 * 15, // 15 minutes
    });
    setCookie(undefined, 'uplay.refresh_token', data.refresh_token, {
      maxAge: 60 * 60 * 24 * 15, // 5 dias
    });
    // eslint-disable-next-line dot-notation
    api.defaults.headers['Authorization'] = `Bearer ${data.token}`;
    fillUserData();
    Router.push('/');
  }

  async function signOut() {
    const { 'uplay.token': token } = parseCookies();

    if (token) {
      destroyCookie(undefined, 'uplay.token');
      Router.reload();
    }
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        signIn,
        user,
        fillUserData,
        signOut,
        handleUpdateAvatar,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
