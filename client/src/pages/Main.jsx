import React, { useEffect } from "react";
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
        <HeaderContent>
          <HeaderH1>Stock Watchlist</HeaderH1>
        </HeaderContent>
      </HeaderContainer>
    </>
  );
};

export default Main;
