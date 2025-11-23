import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { AppContextProvider } from "./components/context/AppContext.jsx";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AppContextProvider>
      <App />
    </AppContextProvider>
  </StrictMode>
);
