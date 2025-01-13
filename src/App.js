import "./index.css";
import { useEffect,  useState} from "react";
import {citiesFilter} from "./utils/CitiesFilter";

function App() {
  const [countriesSearch, setCountriesSearch] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [cities, setCities] = useState([]);

  const fetchData = async () => {
    setLoading(true)
    await fetch("https://countriesnow.space/api/v0.1/countries")
    .then((response) => response.json())
    .then((result) => {
      const countriesAndCity = citiesFilter(result.data);
     setCities(countriesAndCity);
     setFilteredData(countriesAndCity);
    })
    .catch ((error) => {
      console.log("Error", error);
    })
    .finally(() => {
      setLoading (false);
     });
  };
const filterData = () => {
  setFilteredData(
    cities.filter((city) => 
    city.toLowerCase().startsWith(countriesSearch.toLowerCase))
  )
};
useEffect(() => {
  filterData();
}, [countriesSearch]);
useEffect(() => {
console.log("use effect ");
fetchData();
}, []);
const handleChange = (event) => {
  console.log(event.target.value);
  setCountriesSearch(event.target.value);
};
return(
  <div className="App">
    {loading && <p>Loading </p>}
  <div>
<input onChange={handleChange} placeholder="Search country " />
</div> 
<div>
{countriesSearch.length > 0 &&
  filteredData.map((country, index ) => {
    return <div key={index}>{country}</div>;
  })}
  </div>
  </div> 
 );
}
export default App;