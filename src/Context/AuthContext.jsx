
import { createContext, useState,useEffect } from "react";
import axios from "axios";

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // ------------------------ Authentication Functions ------------------ //
  // Signup Function
  const signup = async (data) => {
    try {
      const res = await axios.post(
        "https://karmen-liable-blake.ngrok-free.dev/api/Account/register/patient",
        data
      );
      console.log(res.data);
      return { success: true };
    } catch (error) {
      return { success: false, message: error.response?.data?.message };
    }
  };
  // Login Function
  const login = async (data) => {
    try {
      const res = await axios.post(
        "https://karmen-liable-blake.ngrok-free.dev/api/Account/login",
        data
      );
      console.log(res.data);
      const token = res.data.token;

      localStorage.setItem("authToken", token);
      setUser(res.data.user);

      return { success: true };
    } catch (error) {
      return { success: false, message: error.response?.data?.message };
    }
  };
  // check if user is logged in on app load
  useEffect(() => {
  const token = localStorage.getItem("authToken");
  if (token) {
    axios
      .get(
        "https://karmen-liable-blake.ngrok-free.dev/api/Patients/GetMyProfile",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => setUser(res.data)) 
      .catch(() => logout()); 
  }
}, []);
  // Logout Function
  const logout = () => {
    localStorage.removeItem("authToken");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};


