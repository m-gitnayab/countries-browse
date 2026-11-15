import "./CountryDetailSkeleton.css";

export default function CountryDetailSkeleton() {
  return (
    <>
      <div className="country-details">
        <img
          src="https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png"
          alt="Flag"
        />
        <div className="details-text-container">
          <h1 className="skeleton-title"></h1>
          <div className="details-text">
            {Array.from({ length: 8 }).map((_, i) => (
              <p key={i} className="skeleton-paragraph"></p>
            ))}
          </div>
          <div className="border-countries">
            <p className="skeleton-paragraph"></p>
            <span className="border-countries-list">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="border-tag"></div>
              ))}
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
