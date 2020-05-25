import React from "react";
import Pie from "./pieChart";

export default function Poll(props) {
  const { id } = props.match.params;
  const [profile, setProfile] = React.useState([]);
  const [options, setOptions] = React.useState([]);
  const [getOption, setOption] = React.useState();

  React.useEffect(() => {
    fetch(`http://localhost:8000/poll/${id}`)
      .then(response => response.json())
      .then(data => {
        setProfile(data);
        setOptions(data.option);
      });
  }, [id]);

  //for deleting the poll
  function deletehandle() {
    fetch(`http://localhost:8000/poll/removepoll/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
        authorization: localStorage.getItem("token")
      }
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
      });
  }
  function getRandomColor() {
    var letters = "0123456789ABCDEF";
    var color = "#";
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  function generateRandomInteger(min, max) {
    return Math.floor(min + Math.random() * (max + 1 - min));
  }

  var arr = options.map(data => ({
    title: data.option,
    value: generateRandomInteger(5, 2),
    color: getRandomColor()
  }));
  console.log(arr);
  const data = arr;

  //for poll submission // fetch(`http://localhost:8000/poll/updatepoll`, {
  function submitFormHandler(e) {
    e.preventDefault();

    fetch(`http://localhost:8000/poll/updatepoll`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
        authorization: localStorage.getItem("token")
      },
      body: JSON.stringify({
        poll_id: id,
        options: options,
        getOption: getOption
      })
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
      });
  }

  const token = localStorage.getItem("token");
  return (
    <div class="container">
      <br />
      <div class="row">
        <div class="col-xs-12 col-sm-5">
          <h1>{profile.title}</h1>
          <span>
            <em>by {profile.creator}</em>
          </span>
          <br />
          <br />
          <h3>Options</h3>
          <br />
          <div>
            <form onSubmit={submitFormHandler}>
              <select
                onChange={e => setOption(e.target.value)}
                value={getOption}
                class="form-control"
              >
                <option value="none" selected disabled hidden>
                  Select an Option
                </option>
                {options.map((d, i) => (
                  <option key={i} type="radio" name="option" value={d.option}>
                    {d.option}
                  </option>
                ))}
                ;
              </select>
              <br />
              {!token && (
                <div class="alert alert-info">
                  You must be logged in to vote
                </div>
              )}
              {token && (
                <button type="submit" class="btn btn-primary btn-block">
                  Vote
                </button>
              )}

              <a
                type="button"
                href="https://twitter.com/intent/tweet?text=How is your mood? http://kunal-voting-app.herokuapp.com/polls/5a3cb08e5485010004026788"
                class="btn btn-block twitter"
              >
                Share on twitter
              </a>
            </form>
            <br />
            {token && (
              <a
                onClick={deletehandle}
                type="button"
                href="/"
                class="btn btn-block btn-danger"
              >
                Remove this Poll
              </a>
            )}
          </div>
        </div>
        <div class="chart  col-sm-2 " />

        <div class="chart col-xs-12 col-sm-4 ">
          <Pie data={data} />
        </div>
      </div>
    </div>
  );
}
