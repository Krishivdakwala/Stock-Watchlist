import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axiosApi from "../api/axiosApi";

import MainScreen from "../components/MainScreen";
import { Table } from "react-bootstrap";

const Markets = () => {
  const [stocks, setStocks] = useState([]);
  const [date, setDate] = useState("");
  const getStocks = async () => {
    try {
      const stocksData = await axiosApi.get("/markets");
      console.log(stocksData);
      setStocks(() => stocksData.data);
      setDate(() => stocksData.data[0].refreshedOn);
    } catch (e) {
      console.log(e);
      alert(e);
    }
  };

  useEffect(() => {
    getStocks();
  }, []);

  var table = <h2>Loading Your Data</h2>;

  if (stocks) {
    table = (
      <div>
        <h2>Data As On : {date}</h2>
        <br />
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
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    );
  }

  return <MainScreen title="Markets">{table}</MainScreen>;
};

export default Markets;
