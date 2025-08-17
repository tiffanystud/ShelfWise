

// backend/middleware/auth.ts
import * as authModule from "../utils/auth.ts";

export async function authenticateToken(context: any): Promise<any> {

    const authHeader = context.request.headers.get("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        context.response.status = 400;
        context.response.body = { error: "Missing or invalid token" };
        return null;
    }

    const token = authHeader.replace("Bearer ", "");

    try {
        const payload = await authModule.verifyJwtToken(token);
        return payload;
    } catch {
        context.response.status = 401;
        context.response.body = { error: "Invalid token" };
        return null;
    }

}






