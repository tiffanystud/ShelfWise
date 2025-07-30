// public/view-router.ts

/*
Fil som hanterar navigering och vyväxling mellan olika frontend-komponenter (t.ex. login, produktlista, dashboard) utan att ladda om sidan.
*/

/*
Ligger i public eftersom den körs i webbläsaren och styr vilken vy som ska visas baserat på användarens interaktion eller URL.
*/

/*
Syftet är att skapa en enkel router som visar och döljer olika delar av UI:t, laddar rätt CSS och renderar innehåll dynamiskt för en smidig användarupplevelse.
*/

/*
Exempel: Funktion som växlar mellan olika vyer genom att visa rätt container och anropa renderfunktioner.
*/

/* 
export function navigateTo(view) {
  hideAllViews();
  switch(view) {
    case "home":
      renderHome();
      loadCSS("/styles/homeStyle.css");
      break;
    case "login":
      renderLogin();
      loadCSS("/styles/loginStyle.css");
      breakk;
  }
}
*/
