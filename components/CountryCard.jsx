import { Link } from "react-router-dom";
import ImgPlaceholder from "../assets/FlagPlaceholder.png";

export default function CountryCard({
  countryTitle,
  flagImg,
  flagAlt,
  countryPopulation,
  countryRegion,
  capital,
  data,
}) {
  // console.log(ImgPlaceholder);
  return (
    <Link
      className="country-card"
      to={`/${countryTitle.toLowerCase()}`}
      state={data}
    >
      <img
        src={
          flagImg ||
          "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png"
        }
        alt={flagAlt}
      />
      <div className="card-text">
        <h3 className="card-title">{countryTitle}</h3>
        <p>
          <b>Population:</b> {countryPopulation}
        </p>
        <p>
          <b>Region:</b> {countryRegion}
        </p>
        <p>
          <b>Capital:</b> {capital}
        </p>
      </div>
    </Link>
  );
}
