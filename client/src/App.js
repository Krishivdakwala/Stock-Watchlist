import React from "react";
import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Markets from "./pages/Markets";
import Watchlist from "./pages/Watchlist";
import ViewWatchlists from "./pages/ViewWatchlists";

const App = () => {
  return (
    <div>
      <Router>
        <div className="App">
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route exact path="/markets" component={Markets} />
            <Route exact path="/watchlist" component={Watchlist} />
            <Route exact path="/viewWatchlists" component={ViewWatchlists} />
          </Switch>
        </div>
      </Router>
    </div>
  );
};

export default App;
