import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Usercontext } from "../context/UserContext";
const Logout = () => {
  const { setCurrentUser } = useContext(Usercontext);
  const navigate = useNavigate();

  setCurrentUser(null);
  navigate("/login");
  return <></>;
};

export default Logout;
