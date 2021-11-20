import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Markets from "./pages/Markets";
import Watchlist from "./pages/Watchlist";
import ViewWatchlists from "./pages/ViewWatchlists";
import LoginScreen from "./pages/LoginScreen/LoginScreen";
import RegisterScreen from "./pages/RegisterScreen/RegisterScreen";
import Main from "./pages/Main";
import Header from "./components/Header";
import Footer from "./components/Footer";

const App = () => {
  return (
    <Router>
      <Header />
      <div className="App">
        <Switch>
          <Route exact path="/" component={Main} />
          <Route exact path="/register" component={RegisterScreen} />
          <Route exact path="/login" component={LoginScreen} />
          <Route exact path="/markets" component={Markets} />
          <Route exact path="/watchlists" component={Watchlist} />
          <Route exact path="/viewWatchlists" component={ViewWatchlists} />
        </Switch>
      </div>
      <Footer />
    </Router>
  );
};

export default App;
