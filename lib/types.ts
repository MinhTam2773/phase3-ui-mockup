import { User } from '@supabase/supabase-js';

export interface AuthContextType {
    user: User | null,
    signInWithCredentials: (form : SignInFormProps) => Promise<void>,
    signUpWithCredentials: (form : SignUpFormProps) => Promise<void>,
    signInOAuth: (provider : 'facebook' | 'google') => Promise<void>,
}

export interface SignUpFormProps {
    email: string,
    name: string, 
    password: string,
    confirmPassword: string,
    acceptTerms: boolean,
}

export interface SignInFormProps {
    email: string,
    password: string
}