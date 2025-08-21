const main = document.querySelector("div.main");
const loader = document.querySelector("div.loader");
const header = document.querySelector("header");
const footer = document.querySelector("footer");

header.innerHTML = 
    `
        <nav>
            <div class="logo"><a href="index.html">GeekShop</a></div>
            <div class="nav-links">
                <a href="index.html">Home</a>
                <a href="articles.html">Catégories</a>
                <a href="contact.html">Contact</a>
                <a href="apropos.html">About</a>
                <a href="singup.html">Sign Up</a>
                <a href="login.html">Log In</a>
            </div>
            <div class="search-bar">
                <input type="text" placeholder="What are you looking for?">
                <button>🔍</button>
            </div>
        </nav>
    `

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
    console.log("terminé!");
    main.style.display = "flex";
    loader.style.display = "none";
})