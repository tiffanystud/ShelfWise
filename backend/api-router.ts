
// backend/api-router.ts

import { serveFile, serveDir } from "jsr:@std/http/file-server";
import { serve } from "https://deno.land/std/http/server.ts";
import { loginUser, registerUser } from "./controllers/auth-controller.ts";


async function handler(request: Request): Promise<Response> {

    const reqMethod = request.method;
    const reqPathname = new URL(request.url).pathname;
    const response: { status?: number; body?: any } = {};

    // API endpoints
    if (reqPathname.startsWith("/api/")) {

        if (reqMethod === "POST") {

            if (reqPathname === "/api/test-register") {
                const context = { request, response };
                await registerUser(context);

                return new Response(
                    JSON.stringify(context.response.body),
                    {
                        status: context.response.status ?? 201,
                        headers: { "Content-Type": "application/json" }
                    }
                );
            }

            if (reqPathname === "/api/login") {

                const context = { request, response };
                await loginUser(context);

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

        return new Response("API endpoint not found", { status: 404 });
    }


    // Static files 
    if (reqPathname === "/" || reqPathname === "/home") {

        const response: Response = await serveFile(
            request, "../public/index.html");
        response.headers.set("content-type", "text/html");

        return response;

    } else {

        const fileResponse: Response = await serveDir(
            request, {
            fsRoot: "../public",
        });

        return fileResponse;
    }
}

serve(handler, { port: 8000 });