import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/login");
    }
  });

  const notify = (name) =>
    toast(`${name} Already Registered... 
  Please Login`);
  const notify2 = () => {
    toast(`Registration Succesfull`);
  };
  const passwordToast = () => {
    toast("Password less than 6 characters");
  };
  const emailToast = () => {
    toast("Please enter valid email address");
  };
  const userNameToast = () => {
    toast("Please enter username");
  };

  function ValidateEmail(mail) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
      return true;
    }
    // alert("You have entered an invalid email address!")
    return false;
  }
  const validationCheck = () => {
    let count = 0;
    if (password?.length < 6) {
      passwordToast();
      count++;
    }
    if (name?.length < 1) {
      userNameToast();
      count++;
    }
    if (!ValidateEmail(email)) {
      emailToast();
      count++;
    }
    return count;
  };

  const collectData = async () => {
    console.log(name, email, password);
    if (validationCheck() > 0) {
      return;
    }
    try {
      let result = await fetch("http://localhost:5010/register", {
        method: "POST",
        body: JSON.stringify({ username: name, email, password }),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      if (result.status === 240) {
        notify(name);
      }
      if (result.status === 220) {
        notify2();
      }
      result = await result.json();
      console.warn(result);

      if (result) {
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    } catch (error) {
      console.log("Error occurred in Sign up");
    }
  };

  return (
    <div className="register">
      <ToastContainer autoClose={2000} />
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
