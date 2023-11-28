// AuthContext.js
import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  let decodedToken;
  const userToken = localStorage.getItem("token");
  if (userToken) {
    decodedToken = jwtDecode(userToken);
  }

  const userId = decodedToken ? decodedToken.userId : null;

  const getLoggedUser = async () => {
    try {
      setLoading(true);
      let user;
      if (decodedToken.source === 'Google') {
        user = decodedToken;
      } else {
        const results = await fetch(`http://localhost:8080/api/users/${userId}`);
        if (!results.ok) {
          console.log(results);
          alert("Algo salió mal");
        }
        user = await results.json();
      }
      console.log(user);
      setUser(user);
      setLoading(false);

    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const login = () => {
    setIsLoggedIn(true);
    getLoggedUser();
  };


  const logout = () => {
    setIsLoggedIn(false);
    setUser(null);
    localStorage.removeItem("token");
  };

  const userTypeId = user ? user.userTypeId : null;

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, userTypeId, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
