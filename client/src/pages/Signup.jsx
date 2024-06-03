import { useState } from "react";
import axios from "axios";
const Signup = () => {
  const [userInfo, setuserInfo] = useState({
    name: "",
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
    const res = await axios.post("http://localhost:5000/api/signup", {
      ...userInfo,
    });
    console.log("ress", res);
  };
  console.log("userinfo", userInfo);
  return (
    <div className="flex flex-col gap-3 rounded-md shadow-md w-fit p-3 mx-auto my-[30vh]">
      <input
        type="name"
        name="name"
        id="name"
        placeholder="Enter your name"
        value={userInfo?.name}
        className="px-2 border-2 rounded-lg py-2 w-[300px] border-purple-100 transition-all delay-100 ease-in-out focus:border-purple-500 outline-none"
        onChange={onChange}
      />
      <input
        type="email"
        name="email"
        id="email"
        value={userInfo?.email}
        placeholder="Enter your email"
        className="px-2 border-2 rounded-lg py-2 w-[300px] border-purple-100 transition-all delay-100 ease-in-out focus:border-purple-500 outline-none"
        onChange={onChange}
      />
      <input
        type="password"
        name="password"
        id="password"
        value={userInfo?.password}
        placeholder="Enter your password"
        className="px-2 border-2 rounded-lg py-2 w-[300px] border-purple-100 transition-all delay-100 ease-in-out focus:border-purple-500 outline-none"
        onChange={onChange}
      />
      <button
        type="submit"
        onClick={handleSubmit}
        className="px-3 py-2 bg-purple-500 rounded-full text-white shadow-md"
      >
        Sign up
      </button>
    </div>
  );
};

export default Signup;
