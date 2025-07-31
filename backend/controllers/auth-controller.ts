
// backend7contollers/auth-controller.ts
import * as userModelModule from "../models/user-model.ts";
import * as authModule from "../utils/auth.ts";

/* Autentisering och auktorisering
 
- Signup, login, signout
- JTW-tokens
- 2FA?
- Role Basedd Access Control
- Refresh token

*/

export async function registerUser(context: any) {

    const reqBody = await context.request.body();
    const reqValue = await reqBody.value;

    const username = reqValue.username;
    const email = reqValue.email;
    const role = reqValue.role;

    const existingUser = userModelModule.getUserByEmail(email);
    if (existingUser) {
        context.response.status = 400;
        context.response.body = { error: "User with this email already exists." };
        return;
    }

    const existingUsername = userModelModule.getUserByUsername(username);
    if (existingUsername) {
        context.response.status = 400;
        context.response.body = { error: "User with this username already exists." };
        return;
    }

    const hasedPassword = await authModule.hashPassword(reqValue.password);
    const newUserId = userModelModule.createUser({
        username,
        email,
        password: hasedPassword,
        role: role || "user",
    });

    context.response.status = 201;
    context.response.body = {
        message: "User created.",
        userId: newUserId
    }

}



