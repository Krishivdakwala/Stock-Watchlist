import React from "react";
import MainScreen from "../../components/MainScreen";

import { Table } from "react-bootstrap";

const StockScreen = (props) => {
  const stockData = props.location.state.stockData;
  return (
    <MainScreen title="Stock Detail ">
      <h2>Stock Name : {stockData.stockName}</h2>
      <br />
      <h4>Last Refreshed : {stockData.refreshedOn}</h4>
      <br />
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Date</th>
            <th>Open</th>
            <th>High</th>
            <th>Low</th>
            <th>Close</th>
            <th>Volume</th>
            <th>Dividend</th>
          </tr>
        </thead>
        <tbody>
          {stockData.stockPrices.map((item, index) => {
            return (
              <tr key={index}>
                <td> {index + 1} </td>
                <td>{item.date}</td>
                <td>{item.open}</td>
                <td>{item.high}</td>
                <td>{item.low}</td>
                <td>{item.close}</td>
                <td>{item.volume}</td>
                <td>{item.dividend}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </MainScreen>
  );
};

export default StockScreen;
