
// frontend/src/api/product.ts

export async function getProducts() {
    console.log("getProducts() körs...");

    const token = localStorage.getItem("token") || "DEV_TOKEN";
    const response = await fetch("http://localhost:8000/api/products", {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`,
            "accept": "application/json",
        }
    })
    const data = await response.json();
    return data.products || [];
}