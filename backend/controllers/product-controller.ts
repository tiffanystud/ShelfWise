
// backend/controller/product-controller.ts

import * as productModel from "../models/product-model.ts";
import * as middlewareModule from "../middleware/auth.ts";
/* import * as utilsAuthModule from "../utils/auth.ts"; */


export async function createProductController(context: any) {

    const user = await middlewareModule.authenticateToken(context)
    if (!user) return;
    if (user.role !== "admin") {
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

    const user = await middlewareModule.authenticateToken(context);
    if (!user) return;
    if (user.role !== "admin") {
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

    const user = await middlewareModule.authenticateToken(context);
    if (!user) return;

    const allProducts = productModel.getAllProducts();

    context.response.status = 200;
    context.response.body = { products: allProducts };
}


export async function deleteProductController(context: any) {

    const user = await middlewareModule.authenticateToken(context);
    if (!user) return;
    if (user.role !== "admin") {
        context.response.status = 403;
        context.response.body = { error: "Forbidden: only admins can delete products" }; return;
    }

    const productId = Number(context.params.id);
    const foundProduct = productModel.getProductbyId(productId);
    if (!foundProduct) {
        context.response.status = 404;
        context.response.body = { error: "Product not found" };
        return;
    }

    productModel.deleteProduct(productId);

    context.response.status = 200;
    context.response.body = { message: "Product deleted" };
}

