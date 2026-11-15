import { useEffect, useState } from "react";
import countriesData from "../countriesData";
import CountryCard from "./CountryCard";
import CountriesListSkeleton from "./CountriesListSkeleton";

export default function CountriesList({ searchTerm }) {
  const [allCountries, setAllCountries] = useState([]);

  useEffect(() => {
    fetch("https://api.restcountries.com/countries/v5", {
      headers: {
        Authorization: `Bearer ${process.env.API_KEY}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setAllCountries(data.data.objects);
        console.log(data);
      })
      .catch((error) => {
        console.error("Error fetching countries data:", error);
      });
  }, []);

  return (
    <>
      {!allCountries.length ? (
        <CountriesListSkeleton />
      ) : (
        <div className="countries-container">
          {allCountries
            .filter((country) => {
              return (
                country.names.common
                  .toLowerCase()
                  .includes(searchTerm.toLowerCase()) ||
                country.region.toLowerCase().includes(searchTerm.toLowerCase())
              );
            })
            .map((country) => {
              return (
                <CountryCard
                  key={country.names.common}
                  countryTitle={country.names.common}
                  flagImg={country.flag.url_svg}
                  flagAlt={country.flag.description}
                  countryPopulation={country.population.toLocaleString("en-PK")}
                  countryRegion={country.region}
                  capital={country.capitals?.[0]?.name}
                  data={country}
                />
              );
            })}
        </div>
      )}
    </>
  );
}
