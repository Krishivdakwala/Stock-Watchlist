const axios = require("axios");
const express = require("express");
const router = express.Router();

const getStockData = async (symbol) => {
  var options = {
    method: "GET",
    url: "https://alpha-vantage.p.rapidapi.com/query",
    params: {
      function: "TIME_SERIES_DAILY_ADJUSTED",
      symbol: `${symbol}.BSE`,
      datatype: "json",
      output_size: "compact",
    },
    headers: {
      "x-rapidapi-host": "alpha-vantage.p.rapidapi.com",
      "x-rapidapi-key": "941a647c08msh620bdda4c1d4e13p1c6befjsnba999b578629",
    },
  };

  try {
    const response = await axios.request(options);
    currentData = response.data["Time Series (Daily)"]["2021-11-11"];

    const stockData = {
      lastRefresh: response.data["Meta Data"]["3. Last Refreshed"],
      symbol: response.data["Meta Data"]["2. Symbol"],
      open: currentData["1. open"],
      high: currentData["2. high"],
      low: currentData["3. low"],
      close: currentData["4. close"],
      volume: currentData["6. volume"],
      dividend: currentData["7. dividend amount"],
    };

    return stockData;
  } catch (err) {
    console.log("Error : ", err);
  }
};

router.get("/", async (req, res) => {
  const stocks = [
    "RELIANCE",
    "HDFC",
    "SBIN",
    "TCS",
    "INFY",
    // "IRCTC",
    // "SUNPHARMA",
    // "MUTHOOTFIN",
    // "TATAMOTORS",
    // "IDEA",
  ];

  const stocksData = [];

  //   stocks.map(async (stk) => {
  //     const stockData = await getStockData(stk);
  //     console.log("In For Loop : ", stockData, " Done");
  //     stocksData.push(stockData);
  //   });

  for (var i in stocks) {
    const stockData = await getStockData(stocks[i]);
    // console.log("In For Loop : ", stockData, " Done");
    stocksData.push(stockData);
  }

  // console.log(stocksData);
  res.json(stocksData);
});

module.exports = router;
