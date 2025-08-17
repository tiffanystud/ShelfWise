
/* frontend/src/main.tsx */

/* Som <script src="main.js">, startpunkten */

import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./styles/global.css";


const htmlContainer = document.getElementById("root");
const reactApp = createRoot(htmlContainer!);

reactApp.render(<App />);


