// AuthContext.js
import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  console.log("Initial value of isLoggedIn:", isLoggedIn);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [userTypeId, setUserTypeId] = useState(null);

  let decodedToken;
  const userToken = localStorage.getItem("token");
  if (userToken) {
    decodedToken = jwtDecode(userToken);
  }

  const userId = decodedToken ? decodedToken.userId : null;

  const getLoggedUser = async () => {
    try {
      console.log("getLoggedUser - Start");
      setLoading(true);
      setLoading(true);
      let user;
  
      if (decodedToken.source && decodedToken.source === 'Google') {
        user = decodedToken;
      } else {
        const results = await fetch(`http://localhost:8080/api/users/${userId}`);
        if (!results.ok) {
          console.log(results);
          alert("Algo salió mal");
        }
        user = await results.json();
      }

      console.log("User data:", user);
      console.log("User type ID:", userTypeId);
      console.log("isLoggedIn:", isLoggedIn);

      if (user) {
        setUser(user);
        setUserTypeId(user.userTypeId);
        setLoading(false);
      } else {
        console.error("User data not available.");
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };
  

  const login = () => {
    setIsLoggedIn(true);
    getLoggedUser();
  };


const logout = () => {
  console.log("Logging out...");
  setIsLoggedIn(false);
  setUser(null);
  localStorage.removeItem("token");
  console.log("Local Storage after logout:", localStorage.getItem("token"));
};



  return (
    <AuthContext.Provider value={{ isLoggedIn, user, userTypeId, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
