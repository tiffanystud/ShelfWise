
// backend/routes.ts

import { loginUserController, registerUserController } from "./controllers/auth-controller.ts";

export const apiRoutes = {
    "POST /api/login": loginUserController,
    "POST /api/test-register": registerUserController,

};
