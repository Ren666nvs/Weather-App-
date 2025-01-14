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
  const [isDay, setIsDay] = useState(true); // Өдөр шөнө байгааг динамик тодорхойлох

  useEffect(() => {
    const currentHour = new Date().getHours(); 
    // 6:00 - 18:00 цагийн хооронд өдөр байна
    setIsDay(currentHour >= 6 && currentHour < 17);
  }, []);

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

  const currentDate = new Date().toLocaleDateString(); // Өнөөдрийн огноог авах

  return (
    <div className={`app ${isDay ? "day" : "night"}`}>
      <header className="header">
        <input
          type="text"
          value={countriesSearch}
          onChange={handleChange}
          placeholder="Улс эсвэл хот хайх..."
          className="search-bar"
        />
        <p className="date">{currentDate}</p>
      </header>

      <main className="main">
        <div className={`weather-card ${isDay ? "day-card" : "night-card"}`}>
          <img
            src={isDay ? sunIcon : moonIcon}
            alt="weather-icon"
            className="weather-icon"
          />
          <h1 className="temperature">{isDay ? "-16.9°" : "-25.2°"}</h1>
          <p className="description">{isDay ? "Sunny" : "Clear Night"}</p>
        </div>
        
        {/* Хотуудыг харуулах */}
        <div className="cities-list">
          {loading ? (
            <p>Татаж байна...</p>
          ) : (
            <div>
              {filteredData.length > 0 ? (
                filteredData.map((city, index) => (
                  <div key={index} className="city-item">
                    {city}
                  </div>
                ))
              ) : (
                <p className="no-results">Үр дүн олдсонгүй.</p>
              )}
            </div>
          )}
        </div>
      </main>

      <footer className="footer">
        <nav>
          <i className="icon">🏠</i>
          <i className="icon">📍</i>
          <i className="icon">❤️</i>
          <i className="icon">👤</i>
        </nav>
      </footer>
    </div>
  );
}

export default App;
