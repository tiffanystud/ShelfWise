// backend/server.ts

import { serveFile, serveDir } from "jsr:@std/http/file-server";

async function handler(request: Request): Promise<Response> {
    const url = new URL(request.url);
    const path: string = url.pathname;


    if (path === "/" || path === "/home") {
        
        const response: Response = await serveFile(
            request, "../frontend/index.html"); 
        response.headers.set("content-type", "text/html");
        
        return response;
        
    } else {
        
        const fileResponse: Response = await serveDir(
            request, {
                fsRroot: "../frontend",
            })
        
        return fileResponse;
    }
}

Deno.serve(handler);

