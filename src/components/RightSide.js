import React from 'react'

export const RightSide = (props) => {
  const { weather } = props;

  // weather объект болон min_c утга байгааг шалгаж байна
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
