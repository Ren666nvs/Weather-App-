// import React from "react";
// import { useEffect, useState } from "react";
// import { citiesFilter } from "../utils/CitiesFilter";
// export const Search = (props) => {
//   const [countriesSearch, setCountriesSearch] = useState("");
//   const { setSelectedCity } = props;
//   const [filteredData, setFilteredData] = useState;
//   const [loading, setLoading] = useState(false);
//   const [cities, setCities] = useState([]);
//   console.log(loading);
//   const fetchData = async () => {
//     setLoading(true);
//     try {
//       const responce = await fetch("");
//       const result = await responce.json();
//       const countriesAndCity = citiesFilter(result.data);
//       setCities(countriesAndCity);
//       setFilteredData(countriesAndCity);
//       setLoading(false);
//     } catch {
//       console.log("Error");
//     }
//   };
//   const filterData = () => {
//     setFilteredData(
//       cities
//         .filter((city) =>
//           city.toLowerCase().startsWidth(countriesSearch.toLowerCase())
//         )
//         .slice(0.5)
//     );
//   };
//   useEffect(() => {
//     filterData();
//   }, [countriesSearch]);
//   useEffect(() => {
//     console.log("useEffect fetch data worked");

//     fetchData();
//   }, []);

//   const handleChange = (event) => {
//     console.log(event.target.value);

//     setCountriesSearch(event.target.value);
//   };
//   const handleCityClick = (city) => {

//     setSelectedCity(city.split(",")[0]);
//   };
//   return (
//     <div>
//       <div>
//         <input onChange={handleChange}
//         placeholder="Search country"
//         value={countriesSearch} />
//       </div>
//       {loading && <p>Loading</p>}
//       <div>
//         {countriesSearch.length > 0 &&
//           filterData.map((country, index) => {
//             return <div key={index}>{country}</div>;
//           })}
//       </div>
//     </div>
//   );
// };
// import React, { useEffect, useState } from "react";
// import { citiesFilter } from "../utils/CitiesFilter";

// export const Search = (props) => {
//   const [countriesSearch, setCountriesSearch] = useState("");
//   const [filteredData, setFilteredData] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [cities, setCities] = useState([]);
//   const { setSelectedCity } = props;

//   const fetchData = async () => {
//     setLoading(true);
//     try {
//       const response = await fetch(
//         "https://countriesnow.space/api/v0.1/countries"
//       );
//       const result = await response.json();
//       const countriesAndCity = citiesFilter(result.data);
//       setCities(countriesAndCity);
//       setFilteredData(countriesAndCity);
//     } catch (error) {
//       console.error("Error", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const handleChange = (event) => {
//     setCountriesSearch(event.target.value);
//     setFilteredData(
//       cities
//         .filter((city) =>
//           city.toLowerCase().startsWith(countriesSearch.toLowerCase())
//         )
//         .slice(0, 5)
//     );
//   };

//   const handleCityClick = (city) => {
//     console.log(city);
//     setSelectedCity(city.split(",")[0]);
//   };

//   return (
//     <div>
//       <div>
//         <input
//           onChange={handleChange}
//           placeholder="Search country"
//           value={countriesSearch}
//         />
//       </div>
//       {loading && <p>Loading...</p>}
//       <div>
//         {countriesSearch.length > 0 &&
//           filteredData.map((country, index) => (
//             <div key={index} onClick={() => handleCityClick(country)}>
//               {country}
//             </div>
//           ))}
//       </div>
//     </div>
//   );
// };
import React, { useState, useEffect } from "react";

