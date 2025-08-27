const contentPanier = document.querySelector("tbody");
const follow = document.querySelector("div.breadcrumb");
const btnReturnShop = document.querySelector("button.return-shop");
const contentTotalSomme = document.querySelector("span.somme_total");
const id = localStorage.getItem("view")

let totalSomme = 0
let articlesPanier = {}

follow.innerHTML = `Home / My Account / History / ID /   <span style="font-weight: bold; color: #000;">${id}</span>`;

document.addEventListener("DOMContentLoaded", async () => {
    showLoader();
    

    const result = await fetch(`hhttps://geekshop-back-end.onrender.com/commandes/get_info/${id}`,{
        method: "GET",
        headers:{
            "content-type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    });

    if (result.status === 200) {
        const getPanier = await result.json();
        
        for (const element of getPanier.response) {
            articlesPanier[`${element.panier_id}`] = {
                "prix_initiale": element.prix,
                "quantite": element.quantite,
                "id": element.panier_id
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
                        ${element.quantite}
                    </td>
                    <td>${parseFloat(element.prix*element.quantite).toFixed(2)}€</td>
                </tr>
            `;
        }
    }else{
        location.href = "login.html"
    }

    totalSomme = calculSomme(articlesPanier).toFixed(2);
    contentTotalSomme.textContent = `${totalSomme} €`;
    
    hiddenLoader();
});

btnReturnShop.addEventListener("click", ()=> {
    location.href = document.referrer;
    
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
