import React from 'react'

export const RightSide = (props) => {
    const { weather } = props;
    console.log(weather);
  
    return (
      <div>
        <div>temp {weather.min_c}</div>
      </div>
    );
  };