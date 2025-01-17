
import "./App.css";
import { LeftSide } from "./components/LeftSide";
import { RightSide } from "./components/RightSide";
import { Search } from "./components/Search";
import { useEffect, useState } from "react";
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
    <div className="bg-[#F3F4F6]">  
      <div className="relative flex w-screen h-screen items-center justify-center">
    
      {weatherLoading && <p>Weather loading...</p>}
      <Search setSelectedCity={setSelectedCity} />
      <div className="absolute inset-0 z-10 flex items-center justify-center">
      {[1740, 1340, 940, 540, 340, 140].map((size, index) => (
         <div
         className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border border-gray-300 rounded-full w-[${size}px] h-[${size}px]`}
         />
       ))}
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border border-gray-300 rounded-full w-[140px] h-[140px]"></div>
          <div className="flex items-center justify-center w-[140px] h-[140px] bg-[#F3F4F6] rounded-full gap-x-4">
            <div className="flex items-center justify-center">
              <div>
                <svg xmlns="http://www.w3.org/2000/svg" width="43" height="86" viewBox="0 0 43 86" fill="none">
                  <path
                    d="M16.1296 7.58989L2.54477 32.8821C0.849461 36.0473 0 39.5213 0 43C0 46.4791 0.849461 49.9523 2.54477 53.1179L16.1296 78.4105C18.6335 83.0823 23.5304 86 28.8593 86H43.2889V78.835H43.2842C40.622 78.835 38.1737 77.3781 36.9216 75.0428L23.3418 49.7455C22.2069 47.6366 21.6413 45.3208 21.6413 43C21.6413 40.6788 22.2069 38.363 23.3418 36.2549L36.9216 10.9577C38.1737 8.62162 40.622 7.16533 43.2842 7.16533H43.2889V0H28.8593C23.5304 0 18.6335 2.91825 16.1296 7.58989Z"
                    fill="#111111"
                  />
                </svg>
              </div>
              <div>
                <svg xmlns="http://www.w3.org/2000/svg" width="44" height="86" viewBox="0 0 44 86" fill="none">
                  <path
                    d="M40.7442 32.882L27.1599 7.58993C24.6554 2.91778 19.7591 0 14.43 0H0V7.16486H0.00510914C2.66726 7.16486 5.11563 8.62166 6.36732 10.9572L19.9469 36.2543C21.0827 38.3633 21.647 40.679 21.647 42.9999C21.647 45.3211 21.0827 47.6368 19.9469 49.7454L6.36732 75.0423C5.11563 77.3783 2.66726 78.8345 0.00510914 78.8345H0V85.9999H14.43C19.7591 85.9999 24.6554 83.0821 27.1599 78.41L40.7442 53.1177C42.4388 49.9526 43.2889 46.4785 43.2889 42.9999C43.2889 39.5211 42.4388 36.0475 40.7442 32.882Z"
                    fill="#111111"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
        <div className="flex min-h-screen">
        <section className="relative flex flex-1 items-center justify-center">
            <div className="relative flex w-[567px] justify-center z-10">
              <div className="z-20 w-103 h-207 rounded-10.5 overflow-hidden shadow-lg bg-white/75">
                <div className="space-y-12 px-10 py-14 backdrop-blur-lg">
                  <div className="flex justify-between items-center">
                    <div className="space-y-2">
                      <h4 className="text-gray-400">{weather.date || "January 14, 2025"}</h4>
                      <h2 className="h-12 text-5xl font-extrabold text-gray-900">{selectedCity}</h2>
                    </div>
                  </div>
                  <img src="./sun.png" alt="Sunny" />
                </div>
                <div className="px-12">
                  <div className="text-transparent bg-clip-text font-extrabold text-[110px] -mt-10 bg-gradient-to-b from-black to-white">
                    {weather.max_c}° / {weather.min_c}°
                  </div>
                  <h6 className="font-extrabold mb-12">{weather.condition || "Sunny"}</h6>
                </div>
              </div>
            </div>
          </section>
          
        </div>
      </div>
      <LeftSide weather={weather} />
      <RightSide weather={weather} />
    </div>
  );
}

export default App;
