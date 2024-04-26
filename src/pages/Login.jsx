import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import { Usercontext } from "../context/UserContext";

const Login = () => {
  const [userData, setUserData] = React.useState({
    email: "",
    password: "",
  });

  const [error, setError] = React.useState("");
  const navigate = useNavigate();

  const {setCurrentUser} = React.useContext(Usercontext);

  const changeInputHandler = (e) => {
    setUserData((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  };

  const loginUser = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await axios.post(
        `http://127.0.0.1:5000/api/users/login`,
        userData
      );
      const user = await response.data;
      setCurrentUser(user);
      navigate("/");
    } catch (error) {
      setError(error.response.data.message);
    }
  };
  return (
    <section className="login">
      <div className="container">
        <h2>Sign In</h2>
        <form action="" className=" form login__form" onSubmit={loginUser}>
          {error && <p className="form__error-message">{error}</p>}
          <input
            type="text"
            placeholder="Email"
            name="email"
            value={userData.email}
            onChange={changeInputHandler}
            autoFocus
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={userData.password}
            onChange={changeInputHandler}
          />
          <button type="submit" className="btn primary">
            Login
          </button>
        </form>
        <small>
          Dont have an account? <Link to="/login">sign up</Link>
        </small>
      </div>
    </section>
  );
};

export default Login;
