import React from "react";
import router from "react-router-dom";

export default function Login() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loggedIn, setLoggedIn] = React.useState(false);
  const token = localStorage.getItem("token");
  var str = "";

  function submitFormHandler(e) {
    e.preventDefault();
    console.log(email, password);

    fetch(
      `http://localhost:8000/user/login?email=${email}&password=${password}`
    )
      .then(response => response.json())
      .then(data => {
        console.log(data.token);
        if (data.token === undefined) {
          str = "ckeck";
        } else {
          localStorage.setItem("token", data.token);
          setLoggedIn(true);
        }
      })
      .catch(err => (str = "check your password"));
  }
  if (!token) {
    str = "You Must Be Logged In to Create Poll";
  }
  if (loggedIn) {
    return <router.Redirect to="/new" />;
  } else if (token) {
    return <router.Redirect to="/new" />;
  } else {
    return (
      <div class="container">
        <div class="alert alert-success" />
        {str && <div class="alert alert-danger">{str}</div>}

        <h2 class="login-heading">Login to your Account</h2>

        <p>
          New user? Register <a href="/register">here</a>
        </p>
        <hr />
        <br />
        <form onSubmit={submitFormHandler}>
          <div class="form-group">
            <label>Email</label>
            <input
              autofocus=""
              type="email"
              class="form-control"
              name="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Email"
            />
          </div>
          <div class="form-group">
            <label>Password</label>
            <input
              type="password"
              class="form-control"
              name="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Password"
            />
          </div>
          <button type="submit" class="btn btn-success">
            Submit
          </button>
        </form>
      </div>
    );
  }
}
