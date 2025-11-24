import React, { createContext, useContext, useState, type ReactNode } from "react";

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  profileImage?: string;
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
}

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string, phone: string) => Promise<boolean>;
  logout: () => void;
  updateProfile: (userData: Partial<User>) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
    loading: false,
  });

  const login = async (email: string, password: string): Promise<boolean> => {
    setState((prev) => ({ ...prev, loading: true }));

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (email === "demo@example.com" && password === "password") {
        const user: User = {
          id: 1,
          name: "احمد محمدی",
          email: "demo@example.com",
          phone: "09123456789",
        };

        setState({
          isAuthenticated: true,
          user,
          loading: false,
        });

        localStorage.setItem("auth_user", JSON.stringify(user));
        return true;
      }

      setState((prev) => ({ ...prev, loading: false }));
      return false;
    } catch (error) {
      setState((prev) => ({ ...prev, loading: false }));
      return false;
    }
  };

  const register = async (name: string, email: string, phone: string): Promise<boolean> => {
    setState((prev) => ({ ...prev, loading: true }));

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const user: User = {
        id: Date.now(),
        name,
        email,
        phone,
      };

      setState({
        isAuthenticated: true,
        user,
        loading: false,
      });

      localStorage.setItem("auth_user", JSON.stringify(user));
      return true;
    } catch (error) {
      setState((prev) => ({ ...prev, loading: false }));
      return false;
    }
  };

  const logout = () => {
    setState({
      isAuthenticated: false,
      user: null,
      loading: false,
    });
    localStorage.removeItem("auth_user");
  };

  const updateProfile = async (userData: Partial<User>): Promise<boolean> => {
    if (!state.user) return false;

    setState((prev) => ({ ...prev, loading: true }));

    try {
      await new Promise((resolve) => setTimeout(resolve, 500));

      const updatedUser = { ...state.user, ...userData };

      setState((prev) => ({
        ...prev,
        user: updatedUser,
        loading: false,
      }));

      localStorage.setItem("auth_user", JSON.stringify(updatedUser));
      return true;
    } catch (error) {
      setState((prev) => ({ ...prev, loading: false }));
      return false;
    }
  };

  React.useEffect(() => {
    const savedUser = localStorage.getItem("auth_user");
    if (savedUser) {
      try {
        const user = JSON.parse(savedUser);
        setState({
          isAuthenticated: true,
          user,
          loading: false,
        });
      } catch (error) {
        localStorage.removeItem("auth_user");
      }
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        register,
        logout,
        updateProfile,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
