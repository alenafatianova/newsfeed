import { User, UserCredential } from 'firebase/auth';

export type AuthContextType = {
  user?: User | null;
  isAuth: boolean | null;
  loginWithEmailAndPassword: (email: string, password: string) => Promise<UserCredential | null>;
};
