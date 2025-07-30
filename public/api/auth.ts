// public/api/auth.ts


/* 
Frontend-fil som innehåller funktioner för att kommunicera med backend-API:et gällande autentisering (bl.a login, logout, register). 
*/

/* 
  Den här filen ligger i public eftersom den används av frontend-koden (vanilla TS/JS) för att skicka HTTP-förfrågningar till backend (Deno server).
*/

/*   
Syftet är att samla alla fetch-anrop som handlar om användarautentisering på ett ställe, så att resten av frontend-komponenterna kan använda dessa funktioner utan att behöva skriva fetch-anrop själva. 
*/

/*   
Kommunicerar med backend via API-endpoints som t.ex. "/api/auth/login" och "/api/auth/register".
*/

