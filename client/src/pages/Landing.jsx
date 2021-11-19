import React from "react";
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
import { NavLink, useHistory } from "react-router-dom";
import Video from "./video.mp4";

const Landing = () => {
  return (
    <>
      <HeaderContainer>
        <HeaderBG>
          <VideoBG autoPlay loop muted src={Video} type="video/mp4" />
        </HeaderBG>
        <NavLink to={"/login"}>
          <GreenBtn>Sign In</GreenBtn>
        </NavLink>
        <HeaderContent>
          <HeaderH1>Website Name</HeaderH1>
          <NavLink to={"/signup"}>
            <HeaderBtn>Sign Up</HeaderBtn>
          </NavLink>
        </HeaderContent>
      </HeaderContainer>
    </>
  );
};

export default Landing;
