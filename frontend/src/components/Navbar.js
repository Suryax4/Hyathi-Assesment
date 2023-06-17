import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const auth = localStorage.getItem("user");
  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    navigate("/signup");
  };

  return (
    <div>
      <img
        src="data:image/png;base64,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"
        className="logo"
        alt="logo"
      />
      {auth ? (
        <ul className="nav-ul">
          <li>
            <Link to="/"> Adopted Pokemon </Link>
          </li>

          <li>
            <Link to="/update"> Feed Pokemon </Link>
          </li>

          <li>
            <Link onClick={logout} to="/signup">
              {" "}
              Logout ({JSON.parse(auth).data.name}){" "}
            </Link>
          </li>
        </ul>
      ) : (
        <ul className="nav-ul nav-right">
          <li>
            <Link to="/signup"> SignUp </Link>{" "}
          </li>
          <li>
            <Link to="/login"> Login </Link>
          </li>
        </ul>
      )}
    </div>
  );
};

export default Navbar;
