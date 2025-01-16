import './App.css';
import {components, LeftSide} from "./components/LeftSide" ;
import {components, RightSide} from "./components/RightSide" ; 
import {components, Search} from "./components/Search" ; 
import { useEffect, useState } from 'react';
const weatherApiKey = ""
 function App()  {
  const [selectedCity, setSelectedCity] = useState("Ulaanbaatar")
  const [weatherLoading, setWeatherLoading] = useState(false);
  const [weather, setWeather] = useState({});

  const getWeather = async () => {
    setWeatherLoading(true);
  
    try {
const response = await fetch (
  "https://countriesnow.space/api/v0.1/countries"
{ method: "get", headers: { "Content-Type" : "application/json"} }
);

const result = await response.json();

const weatherData = {
  max_c: result.forecast[0].day.maxtemp_c,
  min_c: result.forecast[0].day.mintemp_c,
  condition: result.forecast[0].day.condition.text,
  date: result.forecast.forecastday[0].date,
};

setWeather(weatherData);
    } catch (error) {
      console.log("Error", error);
    } finally {
      setWeatherLoading(false)
    }
  };
  useEffect(() => {
    getWeather();
  }, [selectedCity]);


  return (
    <div className='App'>
      {weatherLoading && <p>weather loading...</p>}
      <Search setSelectedCity={setSelectedCity} />
      <LeftSide weather={weather} />
      <RightSide weather={weather} />
    </div>
  );
}

  export default App;
