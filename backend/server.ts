
// backend/server.ts
import "https://deno.land/std@0.224.0/dotenv/load.ts";
import { serveFile, serveDir } from "jsr:@std/http/file-server";
import { serve } from "https://deno.land/std/http/server.ts";
import { apiRoutes } from "./routes.ts";


async function handler(request: Request): Promise<Response> {

    const reqMethod = request.method;
    const reqPathname = new URL(request.url).pathname;

    // API endpoints
    if (reqPathname.startsWith("/api/")) {

        let apiRoute = `${reqMethod} ${reqPathname}`;
        let routeFunction = apiRoutes[apiRoute];
        let params: Record<string, string> = {};

        // API endpoints with parameters
        if (!routeFunction) {
            for (const route in apiRoutes) {
                const [routeMethod, routePath] = route.split(" ");
                if (routeMethod !== reqMethod) continue;

                const routeParts = routePath.split("/");
                const reqParts = reqPathname.split("/");

                if (routeParts.length !== reqParts.length) continue;

                let match = true;
                for (let i = 0; i < routeParts.length; i++) {
                    if (routeParts[i].startsWith(":")) {
                        const paramName = routeParts[i].slice(1);
                        params[paramName] = reqParts[i];
                    } else if (routeParts[i] !== reqParts[i]) {
                        match = false;
                        break;
                    }
                }

                if (match) {
                    routeFunction = apiRoutes[route];
                    break;
                }
            }
        }

        if (routeFunction) {
            const response: { status?: number; body?: any } = {};
            const context = { request, response, params };
            await routeFunction(context);

            return new Response(JSON.stringify(context.response.body), {
                status: context.response.status,
                headers: { "Content-Type": "application/json" }
            });
        }

        return new Response("API endpoint not found", { status: 404 });
    }

    // Static files 
    if (reqPathname === "/" || reqPathname === "/home") {
        const response: Response = await serveFile(request, "../public/index.html");
        response.headers.set("content-type", "text/html");
        return response;
    } else {
        const fileResponse: Response = await serveDir(request, { fsRoot: "../public" });
        return fileResponse;
    }
}

serve(handler, { port: 8000 });
