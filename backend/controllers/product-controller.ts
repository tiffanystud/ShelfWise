
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
        context.response.boody = { error: "Invalid token" };
        return;
    }

    if (payload.role !== "admin") {
        context.response.status = 403;
        context.response.body = { error: "Only admins can create products" };
        return;
    }



}







