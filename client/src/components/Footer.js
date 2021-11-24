import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import GitHubIcon from "@material-ui/icons/GitHub";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import { Link } from "@material-ui/core";

const Footer = () => {
  return (
    <footer
      style={{
        width: "100%",
        position: "relative",
        bottom: 0,
        display: "flex",
        justifyContent: "center",
        // background: "#00182E",
        background: "black",
        color: "#ffff",
      }}
    >
      <Container style={{ marginBottom: 20 }}>
        <Row>
          <Col className="text-center py-3">
            Copyright &copy; Stock Watchlist
          </Col>
        </Row>
        <Row>
          <Col style={{ fontSize: "25px" }}>A Project By:</Col>

          <Col style={{ marginLeft: 20, marginTop: 9 }}>
            Akash Kulkarni
            <Link
              href="https://github.com/Akash-213"
              color="inherit"
              style={{ margin: 10 }}
            >
              <GitHubIcon fontSize="small" />
            </Link>
            <Link
              href="https://www.linkedin.com/in/akash213kulkarni"
              color="inherit"
            >
              <LinkedInIcon fontSize="medium" />
            </Link>
          </Col>

          <Col style={{ marginLeft: 20, marginTop: 9 }}>
            Krishiv Dakwala
            <Link
              href="https://github.com/Krishivdakwala"
              color="inherit"
              style={{ margin: 10 }}
            >
              <GitHubIcon fontSize="small" />
            </Link>
            <Link href="https://github.com/Krishivdakwala" color="inherit">
              <LinkedInIcon fontSize="medium" />
            </Link>
          </Col>

          <Col style={{ marginLeft: 20, marginTop: 9 }}>
            Zain Shaikh
            <Link
              href="https://github.com/Zain2605"
              color="inherit"
              style={{ margin: 10 }}
            >
              <GitHubIcon fontSize="small" />
            </Link>
            <Link href="https://github.com/Zain2605" color="inherit">
              <LinkedInIcon fontSize="medium" />
            </Link>
          </Col>

          <Col style={{ marginLeft: 20, marginTop: 9 }}>
            Ashish Patil
            <Link
              href="https://github.com/Ashish2451"
              color="inherit"
              style={{ margin: 10 }}
            >
              <GitHubIcon fontSize="small" />
            </Link>
            <Link
              href="https://www.linkedin.com/in/ashish-patil-35ba68205"
              color="inherit"
            >
              <LinkedInIcon fontSize="medium" />
            </Link>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
