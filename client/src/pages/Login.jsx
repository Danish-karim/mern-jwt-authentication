import { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const Login = () => {
  const { setIsAuth } = useContext(AuthContext);
  const navigate = useNavigate();
  const [userInfo, setuserInfo] = useState({
    email: "",
    password: "",
  });

  const onChange = (event) => {
    setuserInfo((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async () => {
    const res = await axios.post("http://localhost:5000/api/login", {
      ...userInfo,
    });
    console.log("ress", res?.data);
    localStorage.setItem("accessToken", res.data.token);
    setIsAuth(true);
    navigate("/users");
  };
  console.log("userinfo", userInfo);
  return (
    <div className="flex flex-col gap-3 rounded-md shadow-md w-fit p-3 mx-auto my-[30vh]">
      <input
        type="email"
        name="email"
        id="email"
        placeholder="Enter your email"
        value={userInfo?.email}
        onChange={onChange}
        className="px-2 border-2 rounded-lg py-2 w-[300px] border-purple-100 transition-all delay-100 ease-in-out focus:border-purple-500 outline-none"
      />
      <input
        type="password"
        name="password"
        id="password"
        placeholder="Enter your password"
        value={userInfo?.password}
        onChange={onChange}
        className="px-2 border-2 rounded-lg py-2 w-[300px] border-purple-100 transition-all delay-100 ease-in-out focus:border-purple-500 outline-none"
      />
      <button
        type="submit"
        onClick={handleSubmit}
        className="px-3 py-2 bg-purple-500 rounded-full text-white shadow-md"
      >
        Log In
      </button>
    </div>
  );
};

export default Login;
