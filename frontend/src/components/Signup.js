import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/");
    }
  });

  const collectData = async () => {
    console.warn(name, email, password);
    let result = await fetch("http://localhost:5008/api/v1/register", {
      method: "POST",
      body: JSON.stringify({ name, email, password }),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    result = await result.json();
    console.warn(result);

    localStorage.setItem("user", JSON.stringify(result));

    if (result) {
      navigate("/");
    }
  };

  return (
    <div className="register">
      <h1>Register</h1>
      <input
        className="inputBox"
        type="text"
        onChange={(e) => setName(e.target.value)}
        value={name}
        placeholder="Enter Name"
      ></input>

      <input
        className="inputBox"
        type="email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        placeholder="Enter Email"
      ></input>

      <input
        className="inputBox"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        placeholder="Enter Password"
      ></input>

      <button onClick={collectData} className="appButton" type="button">
        Sign Up
      </button>
    </div>
  );
};

export default Signup;
