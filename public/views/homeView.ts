// public/views/productList.ts

/*
Frontend-fil som innehåller funktioner för att rendera och uppdatera produktlistans användargränssnitt (HTML) i webbläsaren.
*/

/*
Den här filen ligger i public eftersom den körs i webbläsaren och ansvarar för att visa produktdata i UI:t, hantera användarinteraktioner (t.ex. klick på redigera, ta bort) och anropa funktioner i public/api/product.ts för att hämta eller ändra data.
*/

/*
Syftet är att separera UI-logik från datahämtning, så att produktlistan kan visas dynamiskt och uppdateras när användaren gör ändringar, utan att behöva skriva HTML direkt i huvudfilen.
*/

/* 
export function renderProductList(products) {
  const container = document.querySelector(".product-list");
  container.innerHTML = products.map(p => 
    <div>${p.name} - ${p.price} kr</div>`
    ).join("");
}
*/
