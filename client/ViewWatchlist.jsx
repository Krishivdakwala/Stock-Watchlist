// import React, { useState, useEffect } from "react";
// import axiosApi from "../../api/axiosApi";
// import DeleteIcon from "@material-ui/icons/Delete";
// import MainScreen from "../../components/MainScreen";
// import NotificationsIcon from "@material-ui/icons/Notifications";
// import { Table, Button, Form, Dropdown, DropdownButton } from "react-bootstrap";
// import { Link } from "react-router-dom";
// import Grid from "@material-ui/core/Grid";
// import AddCircleIcon from "@material-ui/icons/AddCircle";
// import Modal from "@material-ui/core/Modal";
// import { makeStyles } from "@material-ui/core";
// import AddIcon from "@material-ui/icons/Add";

// import { useSelector } from "react-redux";

// function getModalStyle() {
//   const top = 50;
//   const left = 50;
//   return {
//     top: `${top}%`,
//     left: `${left}%`,
//     transform: `translate(-${top}%, -${left}%)`,
//     width: `${top}`,
//   };
// }

// const useStyles = makeStyles((theme) => ({
//   modal: {
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   paper: {
//     position: "absolute",
//     width: 600,
//     height: 600,
//     backgroundColor: theme.palette.background.paper,
//     boxShadow: theme.shadows[5],
//     padding: theme.spacing(2, 4, 3),
//     overflow: "scroll",
//   },
// }));

// const ViewWatchlist = (props) => {
//   const classes = useStyles();
//   // console.log(props.location.state);
//   const { stockIds, watchlistName } = props.location.state;
//   const [allStocks, setAllStocks] = useState([]);
//   const [myStockIds, setMyStocksIds] = useState(stockIds);
//   const [myStocks, setMyStocks] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [open, setOpen] = useState(false);
//   const [modalStyle] = useState(getModalStyle);
//   const [date, setDate] = useState("");
//   const userLogin = useSelector((state) => state.userLogin);
//   const { userInfo } = userLogin;

//   const getAllStocks = async () => {
//     try {
//       const stocksData = await axiosApi.get("/markets");
//       setAllStocks(() => stocksData.data.data);
//       setDate(() => stocksData.data.data[0].refreshedOn);
//     } catch (e) {
//       console.log(e);
//       alert(e);
//     }
//   };

//   const handleOpen = () => {
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//   };

//   const fetchStockData = async () => {
//     setLoading(true);
//     for (var i in myStockIds) {
//       const res = await axiosApi.get(`/markets/${stockIds[i]}`);
//       // console.log(res.data);
//       const temp = myStocks;
//       temp.push(res.data.data);
//       setMyStocks(() => temp);
//     }
//     setLoading(false);
//   };

//   const getWatchlist = async () => {
//     setLoading(true);
//     try {
//       const res = await axiosApi.post(`/watchlists/view`, {
//         userId: userInfo._id,
//         watchlistName: watchlistName,
//       });

//       console.log("Watchlist : ", res.data);
//       // setMyStocksIds(()=>res.data.data.)
//       setMyStocks(() => res.data.data.stocks);
//       setLoading(false);
//     } catch (e) {
//       console.log(e);
//     }

//     // setLoading(false);
//   };

//   const addStock = async (item) => {
//     setLoading(true);
//     try {
//       const res = await axiosApi.post("/watchlists/addStock", {
//         userId: userInfo._id,
//         watchlistName: watchlistName,
//         stockId: item._id,
//       });
//       console.log(res);
//       setLoading(false);
//       getWatchlist();
//       handleClose();
//     } catch (e) {
//       console.log(e);
//       setLoading(false);
//       alert(e);
//     }
//   };

//   useEffect(() => {
//     // fetchStockData();
//     // getWatchlist();
//     getAllStocks();
//   }, [myStocks]);

//   var data;
//   if (loading === true) {
//     data = <h2>Loading Your Watchlist</h2>;
//   } else {
//     if (myStocks.length === 0) {
//       data = <h2>Watchlist is Empty !!</h2>;
//     } else {
//       data = (
//         <>
//           <Grid container direction="column" alignItems="center">
//             <div
//               onClick={handleOpen}
//               style={{ textDecoration: "none", cursor: "pointer" }}
//             >
//               <AddCircleIcon fontSize="large" style={{ fill: "blue" }} />
//               Add Stock
//             </div>
//           </Grid>

//           <Modal
//             aria-labelledby="simple-modal-title"
//             aria-describedby="simple-modal-description"
//             open={open}
//             onClose={handleClose}
//           >
//             <div style={modalStyle} className={classes.paper}>
//               <h2>Select Stock to Add</h2>
//               {
//                 <div>
//                   <br />
//                   <Table striped bordered hover>
//                     <thead>
//                       <tr>
//                         <th>#</th>
//                         <th>Name</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {allStocks.map((item, index) => {
//                         return (
//                           <tr key={index}>
//                             <td> {index + 1} </td>
//                             <td> {item.stockName}</td>
//                             <th>
//                               <Button
//                                 onClick={() => addStock(item)}
//                                 style={{ padding: 0 }}
//                               >
//                                 <AddIcon fontSize="large" />
//                               </Button>
//                             </th>
//                           </tr>
//                         );
//                       })}
//                     </tbody>
//                   </Table>
//                 </div>
//               }
//             </div>
//           </Modal>

//           <br />
//           <Table striped bordered hover>
//             <thead>
//               <tr>
//                 <th>#</th>
//                 <th>Name</th>
//                 <th>Open</th>
//                 <th>High</th>
//                 <th>Low</th>
//                 <th>Close</th>
//                 <th>Volume</th>
//                 <th>Dividend</th>
//                 <th>Details</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {myStocks.map((item, index) => {
//                 return (
//                   <tr key={index}>
//                     <td> {index + 1} </td>
//                     <td> {item.stockName}</td>
//                     <td>{item.stockPrices[0].open}</td>
//                     <td>{item.stockPrices[0].high}</td>
//                     <td>{item.stockPrices[0].low}</td>
//                     <td>{item.stockPrices[0].close}</td>
//                     <td>{item.stockPrices[0].volume}</td>
//                     <td>{item.stockPrices[0].dividend}</td>
//                     <th>
//                       <Link
//                         to={{
//                           pathname: "/stocks",
//                           state: {
//                             stockData: item,
//                           },
//                         }}
//                         style={{ textDecoration: "inherit" }}
//                       >
//                         View More
//                       </Link>
//                     </th>
//                     <th>
//                       <Button
//                         to={{
//                           pathname: "/stocks",
//                           state: {
//                             stockData: item,
//                           },
//                         }}
//                         style={{ textDecoration: "inherit", marginRight: 10 }}
//                       >
//                         <NotificationsIcon />
//                       </Button>

//                       <Button
//                         to={{
//                           pathname: "/stocks",
//                           state: {
//                             stockData: item,
//                           },
//                         }}
//                         style={{ textDecoration: "inherit" }}
//                       >
//                         <DeleteIcon />
//                       </Button>
//                     </th>
//                   </tr>
//                 );
//               })}
//             </tbody>
//           </Table>
//         </>
//       );
//     }
//   }

//   return (
//     <div>
//       <MainScreen title={watchlistName}>{data}</MainScreen>
//     </div>
//   );
// };

// export default ViewWatchlist;
