import React, { useEffect } from "react";
import { Button } from "react-bootstrap";

import { NavLink, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import MainScreen from "../components/MainScreen";

const Main = ({ history }) => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) {
      history.push("/markets");
    }
  }, [history, userInfo]);
  return (
    <div>
      <MainScreen>
        <h2>This is landing screen</h2>
        <NavLink to={"/register"}>
          <Button variant="primary">Register</Button>
        </NavLink>
        <NavLink to={"/login"}>
          <Button variant="primary">Log In</Button>
        </NavLink>
      </MainScreen>
    </div>
  );
};

export default Main;
