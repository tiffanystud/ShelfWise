
// backend/api-router.ts

import { serve } from "https://deno.land/std/http/server.ts";
import { loginUser, registerUser } from "./controllers/auth-controller.ts";


async function handler(request: Request): Promise<Response> {

    const reqMethod = request.method;
    const reqPathname = new URL(request.url).pathname;

    const response: { status?: number; body?: any } = {};

    if (reqMethod === "POST") {

        if (reqPathname === "/api/login") {

            const context = { request, response };
            await loginUser(context)

            if (!context.response.status) {
                return new Response("Internal server error", { status: 500 });
            }

            return new Response(
                JSON.stringify(context.response.body),
                {
                    status: context.response.status,
                    headers: { "Content-Type": "application/json" }
                }
            );

        }

    }

    return new Response("Not Found", { status: 404 });

};

serve(handler);