import "./index.css";
import { useState, useEffect, useCallback } from "react";
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
      const countriesAndCity = citiesFilter(result.data);
      setCities(countriesAndCity);
      setFilteredData(countriesAndCity);
    } catch (error) {
      console.error("Error", error);
    } finally {
      setLoading(false);
    }
  };

  
  const filterData = useCallback(() => {
    setFilteredData(
      cities.filter((city) =>
        city.toLowerCase().startsWith(countriesSearch.toLowerCase())
      )
    );
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
              <p className="no-results">No Results Found.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
