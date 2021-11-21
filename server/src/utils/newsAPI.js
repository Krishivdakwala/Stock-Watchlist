const axios = require("axios");
const asyncHandler = require("express-async-handler");
const newsAPIKey = "bd94c10688614763aa882688f37d58cb";

const getNews = asyncHandler(async () => {
  var url =
    "https://newsapi.org/v2/top-headlines?" +
    "country=in&" +
    "category=business&" +
    `apiKey=${newsAPIKey}`;
  //   var req = new Request(url);
  //   fetch(req).then(function (response) {
  //     console.log(response.json());
  //   });

  try {
    const response = await axios.request(url);
    return response.data;
  } catch (err) {
    console.log("Error : ", err);
    // return err;
  }
});

module.exports = { getNews };
