// public/api/product.ts

/*
Frontend-fil som innehåller funktioner för att kommunicera med backend-API:et gällande produkter (bl.a. hämta produktlista, skapa, uppdatera och ta bort produkter).
*/

/*
Den här filen ligger i public eftersom den används av frontend-koden (vanilla TS/JS) för att skicka HTTP-förfrågningar till backend (Deno server).

Syftet är att samla alla fetch-anrop som handlar om produktdata på ett ställe, så att frontend-komponenter enkelt kan använda dessa funktioner för att uppdatera UI utan att själva hantera fetch-logiken.
*/

/*
Kommunicerar med backend via API-endpoints som t.ex. "/api/products" för att hämta, skapa, uppdatera eller ta bort produkter.
*/

/* 
export async function fetchProducts() {
  const res = await fetch("/api/products");
 
  if (!res.ok) throw new Error("Misslyckades hämta produkter");
 
  return res.json();
}
*/