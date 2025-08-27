const contentPanier = document.querySelector("tbody");
const btnReturnShop = document.querySelector("button.return-shop");



document.addEventListener("DOMContentLoaded", async () => {
    showLoader();

    const result = await fetch(`https://geekshop-back-end.onrender.com/commandes/get`,{
        method: "GET",
        headers:{
            "content-type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    });

    if (result.status === 200) {
        const getPanier = await result.json();
            
        if (getPanier.response.length === 0) {
            sectionMain.innerHTML =
            `
                <h1>Aucune Historique</h1>
            `
        }
            
        for (const element of getPanier.response) {
            
            contentPanier.innerHTML +=
            `
                <tr>
                    <td>
                        <span>${element.id}</span>
                    </td>
                    <td>${element.panier.length}</td>
                    <td>
                        ${element.prix_total}€
                    </td>
                    <td class="${element.statut.toLowerCase()}">${element.statut}</td>
                    <td class="td-btn"><button id="${element.id}" class="proced-checkout ${element.statut.toLowerCase()}">Annuler</button></td>
                    <td class="td-btn"><button id="${element.id}" class="proced-checkout view">voir</button></td>
                </tr>
            `;
        }
    }else{
        location.href = "login.html";
    }
    
    hiddenLoader();
});

contentPanier.addEventListener("click",  async (e) =>{
    const element = e.target.classList.value
    const node = e.target.id
    if (element.includes("encours")) {
        showLoader();
        const result = await fetch(`https://geekshop-back-end.onrender.com/commandes/annuler/${node}`,{
            method: "POST",
            headers:{
                "content-type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });

        if (result.status === 200) {
            location.reload();
        }
    }

    if (element.includes("view")) {
        console.log("ok");
        localStorage.setItem("view", node);
        location.href = "view.html"
    }
})

btnReturnShop.addEventListener("click", ()=> {
    location.href = document.referrer;
    
});