// Remove the import for `Filter.js` and handle the filtering inline
const Search = (props) => {
  const { setSelectedCity } = props;
  const [citiesSearch, setCitiesSearch] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [cities, setCities] = useState([]);
  const handleChange = (event) => {
    setCitiesSearch(event.target.value);
    setFilteredData(
      cities
        .filter((city) =>
          city.toLowerCase().startsWith(event.target.value.toLowerCase())
        )
        .slice(0, 5)
    );
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        "https://countriesnow.space/api/v0.1/countries"
      );
      const result = await response.json();

      // The cities filter logic can be handled directly here
      const citiesAndCountry = result.data
        .map((country) =>
          country.cities
            ? country.cities.map((city) => `${city}, ${country.country}`)
            : []
        )
        .flat();

      setCities(citiesAndCountry);
      setFilteredData(citiesAndCountry);
    } catch (error) {
      console.log("error", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCityClick = (city) => {
    setSelectedCity(city.split(",")[0]);
    console.log("Selected city:", city.split(",")[0]);
  };

  return (
    <div className="absolute right-[70px] w-full -top-16 z-30">
      <div className="rounded-full align-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="48"
          height="48"
          viewBox="0 0 48 48"
          fill="none"
        >
          <g opacity="0.2">
            <path
              d="M31.51 28.51H29.93L29.37 27.97C31.33 25.69 32.51 22.73 32.51 19.51C32.51 12.33 26.69 6.51001 19.51 6.51001C12.33 6.51001 6.51001 12.33 6.51001 19.51C6.51001 26.69 12.33 32.51 19.51 32.51C22.73 32.51 25.69 31.33 27.97 29.37L28.51 29.93V31.51L38.51 41.49L41.49 38.51L31.51 28.51ZM19.51 28.51C14.53 28.51 10.51 24.49 10.51 19.51C10.51 14.53 14.53 10.51 19.51 10.51C24.49 10.51 28.51 14.53 28.51 19.51C28.51 24.49 24.49 28.51 19.51 28.51Z"
              fill="black"
            />
          </g>
        </svg>
        <div>
          <input
            disabled={loading}
            onChange={handleChange}
            placeholder="Search"
            className="w-full py-4 pl-20 pr-6 outline-none text-[32px] font-bold"
            value={citiesSearch}
          />
        </div>
      </div>
      {loading && <p>Loading...</p>}
      <div className="absolute w-[527px] h-[80px] z-30 top-[5%] bg-[#FFFFFF] rounded-full pl-[24px]">
        <div className="flex items-center">
          <div className="h-[48px] w-[48px]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="48"
              height="48"
              viewBox="0 0 48 48"
              fill="none"
            >
              <g opacity="0.2">
                <path
                  d="M31.51 28.51H29.93L29.37 27.97C31.33 25.69 32.51 22.73 32.51 19.51C32.51 12.33 26.69 6.51001 19.51 6.51001C12.33 6.51001 6.51001 12.33 6.51001 19.51C6.51001 26.69 12.33 32.51 19.51 32.51C22.73 32.51 25.69 31.33 27.97 29.37L28.51 29.93V31.51L38.51 41.49L41.49 38.51L31.51 28.51ZM19.51 28.51C14.53 28.51 10.51 24.49 10.51 19.51C10.51 14.53 14.53 10.51 19.51 10.51C24.49 10.51 28.51 14.53 28.51 19.51C28.51 24.49 24.49 28.51 19.51 28.51Z"
                  fill="black"
                />
              </g>
            </svg>
          </div>
          <div className="">
            <input
              disabled={loading}
              onChange={handleChange}
              placeholder="Search"
              className=" py-4 pl-[10px] pr-6 outline-none text-[32px] font-bold"
              value={citiesSearch}
            />
          </div>
        </div>
      </div>

      <div className="rounded-[12px] bg-white m-[16px]">
        {citiesSearch.length > 0 &&
          filteredData.map((city, index) => (
            <div
              onClick={() => handleCityClick(city)}
              key={index}
              className="flex items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                viewBox="0 0 40 40"
                fill="none"
              >
                <g opacity="0.2">
                  <path
                    d="M20 3.33334C13.55 3.33334 8.33331 8.55001 8.33331 15C8.33331 23.75 20 36.6667 20 36.6667C20 36.6667 31.6666 23.75 31.6666 15C31.6666 8.55001 26.45 3.33334 20 3.33334ZM11.6666 15C11.6666 10.4 15.4 6.66668 20 6.66668C24.6 6.66668 28.3333 10.4 28.3333 15C28.3333 19.8 23.5333 26.9833 20 31.4667C16.5333 27.0167 11.6666 19.75 11.6666 15Z"
                    fill="black"
                  />
                  <path
                    d="M20 19.1667C22.3012 19.1667 24.1666 17.3012 24.1666 15C24.1666 12.6988 22.3012 10.8333 20 10.8333C17.6988 10.8333 15.8333 12.6988 15.8333 15C15.8333 17.3012 17.6988 19.1667 20 19.1667Z"
                    fill="black"
                  />
                </g>
              </svg>
              {city}
            </div>
          ))}
      </div>
    </div>
  );
};

export default Search;
