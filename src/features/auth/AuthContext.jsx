import { createContext, useContext, useState } from "react";
import { loginUser, signupUser } from "../../util/authUtil";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });

  async function login(email, password) {
    const data = await loginUser(email, password);
    setUser(data);
    localStorage.setItem("user", JSON.stringify(data));
  }

  async function signup(userData) {
    const data = await signupUser(userData);
    setUser(data);
    localStorage.setItem("user", JSON.stringify(data));
  }

  function logout() {
    setUser(null);
    localStorage.removeItem("user");
  }

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  let context = useContext(AuthContext);
  if (!context) {
    throw new Error("Context is not Defined");
  }
  return context;
}
