import { getProducts } from "./product.ts";

async function test() {
    const products = await getProducts();
    console.log(products);
}

test();