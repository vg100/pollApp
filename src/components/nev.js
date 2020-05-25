import React from "react";
import logo from "./vote.png";
import router from "react-router-dom";

export default function Nav() {
  const token = localStorage.getItem("token");

  function logout() {
    localStorage.removeItem("token");
    return <router.Redirect to="/" />;
  }
  return (
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top ">
      <div class="container">
        <a class="navbar-brand" href="/">
          Online
          <img src={logo} alt="myimg" width="40" height="40" />
          System
        </a>

        <div id="nav-mobile" class="right hide-on-med-and-down">
          <ul class="navbar-nav ml-auto">
            {token && (
              <li class="nav-item">
                <a class="nav-link" href="/">
                  VIJAY
                </a>
              </li>
            )}

            <li class="nav-item">
              <a class="nav-link" href="/new">
                Create New Poll
              </a>
            </li>

            {token && (
              <li class="nav-item">
                <a class="nav-link" href="/mypoll">
                  My Polls
                </a>
              </li>
            )}
            {token && (
              <li class="nav-item">
                <a class="nav-link" onClick={logout} href="/">
                  Logout
                </a>
              </li>
            )}
            {!token && (
              <li class="nav-item">
                <a class="nav-link" href="/login">
                  Login
                </a>
              </li>
            )}
            {!token && (
              <li class="nav-item">
                <a class="nav-link" href="/register">
                  Sign Up
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
