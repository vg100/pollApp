import React from "react";
import logo from "./vote.png";
export default function Nav() {
  const [poll, setPoll] = React.useState([]);
  React.useEffect(() => {
    fetch("http://localhost:8000/poll")
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setPoll(data);
      });
  }, []);

  return (
    <div class="container">
      <div class="jumbotron center">
        <h1>
          Lets
          <span>
            <img src={logo} alt="myimage" height="95px" width="95px" />
          </span>
        </h1>
        <p>Create your own polls and ask others to vote.</p>
      </div>

      <div class=" center">
        {/* <div class="alert alert-success">sc</div>

        <div class="alert alert-danger">scs</div> */}

        <h3>Recent Polls</h3>
        <br />
        <ul class="list-group">
          {poll.map((d, i) => (
            <a class="poll-list" href={`/poll/${d._id}`} key={i}>
              <li class="list-group-item active">{d.title}</li>
            </a>
          ))}
          {poll.length < 1 && (
            <div>
              No polls created yet. <a href="/users/login">Login</a> to create a
              poll
            </div>
          )}
        </ul>
      </div>
      <br />
      <br />
    </div>
  );
}
