// context/auth-context.tsx
"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { apiClient, checkSession } from "@/lib/api";

type User = {
  id: string;
  name: string;
  email: string;
};

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  // login: (token: string, userData: User) => void;
  logout: () => Promise<void>;
  updateSession: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const getSession = async () => {
    setIsLoading(true);
    const { error, data } = await checkSession();
    
    if (!error) {
      if (data) {
        setUser(data);
      }
    }
    setIsLoading(false);
  }

  useEffect(() => {
    // Check for existing session on initial load
      getSession()
  }, []);

  const logout = async () => {
    try {
      await apiClient.post("/api/auth/logout", {
        credentials: "include",
      });
      setUser(null);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const updateSession = async () => await getSession();

  return (
    <AuthContext.Provider value={{ user, isLoading, logout, updateSession }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
