import React, { useContext, useEffect, useState } from "react";
import Logo from "../../assets/evan_logo.png"; // Adjusted to use the logo from the second component
import classes from "./header.module.css"; // Keeping the class names from the second component
import { Link, useNavigate } from "react-router-dom";
// import { DataContext } from "../DataProvider/DataProvider";
import { AppState } from "../../App";

function Header() {
  const navigate = useNavigate();
  const { user } = useContext(AppState);
  const [token, setToken] = useState(null);

  useEffect(() => {
    try {
      const storedToken = localStorage.getItem("token");
      console.log("Stored token:", storedToken); // Log the token value
      setToken(storedToken);
    } catch (error) {
      console.error("Error retrieving token from localStorage:", error);
      setToken(null); // Set token to null in case of an error
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null); // Updated to set token to null
    navigate("/");
    window.location.reload();
  };

  return (
    <div>
      <nav className={classes.header}>
        <div>
          {/* evangadi logo */}
          <Link to="/">
            <img src={Logo} alt="Evangadi Logo" />
          </Link>
        </div>

        <div>
          <ul className={classes.header_list}>
            <Link className={classes.homelink} to='/home'>
              <li>Home</li>
            </Link>
            <Link to='#'>
              <li>How It Works</li>
            </Link>
            <li>
              {user.msg === "Authentication invalid-1" || user.msg === "Authentication invalid-2" ? (
                <button className={classes.log_button}>Log In</button>
              ) : (
                <button className={classes.log_button} onClick={logout}>Log Out</button>
              )}
            </li>
          </ul>
        </div>
      </nav>
      <hr />
    </div>
  );
}

export default Header;
