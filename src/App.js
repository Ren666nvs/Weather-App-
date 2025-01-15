import './App.css';
import {components} from "./components/LeftSide" ;
import {components} from "./components/RightSide" ; 
import {components} from "./components/Search" ; 
import { useEffect, useState } from 'react';

 function App = ()  {
  const [selectedCity, setSelectedCity] = useState("Ulaanbaatar")
  const [weatherLoading, setWeatherLoading] = useState(false);
  const [weather, setWeather] = useState({});

  const getWeather = async () => {
    setWeatherLoading(true);
  
    try{
const response = await fetch (
  "https://countriesnow.space/api/v0.1/countries"

);

const result = await response.json();
console.log(result);
const weatherData = {
  max_c: result.forecast[0].day.maxtemp_c,
  min_c: result.forecast[0].day.mintemp_c,
  condition: result.forecast[0].day.condition.text,
  date: result.forecast.forecastday[0].date,
};

setWeather(weather.data);
    } catch (error) {
      console.log("Error", error);
    } finally {
      setWeatherLoading(false)
    }
setWeatherLoading(false);
    } catch (error){
      console.log("Error", error);
      setWeatherLoading(false)
    }
  };
  useEffect(() => {
    getWeather();
  })
}
