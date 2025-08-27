const contentDescription = document.querySelector("section.product-section");
const follow = document.querySelector("div.breadcrumb");

// Récupère les paramètres de l'URL
const params = new URLSearchParams(window.location.search);

// Exemple : récupérer l'ID du produit
const id = params.get("id");

document.addEventListener("DOMContentLoaded", async () => {
    const result = await fetch(`https://geekshop-back-end.onrender.com/article/${id}/description`, {
        method: "GET",
        headers: {
            "content-type": "application/json"
        }
    });

    if (result.status == 200) {
        const data = await result.json()
        follow.innerHTML = `Home / Category / ${data.response.categorie} / <span style="font-weight: bold; color: #000;">${data.response.nom}</span>`;
        showDescription(data.response)
    }
    hiddenLoader();
});

function showDescription(data) {
    contentDescription.innerHTML = 
    `
        <div class="product-images">
            <img src="images/technology-785742_1280.jpg" alt="Gamepad Image 1">
            <img src="images/technology-785742_1280.jpg" alt="Gamepad Image 2">
            <img src="images/technology-785742_1280.jpg" alt="Gamepad Image 3">
            <img src="images/technology-785742_1280.jpg" alt="Gamepad Image 4">
        </div>
        <div class="main-image">
            <img src="images/technology-785742_1280.jpg" alt="">
        </div>
        <div class="product-details">
            <h1>${data.nom}</h1>
            <div class="rating">★★★★★ (50 Reviews) | <span>In Stock</span></div>
            <p class="price">${data.prix} €</p>
            <p>${data.description}</p>
            <div class="options">
                <a href="panier.html?id=${data.id}"><button class="buy-now">Add Now</button></a>
            </div>
            <div class="delivery-info">
                <p>📦 Free Delivery</p>
                <p>Enter your postal code for Delivery Availability</p>
                <p>🔄 Return Delivery</p>
                <p>Free 30 Days Returns, Details</p>
            </div>
        </div>
    `
}