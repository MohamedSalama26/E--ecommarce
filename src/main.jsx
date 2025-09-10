import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "react-image-gallery/styles/css/image-gallery.css";
import "./index.css";
import "@fontsource/encode-sans-expanded";
import "@fortawesome/fontawesome-free/css/all.min.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
