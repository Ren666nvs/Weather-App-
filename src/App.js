// import "./index.css";
// import { useEffect, useState } from "react";
// import { citiesFilter } from "./utils/CitiesFilter";

// function App() {
//   const [countriesSearch, setCountriesSearch] = useState("");
//   const [filteredData, setFilteredData] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [cities, setCities] = useState([]);

//   // Fetch data from API
//   const fetchData = async () => {
//     setLoading(true);
//     try {
//       const response = await fetch("https://countriesnow.space/api/v0.1/countries");
//       const result = await response.json();

//       // Filter cities and countries
//       const countriesAndCity = citiesFilter(result.data);
//       setCities(countriesAndCity);
//       setFilteredData(countriesAndCity);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Filter data based on search input
//   const filterData = () => {
//     setFilteredData(
//       cities.filter((city) =>
//         city.toLowerCase().startsWith(countriesSearch.toLowerCase())
//       )
//     );
//   };

//   // Update filtered data when search input changes
//   useEffect(() => {
//     filterData();
//   }, [countriesSearch]);

//   // Fetch data when the component mounts
//   useEffect(() => {
//     fetchData();
//   }, []);

//   // Handle input change
//   const handleChange = (event) => {
//     setCountriesSearch(event.target.value);
//   };

//   return (
//     <div className="App">
//       {loading && <p>Loading...</p>}
//       <div>
//         <input
//           onChange={handleChange}
//           value={countriesSearch}
//           placeholder="Search country"
//         />
//       </div>
//       <div>
//         {countriesSearch.length > 0 &&
//           filteredData.map((country, index) => (
//             <div key={index}>{country}</div>
//           ))}
//       </div>
//     </div>
//   );
// }

// export default App;
import "./index.css";
import { useState, useEffect, useCallback } from "react";
import { citiesFilter } from "./utils/CitiesFilter";

function App() {
  const [countriesSearch, setCountriesSearch] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [cities, setCities] = useState([]);

  // Fetch data from API
  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://countriesnow.space/api/v0.1/countries");
      const result = await response.json();
      const countriesAndCity = citiesFilter(result.data);
      setCities(countriesAndCity);
      setFilteredData(countriesAndCity);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Filter data based on search input
  const filterData = useCallback(() => {
    setFilteredData(
      cities.filter((city) =>
        city.toLowerCase().startsWith(countriesSearch.toLowerCase())
      )
    );
  }, [cities, countriesSearch]);

  // Update filtered data when search input changes
  useEffect(() => {
    filterData();
  }, [filterData]);

  // Fetch data when the component mounts
  useEffect(() => {
    fetchData();
  }, []);

  // Handle input change
  const handleChange = (event) => {
    setCountriesSearch(event.target.value);
  };

  return (
    <div className="app">
      <div className="container">
        <h1 className="title">Country Search</h1>
        <input
          type="text"
          value={countriesSearch}
          onChange={handleChange}
          placeholder="Search for a country or city..."
          className="input"
        />
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div>
            {filteredData.length > 0 ? (
              filteredData.map((city, index) => (
                <div key={index} className="city-item">
                  {city}
                </div>
              ))
            ) : (
              <p className="no-results">No results found.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
