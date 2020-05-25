import React from "react";
import router from "react-router-dom";

export default function Createpoll() {
  const [title, setTitle] = React.useState("");
  const [options, setOptions] = React.useState("");

  function submitFormHandler(e) {
    e.preventDefault();
    fetch("http://localhost:8000/poll/new", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
        authorization: localStorage.getItem("token")
      },
      body: JSON.stringify({
        title: title,
        options: options
      })
    })
      .then(response => response.json())
      .then(data => {
        if (data.Redirect) {
          console.log("good");
        }
      });
  }
  function home() {
    return <router.Redirect to="/" />;
  }
  const token = localStorage.getItem("token");
  let loggedIn = true;

  if (token == null) {
    loggedIn = false;
  }

  if (loggedIn === false) {
    return <router.Redirect to="/login" />;
  } else {
    return (
      <div class="container">
        <main>
          <h2>Create a new poll</h2>
          <br />
          <br />
          <form method="post" onSubmit={submitFormHandler}>
            <div class="form-group">
              <label>Poll Question:</label>
              <input
                type="text"
                class="form-control"
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="Title"
                name="title"
                required
              />
            </div>
            <div class="form-group">
              <label>Options (Separated by semicolon):</label>
              <textarea
                value={options}
                onChange={e => setOptions(e.target.value)}
                id="options"
                class="options form-control"
                name="options"
                rows="5"
                cols="50"
              />
            </div>
            <button type="submit" onClick={home} class="btn btn-primary">
              Create Poll
            </button>
          </form>
        </main>
      </div>
    );
  }
}
