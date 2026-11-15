import { useTheme } from "../hooks/useTheme";

export default function Header() {
  const [isDark, setIsDark] = useTheme();
  return (
    <header className={`header-container ${isDark ? "dark" : ""}`}>
      <div className="header-content">
        <h2 className="title">
          <a href="/">Where in the world?</a>
        </h2>
        <p
          className="theme-changer"
          onClick={() => {
            document.body.classList.toggle("dark");
            setIsDark(!isDark);
            localStorage.setItem("darkMode", !isDark);
          }}
        >
          <i className={`fa-solid fa-${!isDark ? "moon" : "sun"}`} />
          &nbsp;&nbsp;{!isDark ? "Dark" : "Light"} Mode
        </p>
      </div>
    </header>
  );
}
