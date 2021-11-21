import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Markets from "./pages/Markets";
import Watchlist from "./pages/WatchlistScreen/Watchlist";
import LoginScreen from "./pages/LoginScreen/LoginScreen";
import RegisterScreen from "./pages/RegisterScreen/RegisterScreen";
import Main from "./pages/Main";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ViewWatchlist from "./pages/WatchlistScreen/ViewWatchlist";
import NewsScreen from "./pages/NewsScreen/NewsScreen";

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
          <Route exact path="/news" component={NewsScreen} />
          <Route exact path="/watchlists/view" component={ViewWatchlist} />
          <Route exact path="/watchlists" component={Watchlist} />
        </Switch>
      </div>
      <Footer />
    </Router>
  );
};

export default App;
