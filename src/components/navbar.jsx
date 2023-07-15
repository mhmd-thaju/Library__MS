import "./navbar.css";
import { Link } from "react-router-dom";
import { auth } from "../config/firebase";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";

export const Navbar = () => {
  const [user] = useAuthState(auth);
  const signUserOut = async () => {
    await signOut(auth);
  };

  return (
    <div className="navbar">
      <h2 className="head">Library Mangement System</h2>
      <div className="links">
        {!user && (
          <>
            <Link to="/login" className="h">
              Login
            </Link>
          </>
        )}
      </div>
      <div className="profile">
        {user && (
          <>
            <p>{user?.displayName}</p>

            <img src={user?.photoURL || ""} width="50" height="50" />
            <button onClick={signUserOut}>Sign Out</button>
          </>
        )}
      </div>
    </div>
  );
};
