import { createRoot } from "react-dom/client";
import "./assets/SCSS/index.scss";
import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "./i18n";
import { isPROD } from "./utils/EnvUtils.js";

// Google tag
if (isPROD()) {
  const script = document.createElement("script");
  script.src = "https://www.googletagmanager.com/gtag/js?id=G-B7127LM6JD";
  script.async = true;
  document.head.appendChild(script);

  script.onload = () => {
    window.dataLayer = window.dataLayer || [];
    function gtag() {
      window.dataLayer.push(arguments);
    }
    gtag("js", new Date());
    gtag("config", "G-B7127LM6JD");
  };
}

createRoot(document.getElementById("root")).render(<App />);
