import React from "react";
import { Button } from "react-bootstrap";

import { NavLink, useHistory } from "react-router-dom";

const Main = () => {
  return (
    <div>
      <h2>This is landing screen</h2>
      <NavLink to={"/register"}>
        <Button variant="primary">Register</Button>
      </NavLink>
      <NavLink to={"/login"}>
        <Button variant="primary">Log In</Button>
      </NavLink>
    </div>
  );
};

export default Main;
