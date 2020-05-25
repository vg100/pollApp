import React from "react";
import router from "react-router-dom";

export default function Logout() {
  return (
    <div>
      <h1>Logout Page hai</h1>
      <router.Link to="/login">Login</router.Link>
    </div>
  );
}
