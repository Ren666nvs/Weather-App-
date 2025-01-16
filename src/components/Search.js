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
import React, { useEffect, useState } from "react";
import { citiesFilter } from "../utils/CitiesFilter";

export const Search = (props) => {
  const [countriesSearch, setCountriesSearch] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [cities, setCities] = useState([]);
  const { setSelectedCity } = props;

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://countriesnow.space/api/v0.1/countries"
      );
      const result = await response.json();
      const countriesAndCity = citiesFilter(result.data);
      setCities(countriesAndCity);
      setFilteredData(countriesAndCity);
    } catch (error) {
      console.error("Error", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (event) => {
    setCountriesSearch(event.target.value);
    setFilteredData(
      cities
        .filter((city) =>
          city.toLowerCase().startsWith(countriesSearch.toLowerCase())
        )
        .slice(0, 5)
    );
  };

  const handleCityClick = (city) => {
    console.log(city);
    setSelectedCity(city.split(",")[0]);
  };

  return (
    <div>
      <div>
        <input
          onChange={handleChange}
          placeholder="Search country"
          value={countriesSearch}
        />
      </div>
      {loading && <p>Loading...</p>}
      <div>
        {countriesSearch.length > 0 &&
          filteredData.map((country, index) => (
            <div key={index} onClick={() => handleCityClick(country)}>
              {country}
            </div>
          ))}
      </div>
    </div>
  );
};
