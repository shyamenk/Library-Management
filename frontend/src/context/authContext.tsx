import { jwtDecode } from "jwt-decode";
import React, { ReactNode, createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { SignInSchema, SignUpSchema } from "../schema/authSchema";
import { User } from "../types/User";

type SignInData = z.infer<typeof SignInSchema>;
type SignUpData = z.infer<typeof SignUpSchema>;

interface AuthContextType {
  user: User | null;
  signIn: (data: SignInData) => Promise<void>;
  signUp: (data: SignUpData) => Promise<void>;
  signOut: () => void;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  loading: boolean;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const signIn = async (data: SignInData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Sign in failed");
      }

      const { accessToken } = await response.json();

      const decodedToken: { UserInfo: { userId: string; email: string; role: string } } =
        jwtDecode(accessToken);
      const { email, role, userId } = decodedToken.UserInfo;

      const user: User = {
        userId,
        email,
        role: role as "User" | "Admin",
      };
      localStorage.setItem("user", JSON.stringify(user));
      setUser(user);
      if (user.role === "Admin") {
        navigate("/admin/book-management");
      } else {
        navigate("/");
      }
      toast.success("Signed in successfully");
    } catch (error) {
      console.error(error);
      setError("Failed to sign in");
      toast.error("Failed to sign in");
      navigate("/signin");
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (data: SignUpData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const { message } = await response.json();
      if (!response.ok) {
        toast.error(message);
      } else {
        toast.success(message);
        navigate("/signin");
      }
    } catch (error) {
      console.error(error);
      setError("Failed to sign up");
      toast.error("Failed to sign up");
      navigate("/signin");
    } finally {
      setLoading(false);
    }
  };

  const signOut = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/signin");
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signOut, setUser, signUp, loading, error }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  const { user, setUser } = authContext;

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser && !user) {
      setUser(JSON.parse(storedUser));
    }
  }, [user, setUser]);

  return authContext;
};
