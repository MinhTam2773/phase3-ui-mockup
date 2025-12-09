import { supabase } from "@/lib/supabase";
import { AuthContextType, SignInFormProps, SignUpFormProps } from "@/lib/types";
import { User } from "@supabase/supabase-js";
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

  useEffect(() => {
    // 1) Listen for auth changes
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (!session) router.push("/auth/sign-in");
        setUser(session?.user ?? null);
      }
    );

    // 2) Immediately check the currently logged-in user
    const getCurrentUser = async () => {
      const { data, error } = await supabase.auth.getUser();

      if (error) {
        console.log("getUser error:", error);
        router.push("/auth/sign-in");
        return;
      }

      // If no user → redirect
      if (!data.user) {
        router.push("/auth/sign-in");
        return;
      }

      // Otherwise set state
      setUser(data.user);
      console.log("Current user:", data.user);
    };

    getCurrentUser();

    // Cleanup the listener
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

    if (data.session?.user) {
      console.log("Sign up successfully");
      router.replace("/");
    }

    if (error) {
      console.log(error.message);
    }
  };

  const signInWithCredentials = async (form: SignInFormProps) => {
    const { data, error } = await supabase.auth.signInWithPassword(form);

    console.log(data);

    if (error) {
      console.log(error.message);
      throw new Error(error.message);
    }

    router.push("/");
  };

  const signOut = async () => {
    const {error} = await supabase.auth.signOut();
    if (error) {
      console.error(error);
    }
    else router.push('/auth/sign-in');
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        signInWithCredentials,
        signUpWithCredentials,
        signOut,
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
