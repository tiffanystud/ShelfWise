
// backend/server.ts

import { serveFile, serveDir } from "jsr:@std/http/file-server";
import { serve } from "https://deno.land/std/http/server.ts";
import { apiRoutes } from "./routes.ts";


async function handler(request: Request): Promise<Response> {

    const reqMethod = request.method;
    const reqPathname = new URL(request.url).pathname;

    // API endpoints
    if (reqPathname.startsWith("/api/")) {

        const apiRoute = `${reqMethod} ${reqPathname}`;
        const routeFunction = apiRoutes[apiRoute];

        if (routeFunction) {
            const response: { status?: number; body?: any } = {};
            const context = { request, response };
            await routeFunction(context);

            return new Response(JSON.stringify(context.response.body), {
                status: context.response.status,
                headers: { "Content-Type": "application/json" }
            })
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