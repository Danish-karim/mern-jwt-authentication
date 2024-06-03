import axios from "axios";
import { useContext, useEffect } from "react";
import AuthContext from "../context/AuthContext";
axios.defaults.withCredentials = true;
const Users = () => {
  const { user, setUser } = useContext(AuthContext);

  const sendRequest = async () => {
    const accessToken = localStorage.getItem("accessToken");
    const res = await axios.get("http://localhost:5000/api/user", {
      withCredentials: true,
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    });
    const data = res.data;
    setUser(data?.message);
  };

  useEffect(() => {
    sendRequest();
  }, []);

  return (
    <div className="flex justify-center items-center h-[80vh]">
      {user && <h1>Welcome {user?.name}</h1>}
    </div>
  );
};

export default Users;
