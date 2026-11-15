import Header from "./components/Header";
import { Outlet } from "react-router-dom";

import { useState } from "react";
import { ModeProvider } from "./contexts/ThemeContext";
import "./App.css";

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <ModeProvider>
      <Header />
      <Outlet />
    </ModeProvider>
  );
};
export default App;
