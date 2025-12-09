
// frontend/build.ts


import { bundle } from "https://deno.land/x/emit@0.32.0/mod.ts";

const result = await bundle("./src/main.tsx");
await Deno.writeTextFile("./public/main.js", result.code);

console.log("Appen kompilerades nu från tsx till js!");



