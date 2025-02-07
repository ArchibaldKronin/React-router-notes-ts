import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Root from "./routes/root.js";
import { loader as rootLoader, action as rootAction } from "./routes/root.js";
import NoteWrapper, { loader as noteLoader } from "./routes/note-wrapper";
import ErrorPage from "./components/error-page";
import Index from "./routes/index.js";
import { action as editAction } from "./routes/edit";
import { action as deleteAction } from "./routes/delete";
import ThemeProvider from "./context/theme-context";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    action: rootAction,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          {
            path: "notes",
            element: <Navigate to={"/"} replace />,
          },
          { index: true, element: <Index /> },
          {
            path: "notes/:noteId",
            element: <NoteWrapper />,
            loader: noteLoader,
          },
          {
            path: "notes/:noteId/edit",
            action: editAction,
          },
          {
            path: "notes/:noteId/delete",
            action: deleteAction,
          },
        ],
      },
    ],
  },
]);

const rootElement = document.getElementById("root") as HTMLElement;

createRoot(rootElement).render(
  <StrictMode>
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  </StrictMode>
);
