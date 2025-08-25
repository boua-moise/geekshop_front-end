const formSubmit = document.querySelector("form");

formSubmit.addEventListener("submit", async (e) => {
    e.preventDefault();
    showLoader();
    const dataForm = new FormData(e.target);
    dataJson = Object.fromEntries(dataForm);

    const result = await fetch("http://127.0.0.1:8000/auth/login", {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(dataJson)
    });

    if (result.status == 200) {
        const value = await result.json();
        sessionStorage.setItem("token", value.response)
        location.href = "index.html"
    }else{
        hiddenLoader();
        const value = await result.json();
        alert(value.detail)
    }
});

