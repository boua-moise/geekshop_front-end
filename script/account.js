const welcome = document.querySelector("div.welcome");

const sectionForm = document.querySelector("section.profile-edit");

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

        console.log(dataUser);

        sessionStorage.setItem("user_id", dataUser.id)
        
        
        welcome.textContent += `${dataUser.nom} ${dataUser.prenom}`;
        sectionForm.innerHTML += 
        `
            <form>

                <div class="form-group">
                    <label>First Name</label>
                    <input type="text" value="${dataUser.nom}" disabled>
                </div>

                <div class="form-group">
                    <label>Last Name</label>
                    <input type="text" value="${dataUser.prenom}" disabled>
                </div>

                <div class="form-group">
                    <label>Email</label>
                    <input type="email" value="${dataUser.mail}" disabled>
                </div>
                <div class="form-group">
                    <label>Numero</label>
                    <input type="tel" value="${dataUser.numero}" disabled>
                </div>

                <div class="form-group">
                    <label>Password Changes</label>
                    <input type="password" placeholder="Current Password">
                    <input type="password" placeholder="New Password">
                    <input type="password" placeholder="Confirm New Password">
                </div>

                <button type="button">Cancel</button>
                <button type="submit" class="save">Save Changes</button>

            </form>
        `
    }else{
        location.href = "index.html";
    }
    
});


