import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "./components/ui/provider";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <StrictMode>
      <Provider>
        <App />
      </Provider>
    </StrictMode>
  </BrowserRouter>
);
