
// backend/contollers/auth-controller.ts

import * as userModelModule from "../models/user-model.ts";
import * as authModule from "../utils/auth.ts";

/* Autentisering och auktorisering
 
- Signup, login, signout
- JTW-tokens
- 2FA?
- Role Basedd Access Control
- Refresh token

*/


export async function registerUserController(context: any) {

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

export async function loginUserController(context: any) {

    const reqBody = await context.request.body();
    const reqValue = await reqBody.value;
    const email = reqValue.email;

    const foundUser = userModelModule.getUserByEmail(email);
    if (!foundUser) {
        context.response.status = 401;
        context.response.body = { error: "Unvalid email or password." };
        return;
    }

    const validPassword = await authModule.comparePassword(reqValue.password, foundUser.password);
    if (!validPassword) {
        context.response.status = 401;
        context.response.body = { error: "Unvalid email or password." };
        return;
    }

    const payload = {
        id: foundUser.id,
        email: foundUser.email,
        role: foundUser.role,
        exp: authModule.getTokenExpiration(60)
    }
    const jwt = await authModule.generateJwtToken(payload);

    context.response.status = 200;
    context.response.body = {
        message: "Sign in successful!",
        token: jwt,
        user: {
            id: foundUser.id,
            email: foundUser.email,
            role: foundUser.role,
        }
    };

}

export async function updateUserController(context: any) {

    const authHeader = context.request.headers.get("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        context.response.status = 401;
        context.response.body = { error: "Missing or invalid token" };
        return;
    }

    const token = authHeader.replace("Bearer ", "");
    let payload: { id: number; role: string; };

    try {
        payload = await authModule.verifyJwtToken(token);
    } catch {
        context.response.status = 401;
        context.response.body = { error: "Invalid token" };
        return;
    }

    const urlParts = new URL(context.request.url).pathname.split('/');
    const userIdString = urlParts[urlParts.length - 1];
    const currUserId = parseInt(userIdString);

    if (payload.id !== currUserId && payload.role !== "admin") {
        context.response.status = 403;
        context.response.body = { error: "You can only update your own profile" };
        return;
    }

    const reqBody = await context.request.body();
    const updates = await reqBody.value;

    await userModelModule.updateUser(currUserId, updates);

    context.response.status = 200;
    context.response.body = { message: "User updated successfully" };
}


