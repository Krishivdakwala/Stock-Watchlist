import React, { useEffect } from "react";
import { Button } from "react-bootstrap";
import {
  HeaderContainer,
  HeaderBG,
  VideoBG,
  HeaderContent,
  HeaderH1,
  WhiteBtn,
  GreenBtn,
  HeaderBtn,
} from "../components/LandingElements";
import Video from "./video.mp4";
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
    <>
      {/* <MainScreen>
        <h2>This is landing screen</h2>
        <NavLink to={"/register"}>
          <Button variant="primary">Register</Button>
        </NavLink>
        <NavLink to={"/login"}>
          <Button variant="primary">Log In</Button>
        </NavLink>
      </MainScreen> */}
      <HeaderContainer>
        <HeaderBG>
          <VideoBG autoPlay loop muted src={Video} type="video/mp4" />
        </HeaderBG>
        <HeaderContent>
          <HeaderH1>Stock Watchlist</HeaderH1>
        </HeaderContent>
      </HeaderContainer>
    </>
  );
};

export default Main;
