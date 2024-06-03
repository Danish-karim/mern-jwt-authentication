import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import axios from "axios";
import Home from "./pages/Home";
import Users from "./pages/Users";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Navbar from "./components/Navbar";
import AuthContext from "./context/AuthContext";
const App = () => {
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState({});
  const refreshAccessToken = async () => {
    try {
      const res = await axios.get("/api/refresh");
      localStorage.setItem("accessToken", res.data.token);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    const interval = setInterval(() => {
      refreshAccessToken();
    }, 14 * 60 * 1000); // Refresh token every 15 minutes
    return () => clearInterval(interval);
  }, []);
  return (
    <AuthContext.Provider value={{ isAuth, setIsAuth, user, setUser }}>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users" element={<Users />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
