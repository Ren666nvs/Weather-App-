// import './App.css';
// import {components, LeftSide} from "./components/LeftSide" ;
// import {components, RightSide} from "./components/RightSide" ;
// import {components, Search} from "./components/Search" ;
// import { useEffect, useState } from 'react';
// const weatherApiKey = "3fdecdde0fa448dc8c122147251501"
//  function App()  {
//   const [selectedCity, setSelectedCity] = useState("Ulaanbaatar")
//   const [weatherLoading, setWeatherLoading] = useState(false);
//   const [weather, setWeather] = useState({});

//   const getWeather = async () => {
//     setWeatherLoading(true);

//     try {
// const response = await fetch (
//   "https://countriesnow.space/api/v0.1/countries"
// { method: "get", headers: { "Content-Type" : "application/json"} }
// );

// const result = await response.json();

// const weatherData = {
//   max_c: result.forecast[0].day.maxtemp_c,
//   min_c: result.forecast[0].day.mintemp_c,
//   condition: result.forecast[0].day.condition.text,
//   date: result.forecast.forecastday[0].date,
// };

// setWeather(weatherData);
//     } catch (error) {
//       console.log("Error", error);
//     } finally {
//       setWeatherLoading(false)
//     }
//   };
//   useEffect(() => {
//     getWeather();
//   }, [selectedCity]);

//   return (
//     <div className='App'>
//       {weatherLoading && <p>weather loading...</p>}
//       <Search setSelectedCity={setSelectedCity} />
//       <LeftSide weather={weather} />
//       <RightSide weather={weather} />
//     </div>
//   );
// }

//   export default App;


import "./App.css";
import { LeftSide } from "./components/LeftSide";
import { RightSide } from "./components/RightSide";
import { Search } from "./components/Search";
import { useEffect, useState } from "react";
// import moonIcon from "./assets/moon.png";
// import sunIcon from "./assets/sun.png";
const weatherApiKey = "3fdecdde0fa448dc8c122147251501";

function App() {
  const [selectedCity, setSelectedCity] = useState("Ulaanbaatar");
  const [weatherLoading, setWeatherLoading] = useState(false);
  const [weather, setWeather] = useState({});

  const getWeather = async () => {
    setWeatherLoading(true);
    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=${weatherApiKey}&q=${selectedCity}&days=1`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch weather data");
      }

      const result = await response.json();
      console.log(result);

      const weatherData = {
        max_c: result.forecast.forecastday[0].day.maxtemp_c,
        min_c: result.forecast.forecastday[0].day.mintemp_c,
        condition: result.forecast.forecastday[0].day.condition.text,
        date: result.forecast.forecastday[0].date,
      };

      setWeather(weatherData);
    } catch (error) {
      console.error("Error", error);
    } finally {
      setWeatherLoading(false);
    }
  };

  useEffect(() => {
    getWeather();
  }, [selectedCity]);

  return (
    <div className="App">
    {weatherLoading && <p className="text-center">Weather loading...</p>}
    <div className="flex items-start justify-between px-4">
      <div className="flex-1">
        <Search setSelectedCity={setSelectedCity} />
        <LeftSide weather={weather} />
        <RightSide weather={weather} />
      </div>
      <div className="ml-4">
        <img src={"./Subtract.png"} alt="side-img"  />
      </div>
    </div>
  </div>
  );
}

export default App;
