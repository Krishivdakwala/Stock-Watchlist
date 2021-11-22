import React, { useState, useEffect } from "react";
import axiosApi from "../../api/axiosApi";

import MainScreen from "../../components/MainScreen";

import { Table, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const ViewWatchlist = (props) => {
  // console.log(props.location.state);
  const { stockIds, watchlistName } = props.location.state;

  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchStocks = async () => {
    setLoading(true);
    for (var i in stockIds) {
      const res = await axiosApi.get(`/markets/${stockIds[i]}`);
      // console.log(res.data);
      const temp = stocks;
      temp.push(res.data.data);
      setStocks(() => temp);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchStocks();
    // console.log("Stocks : ", stocks);
  }, [stocks]);

  var data;
  if (loading === true) {
    data = <h2>Loading Your Watchlist</h2>;
  } else {
    if (stocks.length === 0) {
      data = <h2>Watchlist is Empty !!</h2>;
    } else {
      data = (
        <>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Open</th>
                <th>High</th>
                <th>Low</th>
                <th>Close</th>
                <th>Volume</th>
                <th>Dividend</th>
                <th>Details</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {stocks.map((item, index) => {
                return (
                  <tr key={index}>
                    <td> {index + 1} </td>
                    <td> {item.stockName}</td>
                    <td>{item.stockPrices[0].open}</td>
                    <td>{item.stockPrices[0].high}</td>
                    <td>{item.stockPrices[0].low}</td>
                    <td>{item.stockPrices[0].close}</td>
                    <td>{item.stockPrices[0].volume}</td>
                    <td>{item.stockPrices[0].dividend}</td>
                    <th>
                      <Link
                        to={{
                          pathname: "/stocks",
                          state: {
                            stockData: item,
                          },
                        }}
                        style={{ textDecoration: "inherit" }}
                      >
                        View More
                      </Link>
                    </th>
                    {/* <th>
                      <Button
                        to={{
                          pathname: "/stocks",
                          state: {
                            stockData: item,
                          },
                        }}
                        style={{ textDecoration: "inherit" }}
                      >
                        Bell Here
                      </Button>
  
                      <Button
                        to={{
                          pathname: "/stocks",
                          state: {
                            stockData: item,
                          },
                        }}
                        style={{ textDecoration: "inherit" }}
                      >
                        Remove
                      </Button>
                    </th> */}
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </>
      );
    }
  }

  return (
    <div>
      <MainScreen title={watchlistName}>{data}</MainScreen>
    </div>
  );
};

export default ViewWatchlist;
