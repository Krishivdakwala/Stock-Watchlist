import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axiosApi from "../api/axiosApi";
import { useSelector } from "react-redux";
import MainScreen from "../components/MainScreen";
import { Table } from "react-bootstrap";

const Markets = () => {
  const [stocks, setStocks] = useState([]);
  const [date, setDate] = useState("");

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const getStocks = async () => {
    try {
      const stocksData = await axiosApi.get("/markets");
      // console.log(stocksData);
      setStocks(() => stocksData.data.data);
      setDate(() => stocksData.data.data[0].refreshedOn);
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
              <th>Sr.No</th>
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
                    {userInfo ? (
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
                    ) : (
                      <Link
                        to={{
                          pathname: "/login",
                          state: {
                            stockData: item,
                          },
                        }}
                        style={{ textDecoration: "inherit" }}
                      >
                        Login To View More
                      </Link>
                    )}
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
