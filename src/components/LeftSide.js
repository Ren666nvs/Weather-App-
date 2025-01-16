import React from "react";

export const LeftSide = (props) => {
  const { weather } = props;
  console.log(weather);

  return (
    <div>
      <div>temp {weather.max_c}</div>
    </div>
  );
};
