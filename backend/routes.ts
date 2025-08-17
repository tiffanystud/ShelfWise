
// backend/routes.ts

import * as userControllers from "./controllers/auth-controller.ts";
import * as productControllers from "./controllers/product-controller.ts"

export const apiRoutes = {
    // Users
    "POST /api/login": userControllers.loginUserController,
    "POST /api/test-register": userControllers.registerUserController,


    // Products
    "POST /api/product": productControllers.createProductController,
    "PUT /api/product/:id": productControllers.updateProductController,
    "GET /api/product": productControllers.getAllProductsController,
    "DELETE /api/product/:id": productControllers.deleteProductController
};
