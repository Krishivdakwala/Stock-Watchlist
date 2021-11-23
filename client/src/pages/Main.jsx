import React, { useEffect } from "react";
import logo from './logo.png'
import logo2 from './logo2.png'
import logo2green from './logo2green.png'
import {
  HeaderContainer,
  HeaderBG,
  VideoBG,
  HeaderContent,
  HeaderH1,
} from "../components/LandingElements";
import Video from "./video.mp4";
import { useSelector } from "react-redux";

const Main = ({ history }) => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  // useEffect(() => {
  //   if (userInfo) {
  //     history.push("/markets");
  //   }
  // }, [history, userInfo]);
  return (
    <>
      <HeaderContainer>
        <HeaderBG>
          <VideoBG autoPlay loop muted src={Video} type="video/mp4" />
        </HeaderBG>
        <HeaderContent style={{marginBottom: "100px"}}>
          <HeaderH1>Stockerzz <img src={logo2green} /></HeaderH1>
        </HeaderContent>
      </HeaderContainer>
    </>
  );
};

export default Main;
