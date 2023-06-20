import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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

  const loginHandler = async () => {
    let result = await fetch("http://localhost:5010/login", {
      method: "post",
      body: JSON.stringify({ username:email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    result = await result.json();
    console.log(result);
    if (result.token) {
      localStorage.setItem("user", email);
      sessionStorage.setItem("token",result?.token)
     navigate("/");
    } else {
      alert("Please Enter Corect Details");
    }
  };

  return (
    <div className="login">
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
