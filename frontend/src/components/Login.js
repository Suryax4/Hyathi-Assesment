import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    let auth = sessionStorage.getItem("token");
    if (auth) {
      navigate("/");
    }
  });

  const notify = () => toast(`Login Successful redirecting to Home Page`);
  const notify2 = () => {
    toast(`Please Enter Correct Details`);
  };

  const loginHandler = async () => {
    let result = await fetch("http://localhost:5010/login", {
      method: "post",
      body: JSON.stringify({ username: email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (result) {
      notify();
    }

    result = await result.json();
    console.log(result);
    if (result.token) {
      localStorage.setItem("user", email);
      sessionStorage.setItem("token", result?.token);
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } else {
      notify2();
    }
  };

  return (
    <div className="login">
      <ToastContainer autoClose={2000} />
      <h1>Login</h1>
      <input
        className="inputBox"
        type="text"
        placeholder="Enter Username"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="inputBox"
        type="password"
        placeholder="Enter Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={loginHandler} className="appButton" type="button">
        Login
      </button>
    </div>
  );
};

export default Login;
