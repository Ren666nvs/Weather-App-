import React from "react";

export const LeftSide = (props) => {
  const { weather } = props;
  if (!weather || !weather.max_c) {
    return <div>Weather data is not available</div>;
  }

  return (
    <div>
      <div>Max Temp: {weather.max_c}°C</div>
      <div>Min Temp: {weather.min_c}°C</div>
      <div>Condition: {weather.condition}</div>
      <div>Date: {weather.date}</div>
    </div>
  );
};
