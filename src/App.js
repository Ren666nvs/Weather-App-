// import "./index.css";
// import { useState, useEffect, useCallback } from "react";
// import { citiesFilter } from "./utils/CitiesFilter";
// // import moonIcon from "./assets/moon.png";
// // import sunIcon from "./assets/sun.png";
// function App() {
//   const [countriesSearch, setCountriesSearch] = useState("");
//   const [filteredData, setFilteredData] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [cities, setCities] = useState([]);

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

//   const filterData = useCallback(() => {
//     setFilteredData(
//       cities.filter((city) =>
//         city.toLowerCase().startsWith(countriesSearch.toLowerCase())
//       )
//     );
//   }, [cities, countriesSearch]);

//   useEffect(() => {
//     filterData();
//   }, [filterData]);

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const handleChange = (event) => {
//     setCountriesSearch(event.target.value);
//   };

//   return (
//     <div className="app">
//    <div className="container">
//   <h1 className="title">Country Search</h1>

//   <img src="sun.png" alt="Sun" />

//   <img src="moon.png" alt="Moon" />

//   <input
//     type="text"
//     value={countriesSearch}
//     onChange={handleChange}
//     placeholder="Search for a country or city..."
//     className="input"
//   />
// </div>

//         {loading ? (
//           <p>Loading...</p>
//         ) : (
//           <div>
//             {filteredData.length > 0 ? (
//               filteredData.map((city, index) => (
//                 <div key={index} className="city-item">
//                   {city}
//                 </div>
//               ))
//             ) : (
//               <p className="no-results">No Results Found.</p>
//             )}
//           </div>
//         )}
//       </div>

//   );
// }

// export default App;

        



import React, { useState, useEffect, useCallback } from "react";
import "./App.css";
import sunIcon from "./assets/sun.png";
import moonIcon from "./assets/moon.png";
import { citiesFilter } from "./utils/CitiesFilter";

function App() {
  const [countriesSearch, setCountriesSearch] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [cities, setCities] = useState([]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://countriesnow.space/api/v0.1/countries");
      const result = await response.json();
      const citiesAndCountry = citiesFilter(result.data); // Хотуудыг функц ашиглан нэгтгэх
      setCities(citiesAndCountry); // Бүх хотуудыг хадгалах
      setFilteredData(citiesAndCountry); // Хөтөлбөрт харуулах
    } catch (error) {
      console.error("Алдаа гарлаа", error);
    } finally {
      setLoading(false);
    }
  };

  const filterData = useCallback(() => {
    if (countriesSearch === "") {
      setFilteredData(cities); // Хайлт хоосон бол бүх хотыг харуулна
    } else {
      setFilteredData(
        cities.filter((city) =>
          city.toLowerCase().startsWith(countriesSearch.toLowerCase()) // Хотын нэрийг хайх
        )
      );
    }
  }, [cities, countriesSearch]);

  useEffect(() => {
    filterData();
  }, [filterData]);

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (event) => {
    setCountriesSearch(event.target.value);
  };

  
  return (
    <div className="app">
      <header className="header">
        <input
          type="text"
          value={countriesSearch}
          onChange={handleChange}
          placeholder="Search Country..."
          className="search-bar"
          
        />
      
      </header>

      <main className="main">
        <div className="weather-cards">
          <div className="weather-card day-card">
            <img
              src={sunIcon}
              alt="sun-icon"
              className="weather-icon"
            />
            <h1 className="temperature">-16.9°</h1>
            <p className="description">Sunny</p>
          </div>
          <div className="weather-card night-card">
            <img
              src={moonIcon}
              alt="moon-icon"
              className="weather-icon"
            />
            <h1 className="temperature">-25.2°</h1>
            <p className="description">Clear Night</p>
          </div>
        </div>

        
        <div className="cities-list">
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
                <p className="no-results">not found.</p>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
