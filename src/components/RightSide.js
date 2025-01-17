import React from 'react'

export const RightSide = (props) => {
  const { weather } = props;
  if (!weather || !weather.min_c) {
    return <div>Weather data is not available</div>;
  }

  return (
    <div>
      <div>Min Temp: {weather.min_c}°C</div>
      <div>Condition: {weather.condition}</div>
      <div>Date: {weather.date}</div>
    </div>
  );
};
