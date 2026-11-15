import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import CountryDetailSkeleton from "./CountryDetailSkeleton";
import "./CountryDetail.css";
import { useTheme } from "../hooks/useTheme";

export default function CountryDetail() {
  const params = useParams();
  const countryName = params.country;
  const { state } = useLocation();
  const [countryData, setCountryData] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const navigate = useNavigate();
  const [isDark] = useTheme();
  console.log(state);

  async function handleBorderClick(border) {
    try {
      const response = await fetch(
        `https://api.restcountries.com/countries/v5/codes.alpha_3/${border}`,
        {
          headers: {
            Authorization: `Bearer ${process.env.API_KEY}`,
          },
        },
      );

      const { data } = await response.json();
      const countryName = data.objects[0].names.common;

      navigate(`/${encodeURIComponent(countryName.toLowerCase())}`);
    } catch (error) {
      console.error("Failed to fetch border country:", error);
    }
  }

  function updateCountryData(country) {
    setCountryData({
      name: country.names.common,
      nativeName: Object.values(country.names.native)[0]?.common || (
        <span style={{ color: "grey", fontStyle: "italic" }}>
          No native name
        </span>
      ),
      population: country.population.toLocaleString("en-PK"),
      region: country.region,
      subregion: country.subregion || (
        <span style={{ color: "grey", fontStyle: "italic" }}>
          No Sub-region
        </span>
      ),
      capital: country.capitals?.[0]?.name || (
        <span style={{ color: "grey", fontStyle: "italic" }}>No Capitals</span>
      ),
      flagImg: country.flag.url_svg,
      flagAlt: country.flag.description,
      tld: country.tlds?.[0],
      currencies: country.currencies?.[0]?.name || (
        <span style={{ color: "grey", fontStyle: "italic" }}>No Currency</span>
      ),
      languages: country.languages
        .map((language) => language.name)
        .join(", ") || (
        <span style={{ color: "grey", fontStyle: "italic" }}>No languages</span>
      ),
      nativeLanguage: country.languages
        ?.map((language) => language.native_name)
        .filter(Boolean)
        .join(", ") ? (
        `(${country.languages
          .map((language) => language.native_name)
          .filter(Boolean)
          .join(", ")})`
      ) : (
        <span style={{ color: "grey", fontStyle: "italic" }}>
          (No native language)
        </span>
      ),
      borders: country.borders,
    });
  }

  useEffect(() => {
    if (state) {
      updateCountryData(state);
      return;
    }
    fetch(
      `https://api.restcountries.com/countries/v5?q=${countryName.toLowerCase()}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.API_KEY}`,
        },
      },
    )
      .then((response) => response.json())
      .then((data) => {
        const country = data.data.objects[0];
        updateCountryData(country);
        console.log(country.borders);
        console.log(country);
      })
      .catch((error) => {
        setNotFound(true);
      });
  }, [countryName]);

  if (notFound) {
    return (
      <>
        <main className={`${isDark ? "dark" : ""}`}>
          <div className="country-details-container">
            <span className="back-button" onClick={() => history.back()}>
              <i className="fa-solid fa-arrow-left"></i>&nbsp; Back
            </span>
            <h1>Country not found</h1>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <main className={`${isDark ? "dark" : ""}`}>
        <div className="country-details-container">
          <span className="back-button" onClick={() => history.back()}>
            <i className="fa-solid fa-arrow-left"></i>&nbsp; Back
          </span>

          {!countryData ? (
            <CountryDetailSkeleton />
          ) : (
            <div className="country-details">
              <img
                src={
                  countryData?.flagImg ||
                  "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png"
                }
                alt={countryData?.flagAlt}
              />
              <div className="details-text-container">
                <h1>{countryData?.name}</h1>
                <div className="details-text">
                  <p>
                    <b>Native Name: </b>
                    <span className="native-name">
                      {countryData?.nativeName}
                    </span>
                  </p>
                  <p>
                    <b>Population: </b>
                    <span className="population">
                      {countryData?.population}
                    </span>
                  </p>
                  <p>
                    <b>Region: </b>
                    <span className="region">{countryData?.region}</span>
                  </p>
                  <p>
                    <b>Sub Region: </b>
                    <span className="sub-region">{countryData?.subregion}</span>
                  </p>
                  <p>
                    <b>Capital: </b>
                    <span className="capital">{countryData?.capital}</span>
                  </p>
                  <p>
                    <b>Top Level Domain: </b>
                    <span className="top-level-domain">{countryData?.tld}</span>
                  </p>
                  <p>
                    <b>Currencies: </b>
                    <span className="currencies">
                      {countryData?.currencies}
                    </span>
                  </p>
                  <p>
                    <b>Languages: </b>
                    <span className="languages">
                      {countryData?.languages} {countryData?.nativeLanguage}
                    </span>
                  </p>
                </div>
                {countryData.borders.length !== 0 && (
                  <div className="border-countries">
                    <b>Border Countries: </b>
                    <span className="border-countries-list">
                      {countryData?.borders.map((border, indx) => (
                        <Link
                          key={indx}
                          to={`/${border}`}
                          onClick={(event) => {
                            event.preventDefault();
                            handleBorderClick(border);
                          }}
                        >
                          {border}
                        </Link>
                      ))}
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
