import React, { useEffect } from "react";
import { Divider } from "@material-ui/core";
import { Form, Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { motion } from "framer-motion/dist/es/index";
import Fade from "react-reveal/Fade";
import AddIcon from "@material-ui/icons/Add";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import MainScreen from "../../components/MainScreen";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import Grid from "@material-ui/core/Grid";
import { TextField } from "@material-ui/core";
import { useState } from "react";
import { makeStyles } from "@material-ui/core";
import Modal from "@material-ui/core/Modal";

import axiosApi from "../../api/axiosApi";

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();
  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const submitHandler = (e) => {
  e.preventDefault();
  console.log("Created");
};

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    position: "absolute",
    width: 450,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const Watchlist = () => {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const [watchlistName, setWatchlistName] = useState("");

  const [watchlists, getWatchlists] = useState([]);

  const fetchWatchlists = async () => {
    await axiosApi
      .post("/watchlists/view", { userId: "6198bffdee0f932f1901c02f" })
      .then((response) => {
        // console.log(response);
        const allwatchlists = response.data.data.watchlist;
        console.log(allwatchlists);
        getWatchlists(() => allwatchlists);
      })
      .catch((error) => {
        console.log(`Errors : ${error}`);
        alert(error);
      });
  };

  useEffect(() => {
    fetchWatchlists();
  }, []);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  let content = [
    {
      title: "Watch List 1",
      cardContent: "",
      path: "/watchlist",
    },
    {
      title: "Watch List 2",
      cardContent: "",
      path: "/viewWatchlists",
    },
    {
      title: "Watch List 3",
      cardContent: "",
      path: "/viewWatchlists",
    },
  ];
  return (
    <MainScreen title="Watchlists">
      <Fade>
        <div onClick={handleOpen} style={{ textDecoration: "none" }}>
          <Grid container direction="row" alignItems="center">
            <Grid item>
              <AddCircleIcon fontSize="large" style={{ fill: "blue" }} />
            </Grid>
            <Grid item>Add</Grid>
          </Grid>
        </div>

        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={open}
          onClose={handleClose}
        >
          <div style={modalStyle} className={classes.paper}>
            <h2>Enter Watchlist Name</h2>
            <Form onSubmit={(submitHandler, handleClose)}>
              <Form.Group controlId="formBasicEmail">
                <Form.Control
                  value={watchlistName}
                  placeholder="Watchlist Name"
                  onChange={(e) => setWatchlistName(e.target.value)}
                />
              </Form.Group>
              <br />
              <Button variant="primary" type="submit">
                Create
              </Button>
            </Form>
          </div>
        </Modal>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            color: "white",
          }}
        >
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-around",
              flexWrap: "wrap",
              alignItems: "center",
              marginTop: "30px",
            }}
          >
            {watchlists.map((item, index) => {
              return (
                <motion.div
                  key={index}
                  initial={{
                    backgroundColor: "#00182E",
                    color: "#fff",
                    borderRadius: "5px",
                    cursor: "pointer",
                    margin: "10px",
                    width: "300px",
                    height: "150px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexDirection: "column",
                  }}
                  whileHover={{
                    boxShadow: "3px 2px 2px  aqua",
                    scale: "1.1",
                    transition:
                      "transform 6s cubic-bezier(0.075, 0.82, 0.165, 1)",
                  }}
                >
                  <motion.div
                    initial={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      width: "300px",
                    }}
                    whileHover={{ backgroundColor: "#02203C" }}
                  >
                    <Link
                      to={{
                        pathname: `/watchlists/view`,
                        state: {
                          stocks: item.stocks,
                          data: 123,
                        },
                      }}
                      style={{ textDecoration: "inherit" }}
                    >
                      <div style={{ width: "270px" }}>
                        <h2>{item.name}</h2>
                        <p>{item.userId}</p>
                      </div>
                    </Link>
                  </motion.div>

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      width: "150px",
                      margin: "5px",
                    }}
                  >
                    <Link
                      to={item.path}
                      style={{
                        textDecoration: "none",
                        color: "#C51162",
                        margin: "5px",
                      }}
                    >
                      <EditIcon />
                    </Link>
                    <Link
                      to={item.path2}
                      style={{
                        textDecoration: "none",
                        color: "#303F9F",
                        margin: "5px",
                      }}
                    >
                      <DeleteIcon />
                    </Link>
                  </div>
                </motion.div>
              );
            })}

            {/* {watchlists.map((item) => {
              return (
                <div key={item._id}>
                  <h1>123- {item.name}</h1>
                  <h2>{item.userId}</h2>
                </div>
              );
            })} */}
          </div>
        </div>
      </Fade>
    </MainScreen>
  );
};

export default Watchlist;
