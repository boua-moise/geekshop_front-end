const main = document.querySelector("div.main");
const loader = document.querySelector("div.loader");
const header = document.querySelector("header");
const head = document.querySelector("head");
const footer = document.querySelector("footer");

const token = sessionStorage.getItem('token');

head.innerHTML += 
`
    <link rel="apple-touch-icon" sizes="180x180" href="favicon/apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="favicon/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="favicon/favicon-16x16.png">
    <link rel="manifest" href="favicon/site.webmanifest">
`

document.addEventListener("DOMContentLoaded", async () => {
    const result = await fetch("http://127.0.0.1:8000/auth/current_user", {
        method: "GET",
        headers: {
            "content-type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    });
    
    if (result.status == 200) {
        const data = await result.json();
        const dataUser = data.response;
        const nom = dataUser.nom 
        const prenom = dataUser.prenom
        
        header.innerHTML = 
    `
        <nav>

            <div class="logo"><a href="index.html">GeekShop</a></div>

            <div class="nav-links">
                <a href="index.html" class="index">Home</a>

                <span class="categorie-menu">
                    <div class="categorie-btn articles">Category</div>
                    <div class="dropdown-menu">
                        <a href="articles.html?categorie=Hacking">Hacking</a>
                        <a href="articles.html?categorie=Network">Network</a>
                        <a href="articles.html?categorie=Systeme">Systeme</a>
                        <a href="articles.html?categorie=Programmation">Programmation</a>
                        <a href="articles.html?categorie=Hardware">Hardware</a>
                        <a href="articles.html?categorie=Iot">Iot</a>
                    </div>
                </span>

                <a href="contact.html" class="contact">Contact</a>
                <a href="apropos.html" class="apropos">About</a>
            </div>

            <div class="search-bar">
                <input type="text" placeholder="What are you looking for?">
                <button>🔍</button>
            </div>

            <div class="nav-right">
                <div class="user-menu">
                    <div class="user-btn">${dataUser.nom[0]}${dataUser.prenom[0]}</div>
                    <div class="dropdown-menu">
                        <a href="account.html">Manage My Account</a>
                        <a href="#">My Order</a>
                        <a href="#">My Cancellations</a>
                        <a href="#">My Reviews</a>
                        <a href="logout.html">Logout</a>
                    </div>
                </div>
            </div>
        </nav>
    `
    }else{
        header.innerHTML = 
    `
        <nav>
            <div class="logo"><a href="index.html">GeekShop</a></div>
            <div class="nav-links">
                <a href="index.html" class="index">Home</a>
                <span class="categorie-menu">
                    <div class="categorie-btn articles">Category</div>
                    <div class="dropdown-menu">
                        <a href="articles.html?categorie=Hacking">Hacking</a>
                        <a href="articles.html?categorie=Network">Network</a>
                        <a href="articles.html?categorie=Systeme">Systeme</a>
                        <a href="articles.html?categorie=Programmation">Programmation</a>
                        <a href="articles.html?categorie=Hardware">Hardware</a>
                        <a href="articles.html?categorie=Iot">Iot</a>
                    </div>
                </span>
                <a href="contact.html" class="contact">Contact</a>
                <a href="apropos.html" class="apropos">About</a>
                <a href="singup.html" class="singup">Sign Up</a>
                <a href="login.html" class="login">Log In</a>
            </div>
            <div class="search-bar">
                <input type="text" placeholder="What are you looking for?">
                <button>🔍</button>
            </div>
        </nav>
    `
    }
    
});

footer.innerHTML = 
    `
        <div class="footer-content">
            <div class="footer-section">
                <h5>MegaMart</h5>
                <p>Contact Us</p>
                <p>📞 WhatApp: +91-1234</p>
                <p>📞 +91-911-2132</p>
                <div class="app-links">
                    <a href="#"><img src="app-store.png" alt="App Store"></a>
                    <a href="#"><img src="google-play.png" alt="Google Play"></a>
                </div>
            </div>
            <div class="footer-section">
                <h5>Most Popular Categories</h5>
                <p>Staples</p>
                <p>Personal Care</p>
                <p>Baby Care</p>
                <p>Vegetables &amp; Fruits</p>
                <p>Snacks &amp; Foods</p>
                <p>Dairy &amp; Bakery</p>
            </div>
            <div class="footer-section">
                <h5>Customer Services</h5>
                <p>About Us</p>
                <p>Terms &amp; Conditions</p>
                <p>FAQ</p>
                <p>Privacy Policy</p>
                <p>e-Waste Policy</p>
                <p>Cancellations &amp; Returns</p>
            </div>
        </div>
        <div style="border-bottom: 1px solid #9e9e9e;"></div>
        <p>© 2022 All rights reserved. Reliance Retail Ltd.</p>

    `

window.addEventListener('load', () => {
    main.style.display = "flex";
    loader.style.display = "none";
});

function hiddenLoader(){
    main.style.display = "flex";
    loader.style.display = "none";
}

function showLoader(){
    main.style.display = "none";
    loader.style.display = "flex";
}