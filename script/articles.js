const products = document.querySelector("div.product-grid");
const follow = document.querySelector("div.breadcrumb");

// Récupère les paramètres de l'URL
const params = new URLSearchParams(window.location.search);

// Exemple : récupérer l'ID du produit
const categorie = params.get("categorie");

if (!categorie) {
    location.href = location.origin;
}

follow.innerHTML = `Home / Category / <span style="font-weight: bold; color: #000;">${categorie}</span>`;

document.addEventListener("DOMContentLoaded", async () => {
    const result = await fetch(`https://geekshop-back-end.onrender.com/article/${categorie}`, {
        method: "GET",
        headers:{
            "content-type": "application/json"
        }
    });
    
    if (result.status == 200) {
        const data = await result.json();
        sendAllArticles(data.response);
    }else{
        location.href = location.origin;
    }
});

products.addEventListener('click', (e) => {
    if(e.target.closest("article")){
        const element = e.target.closest("article");
        location.href = `description_article.html?id=${element.id}`;
    }
    
});

function sendAllArticles(object) {
    products.innerHTML = "";
    for (const element of object) {
        products.innerHTML += 
        `
            <article class="product-card" id="${element.id}">
                <img src="images/technology-785742_1280.jpg" alt="Seeds of Change">
                <span class="category">${categorie}</span>
                <p>${element.nom}</p>
                <div class="content-price">
                    <p class="price">${element.prix} €</p>
                    <a href="panier.html?id=${element.id}"><button>🛒Add</button></a>
                </div>
            </article>
        `;
    }
}