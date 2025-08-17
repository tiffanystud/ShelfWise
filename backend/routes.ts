
// backend/routes.ts

import * as userControllers from "./controllers/auth-controller.ts";
import * as productControllers from "./controllers/product-controller.ts"

export const apiRoutes = {
    // Users
    "POST /api/login": userControllers.loginUserController,
    "POST /api/test-register": userControllers.registerUserController,


    // Products
    "POST /api/products": productControllers.createProductController,
    "PUT /api/products/:id": productControllers.updateProductController,
    "GET /api/products": productControllers.getAllProductsController
};
