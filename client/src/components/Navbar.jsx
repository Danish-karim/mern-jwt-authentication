import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import axios from "axios";
axios.defaults.withCredentials = true;
const Navbar = () => {
  const { isAuth, setIsAuth, setUser } = useContext(AuthContext);

  const logout = async () => {
    const res = await axios.post("http://localhost:5000/api/logout", null, {
      withCredentials: true,
    });
    if (res.status === 200) {
      return res;
    }
    return new Error("Something went wrong");
  };

  const handleLogout = async () => {
    logout
      .then(() => {
        setIsAuth(false);
        setUser(null);
      })
      .catch(() => {
        console.log("Something went wrong");
      });
  };
  return (
    <div className="flex flex-col lg:flex-row justify-between px-2 py-3 bg-purple-600 text-white">
      <h2 className="font-bold text-2xl text-center">MERN AUTHENTICATION</h2>
      <div className="flex gap-5 justify-center">
        <Link to={"/"} className="list-none text-xl cursor-pointer">
          Home
        </Link>
        {!isAuth && (
          <Link to={"/login"} className="list-none text-xl cursor-pointer">
            Login
          </Link>
        )}
        {isAuth && (
          <Link
            to={"#"}
            className={`list-none text-xl cursor-pointer`}
            onClick={handleLogout}
          >
            LogOut
          </Link>
        )}
        <Link to={"/signup"} className="list-none text-xl cursor-pointer">
          Signup
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
