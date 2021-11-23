import React, { useEffect } from "react";
import { Divider } from "@material-ui/core";
import { Form, Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { motion } from "framer-motion/dist/es/index";
import Fade from "react-reveal/Fade";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import MainScreen from "../../components/MainScreen";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import Grid from "@material-ui/core/Grid";
import { TextField } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { useState } from "react";
import { makeStyles } from "@material-ui/core";
import Modal from "@material-ui/core/Modal";
import { useSelector } from "react-redux";

import axiosApi from "../../api/axiosApi";

function getModalStyle() {
  const top = 50;
  const left = 50;
  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
    width: `${top}`,
  };
}

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

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const fetchWatchlists = async () => {
    await axiosApi
      .post("/watchlists/view", { userId: userInfo._id })
      .then((response) => {
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

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log("Created", watchlistName);
    await axiosApi
      .post("/watchlists/create", {
        userId: userInfo._id,
        watchlistName: watchlistName,
      })
      .then((response) => {
        console.log(response);
        handleClose();
        fetchWatchlists();
      })
      .catch((error) => {
        console.log(`Errors : ${error}`);
        alert(error);
      });
  };

  const deleteHandler = async (name) => {
    console.log("Deleting", name);
    await axiosApi
      .post("/watchlists/delete", {
        userId: userInfo._id,
        watchlistName: name,
      })
      .then((response) => {
        console.log(response);
        fetchWatchlists();
      })
      .catch((error) => {
        console.log(`Errors : ${error}`);
        alert(error);
      });
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <MainScreen title="Watchlists">
      <Fade>
        <Grid container direction="column" alignItems="center">
          <div
            onClick={handleOpen}
            style={{ textDecoration: "none", cursor: "pointer" }}
          >
            <AddCircleIcon fontSize="large" style={{ fill: "blue" }} />
            Add
          </div>
        </Grid>

        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={open}
          onClose={handleClose}
        >
          <div style={modalStyle} className={classes.paper}>
            <h2>Enter Watchlist Name</h2>

            <Form onSubmit={submitHandler}>
              <Form.Control
                value={watchlistName}
                placeholder="Watchlist Name"
                onChange={(e) => {
                  // console.log(e.target.value);
                  setWatchlistName(e.target.value);
                }}
              />
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
                    width: "330px",
                    height: "165px",
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
                    {/* <Link
                      to={{
                        pathname: `/watchlists/view`,
                        state: {
                          stocks: item.stocks,
                        },
                      }}
                      style={{ textDecoration: "inherit" }}
                    > */}
                    <div style={{ width: "270px" }}>
                      <h2>{item.name}</h2>
                    </div>
                    {/* </Link> */}
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
                      to={{
                        pathname: `/watchlists/view`,
                        state: {
                          watchlistName: item.name,
                        },
                      }}
                      style={{ textDecoration: "inherit" }}
                    >
                      <EditIcon 
                        style={{
                        textDecoration: "none",
                        color: "#ffffff",
                        margin: "5px",
                        
                        }}
                      />
                    </Link>

                    <DeleteIcon
                      onClick={() => deleteHandler(item.name)}
                      style={{
                        textDecoration: "none",
                        color: "#ffffff",
                        margin: "5px",
                      }}
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </Fade>
    </MainScreen>
  );
};

export default Watchlist;
