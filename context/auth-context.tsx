import { supabase } from "@/lib/supabase";
import { AuthContextType, SignInFormProps, SignUpFormProps } from "@/lib/types";
import { Session, User } from "@supabase/supabase-js";
import { router } from "expo-router";
import {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState,
} from "react";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);

  //check session
  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        // console.log(session?.user);
        if (!session) router.push("/auth/sign-in");
        setSession(session);
        setUser(session?.user ?? null);
      }
    );

    return () => authListener.subscription.unsubscribe();
  }, []);

  const signUpWithCredentials = async (form: SignUpFormProps) => {
    const { data, error } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
      options: {
        data: {
          name: form.name,
        },
      },
    });

    console.log("SIGNUP DATA:", data);
    console.log("SIGNUP ERROR:", error);
    
    // Case 1: email exists as regular account
    if (data.user && data.user?.identities.length === 0) {
      throw new Error(
        "This email is already registered. Please sign in instead."
      );
    }
    if (error) {
      const msg = error.message;
      // Case 2: email was created via OAuth (Google, Facebook, etc.)
      if (msg.includes("Email rate limit") || error.status === 400) {
        throw new Error(
          "This email was created using Google/Facebook. Please sign in with that provider."
        );
      }

      // fallback
      throw new Error(msg);
    }
  };

  const signInWithCredentials = async (form: SignInFormProps) => {
    const { data, error } = await supabase.auth.signInWithPassword(form);

    console.log(data);

    if (error) {
      console.log(error.message);
      throw new Error(error.message);
    }

    router.push('/')
  };

  const signInOAuth = async (provider: "google" | "facebook") => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
    });

    if (error) console.log(error.message);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        signInOAuth,
        signInWithCredentials,
        signUpWithCredentials,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useUserAuth must be used within an AuthContextProvider");
  }
  return context;
};
