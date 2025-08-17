
// backend/controller/product-controller.ts

import * as productModel from "../models/product-model.ts";
import * as authModule from "../utils/auth.ts";

export async function createProductController(context: any) {

    const authHeader = context.request.headers.get("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        context.response.status = 400;
        context.response.body = { error: "Missing or invalid token" };
        return;
    }

    const token = authHeader.replace("Bearer ", "");
    let payload: { role: string };

    try {
        payload = await authModule.verifyJwtToken(token);
    } catch {
        context.response.status = 401;
        context.response.body = { error: "Invalid token" };
        return;
    }

    if (payload.role !== "admin") {
        context.response.status = 403;
        context.response.body = { error: "Only admins can create products" };
        return;
    }

    const productData = await context.request.json();
    const newProductId = productModel.createProduct(productData);

    context.response.status = 200;
    context.response.body = {
        message: "Product created",
        productId: newProductId
    }

    return;

}


export async function updateProductController(context: any) {

    const authHeader = context.request.headers.get("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        context.response.status = 401;
        context.response.body = { error: "Missing or invalid token" };
        return;
    }

    const token = authHeader.replace("Bearer ", "");
    let payload: { role: string; id: number };

    try {
        payload = await authModule.verifyJwtToken(token);
    } catch {
        context.response.status = 401;
        context.response.body = { error: "Invalid token" }
        return;
    }

    if (payload.role !== "admin") {
        context.response.status = 403;
        context.response.body = { error: "Forbidden: only admins can update products" }; return;
    }

    const productId = context.params.id;
    const updates = await context.request.json();

    const foundProduct = productModel.getProductbyId(Number(productId));
    if (!foundProduct) {
        context.response.status = 404;
        context.response.body = { error: "Product not found" };
        return;
    }

    productModel.updateProduct(Number(productId), updates);
    context.response.status = 200;
    context.response.body = { message: "Product updated" };
}

export async function getAllProductsController(context: any) {

    const authHeader = context.request.headers.get("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        context.response.status = 401;
        context.response.body = { error: "Missing or invalid token" };
        return;
    }

    const token = authHeader.replace("Bearer ", "");
    let payload: { role: string; id: number };

    try {
        payload = await authModule.verifyJwtToken(token);
    } catch {
        context.response.status = 401;
        context.response.body = { error: "Invalid token" }
        return;
    }

    const allProducts = productModel.getAllProducts();

    context.response.status = 200;
    context.response.body = { products: allProducts };
}


export async function deleteProductController(context: any) {

    const authHeader = context.request.headers.get("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        context.response.status = 401;
        context.response.body = { error: "Missing or invalid token" };
        return;
    }

    const token = authHeader.replace("Bearer ", "");
    let payload: { role: string; id: number };


    try {
        payload = await authModule.verifyJwtToken(token);
    } catch {
        context.response.status = 401;
        context.response.body = { error: "Invalid token" }
        return;
    }

    if (payload.role !== "admin") {
        context.response.status = 403;
        context.response.body = { error: "Forbidden: only admins can delete products" }; return;
    }

    const productId = Number(context.params.id);     const foundProduct = productModel.getProductbyId(productId);

    if (!foundProduct) {
        context.response.status = 404;
        context.response.body = { error: "Product not found" };
        return;
    }

    productModel.deleteProduct(productId);

    context.response.status = 200;
    context.response.body = { message: "Product deleted" };
}





