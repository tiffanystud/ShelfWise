
// frontend/src/components/ProductList.tsx

import React from "https://esm.sh/react@18";

/* type Product = {
    id: number;
    name: string;
    price: number;
    category: string;
    description: string;
    stock_quantity: number;
};
 */

export default function ProductList(props: { products: any }) {

    const products = props.products;

    return React.createElement(
        'div',
        null,
        React.createElement('h2', null, 'Products'),
        React.createElement(
            'ul',
            null,
            products.length === 0
                ? React.createElement('li', null, 'No  Products')
                : products.map((p) =>
                    React.createElement(
                        'li',
                        { key: p.id },
                        `${p.name}, ${p.price} kr - In store: ${p.stock_quantity}`
                    )
                )
        )
    );
}


