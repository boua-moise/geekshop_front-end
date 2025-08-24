blockArticle1 = document.querySelector("div.un");
blockArticle2 = document.querySelector("div.deux");
blockArticle3 = document.querySelector("div.trois");


document.addEventListener('DOMContentLoaded', async (e) => {
    const result = await fetch("http://127.0.0.1:8000/article/main", {
        method: "GET",
        headers: {
            "content-type": "application/json"
        }
    });

    if (result.status == 200) {
        const data = await result.json()
        const hacking = data.hacking
        const systeme = data.systeme
        const network = data.network
        iteration(hacking, blockArticle1);
        iteration(systeme, blockArticle2);
        iteration(network, blockArticle3);
    }
});

document.addEventListener('click', (e) => {
    if (e.target.closest(".category")) {
        const element = e.target.closest(".category");
        
        switch (element.id) {
            case "Hacking":
                location.href = `articles.html?categorie=${element.id}`

                break;

            case "Network":
                location.href = `articles.html?categorie=${element.id}`
                
                break;

            case "Systeme":
                location.href = `articles.html?categorie=${element.id}`
                
                break;

            case "Programmation":
                location.href = `articles.html?categorie=${element.id}`
                
                break;

            case "Hardware":
                location.href = `articles.html?categorie=${element.id}`
                
                break;

            case "Iot":
                location.href = `articles.html?categorie=${element.id}`
                
                break;
        
            default:
                console.log("Never");
                
                break;
        }
    }
})

function iteration(tab, elementHtml) {
    elementHtml.innerHTML = ""
    for (const element of tab) {
        elementHtml.innerHTML += 
        `
            <article class="item" id="${element.id}">
                <img alt="Galaxy Ultra" src="images/technology-785742_1280.jpg">
                <p>${element.nom}</p>
                <p>${element.prix} €</p>
                <a href="description_article.html?id=${element.id}"><div class="btn-items">Voire l'article</div></a>
            </article>
        `
    }
}