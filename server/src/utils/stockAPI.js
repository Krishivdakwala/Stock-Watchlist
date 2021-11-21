const axios = require("axios");

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

    return response.data;
  } catch (err) {
    console.log("Error : ", err);
    // return err;
  }
};

const searchStock = async (symbol) => {
  var options = {
    method: "GET",
    url: "https://alpha-vantage.p.rapidapi.com/query",
    params: {
      keywords: `${symbol}`,
      function: "SYMBOL_SEARCH",
      datatype: "json",
    },
    headers: {
      "x-rapidapi-host": "alpha-vantage.p.rapidapi.com",
      "x-rapidapi-key": "941a647c08msh620bdda4c1d4e13p1c6befjsnba999b578629",
    },
  };

  try {
    const response = await axios.request(options);

    return response.data;
  } catch (err) {
    console.log("Error : ", err);
    // return err;
  }
};
module.exports = { getStockData, searchStock };
