import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axiosApi from "../api/axiosApi";

import MainScreen from "../components/MainScreen";

const Markets = () => {
  const [stocks, setStocks] = useState([]);
  const getStocks = async () => {
    try {
      const stocksData = await axiosApi.get("/markets");
      console.log(stocksData);
      setStocks(() => stocksData.data);
    } catch (e) {
      console.log(e);
      alert(e);
    }
  };

  useEffect(() => {
    getStocks();
  }, []);

  return (
    <MainScreen title="Markets">
      <div>
        <h1>Markets Data Here</h1>

        {stocks.map((item, index) => {
          return (
            <div key={index}>
              <p>
                {item.stockName}

                <Link
                  to={{
                    pathname: "/stocks",
                    state: {
                      stockData: item,
                    },
                  }}
                  style={{ textDecoration: "inherit" }}
                >
                  View
                </Link>
              </p>
            </div>
          );
        })}
      </div>
    </MainScreen>
  );
};

export default Markets;
