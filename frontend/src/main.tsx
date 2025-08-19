
/* frontend/src/main.tsx */

/* Som <script src="main.js">, startpunkten */

import React from "https://esm.sh/react@18";
import { createRoot } from "https://esm.sh/react-dom@18/client";
import App from "./App.tsx";

const htmlContainer = document.getElementById("root");
if (htmlContainer) {
    const reactApp = createRoot(htmlContainer);
    reactApp.render(React.createElement(App));
}
