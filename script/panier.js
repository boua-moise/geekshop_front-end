const user_id = sessionStorage.getItem("user_id");
const contentPanier = document.querySelector("tbody");
const btnUpdate = document.querySelector("button.update-cart");

// Récupère les paramètres de l'URL
const params = new URLSearchParams(window.location.search);
document.body.childNodes
// Exemple : récupérer l'ID du produit
const id = params.get("id");
let id_panier = []
let articlesPanier = {}
// console.log(document.head.nextElementSibling.textContent);

document.addEventListener("DOMContentLoaded", async () => {

    const resultUpdate = await fetch(`http://127.0.0.1:8000/panier/update/1?article_id=${id}`, {
        method: "PUT",
        headers: {
            "content-type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    });

    console.log(resultUpdate);
    

    const result = await fetch(`http://127.0.0.1:8000/panier/get?user_id=${user_id}`,{
        method: "GET",
        headers:{
            "content-type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    });

    if (result.status == 200) {
        const getPanier = await result.json();
        
        for (const element of getPanier.response) {
            id_panier.push(element.id);
            articlesPanier[`${element.panier_id}`] = {
                "prix_initiale": element.prix,
                "quantite": element.quantite,
                "id": element.panier_id
            }
        }
        
        
        if (!id_panier.includes(parseInt(id))) {
            const restultAdd = fetch("http://127.0.0.1:8000/panier/add", {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({"user_id": user_id, "article_id": id})
            });

            if ((await restultAdd).status == 200) {
                console.log("Ajouté");
                
            }
        }

        const result1 = await fetch(`http://127.0.0.1:8000/panier/get?user_id=${user_id}`,{
            method: "GET",
            headers:{
                "content-type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });

        if (result1.status == 200) {
            const getPanier1 = await result1.json();
        
        for (const element of getPanier1.response) {
            
            contentPanier.innerHTML +=
            `
                <tr>
                    <td>
                        <img src="hi-gamepad.jpg" alt="HI Gamepad">
                        <span>${element.nom}</span>
                    </td>
                    <td>${element.prix} €</td>
                    <td>
                        <input type="number" id="${element.panier_id}" value="${element.quantite}" min="1">
                    </td>
                    <td>$${parseFloat(element.prix*element.quantite)}</td>
                    <td><input type="checkbox" id="${element.panier_id}"></td>
                </tr>
            `;
            }
        }
    }

    
});

contentPanier.addEventListener("click", async (e) => {
    const element = e.target

    if (element.id) {
        
        // const result = await fetch(`http://127.0.0.1:8000/panier/delete/${element.id}`, {
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
        contentPrice.textContent = "$" + prixChange
        
        console.log(articlesPanier);
    }
});

btnUpdate.addEventListener("click", async () => {
    for (const key in articlesPanier) {
        if (Object.prototype.hasOwnProperty.call(articlesPanier, key)) {
            const element = articlesPanier[key];
            
            const result = await fetch(`http://127.0.0.1:8000/panier/update/${element.id}?quantite=${element.quantite}`, {
                method: "PUT",
                headers: {
                    "content-type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });
        }
    }

    location.reload()
    
})