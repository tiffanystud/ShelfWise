
/* frontend/src/App.tsx */

import React from "https://esm.sh/react@18";
import * as ProductList from "./components/ProductList.tsx";

const dummyProducts = [
    { id: 1, name: "USB-C kabel", price: 99, category: "Tillbehör", description: "1m kabel", stock_quantity: 12 },
    { id: 2, name: "Trådlös mus", price: 299, category: "Datorer", description: "Bluetooth-mus", stock_quantity: 5 },
];

function App() {

    const appContent = React.createElement(
        'div',
        null,
        React.createElement('h1', null, 'Shelfwise'),
        React.createElement('p', null, 'Welcome to your inventory management app'),
        React.createElement(ProductList.default, { products: dummyProducts })
    );

    return appContent;
}

export default App;