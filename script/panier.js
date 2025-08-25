

// Récupère les paramètres de l'URL
const params = new URLSearchParams(window.location.search);

// Exemple : récupérer l'ID du produit
const id = params.get("id");

document.addEventListener("DOMContentLoaded", async ())