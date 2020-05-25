import React from "react";
import "./styles.css";
import Nav from "./components/nev";
import Login from "./components/login";
import Logout from "./components/logout";
import Createpoll from "./components/createpoll";
import Mypoll from "./components/mypoll";
import poll from "./components/poll";
import Homepage from "./components/homepage";
import router from "react-router-dom";

function App() {
  return (
    <router.BrowserRouter>
      <div>
        <Nav />
        <br />
        <router.Switch>
          <router.Route path="/" exact component={Homepage} />
          <router.Route path="/login" component={Login} />
          <router.Route path="/poll/:id" component={poll} />
          <router.Route path="/new" component={Createpoll} />
          <router.Route path="/mypoll" component={Mypoll} />
          <router.Route path="/logout" component={Logout} />
        </router.Switch>
      </div>
    </router.BrowserRouter>
  );
}
export default App;
