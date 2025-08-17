
// backend/routes.ts

import { loginUserController, registerUserController } from "./controllers/auth-controller.ts";
import { createProductController, updateProductController } from "./controllers/product-controller.ts"

export const apiRoutes = {
    // Users
    "POST /api/login": loginUserController,
    "POST /api/test-register": registerUserController,


    // Products
    "POST /api/products": createProductController,
    "PUT /api/products/:id": updateProductController
};
