const user_id = sessionStorage.getItem("user_id");
const contentPanier = document.querySelector("tbody");
const sectionMain = document.querySelector("section.cart");
const btnUpdate = document.querySelector("button.update-cart");
const btnReturnShop = document.querySelector("button.return-shop");
const contentTotalSomme = document.querySelector("span.somme_total");
const btnByShop = document.getElementById("buy");


const navEntries = performance.getEntriesByType('navigation');
const isReload = navEntries.length > 0 && navEntries[0].type === 'reload';

// Récupère les paramètres de l'URL
const params = new URLSearchParams(window.location.search);

// Exemple : récupérer l'ID du produit
const id = params.get("id");
let articleId = []
let panierId = []
let totalSomme = 0
let articlesDelete = []
let articlesPanier = {}
// console.log(document.head.nextElementSibling.textContent);

document.addEventListener("DOMContentLoaded", async () => {
    showLoader();
    if (!isReload) {
        const resultUpdate = await fetch(`https://geekshop-back-end.onrender.com/panier/update/1?article_id=${id}`, {
            method: "PUT",
            headers: {
                "content-type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });
        // Tu peux relancer une requête API, afficher un message, ou réinitialiser un composant
    }
    

    const result = await fetch(`https://geekshop-back-end.onrender.com/panier/get`,{
        method: "GET",
        headers:{
            "content-type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    });

    if (result.status === 200) {
        const getPanier = await result.json();
        
        for (const element of getPanier.response) {
            
            articleId.push(element.id);
            panierId.push(element.panier_id)
            articlesPanier[`${element.panier_id}`] = {
                "prix_initiale": element.prix,
                "quantite": element.quantite,
                "id": element.panier_id
            }
        }
        
        
        if (!isReload) {
            if (!articleId.includes(parseInt(id))) {
                const restultAdd = fetch("https://geekshop-back-end.onrender.com/panier/add", {
                    method: "POST",
                    headers: {
                        "content-type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                    body: JSON.stringify({"article_id": id})
                });

                if ((await restultAdd).status == 200) {
                    location.reload();
                }
            }
        }
            
        if (getPanier.response.length === 0) {
            sectionMain.innerHTML =
            `
                <h1>Aucun article ajouter</h1>
            `
        }
            
        for (const element of getPanier.response) {
            
            contentPanier.innerHTML +=
            `
                <tr>
                    <td class="content-image">
                        <img src="images/technology-785742_1280.jpg" alt="HI Gamepad">
                        <span>${element.nom}</span>
                        <p></p>
                    </td>
                    <td>${element.prix}€</td>
                    <td>
                        <input type="number" id="${element.panier_id}" value="${element.quantite}" min="1">
                    </td>
                    <td>${parseFloat(element.prix*element.quantite).toFixed(2)}€</td>
                    <td><input type="checkbox" id="${element.panier_id}"></td>
                </tr>
            `;
        }
    }else{
        location.href = "login.html"
    }

    totalSomme = calculSomme(articlesPanier);
    contentTotalSomme.textContent = `${totalSomme} €`;
    
    hiddenLoader();
});

contentPanier.addEventListener("click", async (e) => {
    const element = e.target

    if (element.closest("input[type='checkbox']")) {

        if (articlesDelete.includes(element.id)) {
            
            articlesDelete = articlesDelete.filter(item => item !== element.id);
        }else{
            articlesDelete.push(element.id);
        }
        
        // const result = await fetch(`https://geekshop-back-end.onrender.com/panier/delete/${element.id}`, {
        //     method: "DELETE",
        //     headers: {
        //         "content-type": "application/json",
        //         "Authorization": `Bearer ${token}`
        //     }
        // });
    }

    if (element.closest("input[type='number']")) {
        const input = element;
        const contentPrice = element.parentElement.nextElementSibling;
        articlesPanier[`${element.id}`]["quantite"] = parseFloat(input.value)
        const prixChange = articlesPanier[`${element.id}`]["prix_initiale"]*articlesPanier[`${element.id}`]["quantite"];

        contentPrice.textContent = `${prixChange.toFixed(2)}€`
        
        totalSomme = calculSomme(articlesPanier);
        contentTotalSomme.textContent = `${totalSomme} €`;
    }
});

btnUpdate.addEventListener("click", async () => {
    showLoader();
    for (const key in articlesPanier) {
        if (Object.prototype.hasOwnProperty.call(articlesPanier, key)) {
            const element = articlesPanier[key];
            
            const result = await fetch(`https://geekshop-back-end.onrender.com/panier/update/${element.id}?quantite=${element.quantite}`, {
                method: "PUT",
                headers: {
                    "content-type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });
        }
    }
    

    if (articlesDelete.length !== 0) {
        for (const element of articlesDelete) {
            
            
            const resultDelete = await fetch(`https://geekshop-back-end.onrender.com/panier/delete/${element}`, {
                method: "DELETE",
                headers: {
                    "content-type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });
            
        }
    }

    location.reload();
    
});

btnReturnShop.addEventListener("click", ()=> {
    location.href = document.referrer;
    
});

btnByShop.addEventListener("click", async () => {
    showLoader();
    const result = await fetch("https://geekshop-back-end.onrender.com/commandes/buy", {
        method: "POST",
        headers: {
            "content-type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({"ids": panierId, "total": totalSomme})
    });

    if (result.status == 200) {
        location.href = "historique.html";
    }
});


function calculSomme(tab) {
    let result = 0

    for (const key in tab) {
            if (Object.prototype.hasOwnProperty.call(tab, key)) {
                const element = tab[key];
                result += element.prix_initiale*element.quantite                
            }
        }
    return result.toFixed(2)
}
