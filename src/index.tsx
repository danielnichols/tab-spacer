import { StrictMode } from "react";
import * as ReactDOMClient from "react-dom/client";

import App from "./App";

console.clear();

const rootElement = document.getElementById("App") as Element;
const root = ReactDOMClient.createRoot(rootElement);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
