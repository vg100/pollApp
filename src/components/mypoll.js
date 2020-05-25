import React from "react";
export default function Mypoll() {
  const [polls, setPolls] = React.useState([]);
  React.useEffect(() => {
    fetch("http://localhost:8000/user/mypoll", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
        authorization: localStorage.getItem("token")
      }
    })
      .then(response => response.json())
      .then(data => {
        setPolls(data);
      });
  }, []);

  console.log(polls);
  return (
    <div class="container">
      <div class="center">
        <h2>My Polls</h2>
        <br />
        <ul class="list-group">
          {polls.map((d, i) => (
            <a key={i} class="poll-list" href={`/poll/${d._id}`}>
              <li class="list-group-item">{d.title}</li>
            </a>
          ))}
        </ul>
      </div>
    </div>
  );
}
