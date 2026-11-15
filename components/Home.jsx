import { useState } from "react";
import SearchBar from "./SearchBar";
import SelectRegion from "./SelectRegion";
import CountriesList from "./CountriesList";
import { useTheme } from "../hooks/useTheme";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isDark] = useTheme();
  console.log(isDark);
  return (
    <>
      <main className={`${isDark ? "dark" : ""}`}>
        <div className="search-filter-container">
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          <SelectRegion setSearchTerm={setSearchTerm} />
        </div>
        <CountriesList searchTerm={searchTerm} />
      </main>
    </>
  );
}
