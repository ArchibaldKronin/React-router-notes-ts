import { useContext } from "react";
import { ThemeContext } from "../context/theme-context";

export const useThemeContext = () => {
    const themeContext = useContext(ThemeContext);

    if (!themeContext) {
        throw new Error("ThemeContext must be used within a ThemeProvider");
    }

    return themeContext
}