import { ActionFunctionArgs, LoaderFunctionArgs } from "react-router-dom";

const THEME = {
    light: "light",
    dark: "dark",
} as const;

export type Theme = (typeof THEME)[keyof typeof THEME];

export type ThemeContextType = {
    theme: Theme;
    toggleTheme: () => void;
}

export type Note = {
    id: string;
    createdAt: number;
    header?: string;
    description?: string;
}

export interface EditActionArguments extends ActionFunctionArgs {
    params: {
        noteId?: string;
    }
}

export type EditFormData = {
    header?: string;
    description?: string;
};