import { useContext, useEffect, ReactNode, FC } from "react";
import { ThemeContext } from "../context/theme-context";
import { NavLink } from "react-router-dom";

const Header: FC<{ children: ReactNode }> = ({ children }) => {
  const themeContext = useContext(ThemeContext);

  if (!themeContext) {
    throw new Error("ThemeContext must be used within a ThemeProvider");
  }

  const { theme, toggleTheme } = themeContext;

  console.log(theme);

  useEffect(() => {
    if (theme === "dark") document.body.classList.add("dark-theme");
    else document.body.classList.remove("dark-theme");
  }, [theme]);

  return (
    <>
      <div className={"header"}>
        <NavLink to={"/"}>
          <h1>{children}</h1>
        </NavLink>
        <div>
          <button onClick={() => toggleTheme()}>
            {theme === "light" ? "Make dark" : "Make light"}
          </button>
        </div>
      </div>
    </>
  );
};

export default Header;
