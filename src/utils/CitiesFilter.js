

export const CitiesFilter = (countries ) => {
    const citiesAndCountry = countries.data.flatMap((country) => 
    country.cities.map((city) => `${city}, ${country.country}`)
);
console.log(citiesAndCountry);

return citiesAndCountry;
};