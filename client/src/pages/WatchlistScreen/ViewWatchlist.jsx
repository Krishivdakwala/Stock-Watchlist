import React from "react";

const ViewWatchlist = (props) => {
  // console.log(props.location.state);
  const stocks = props.location.state.stocks;
  return (
    <div>
      <h1> Viewing a watchlist</h1>

      {stocks.map((item, index) => {
        return <div key={index}> {item}</div>;
      })}
    </div>
  );
};

export default ViewWatchlist;
