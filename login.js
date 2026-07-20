// =====================================
// ProjectPilot AI
// login.js
// =====================================

const form = document.getElementById("loginForm");

const email = document.getElementById("email");

const password = document.getElementById("password");

const togglePassword = document.getElementById("togglePassword");

// ==========================
// Show / Hide Password
// ==========================

togglePassword.addEventListener("click", () => {

if(password.type === "password"){

password.type = "text";

togglePassword.innerHTML = "🙈";

}

else{

password.type = "password";

togglePassword.innerHTML = "👁";

}

});

// ==========================
// Login
// ==========================

form.addEventListener("submit", async(e)=>{

e.preventDefault();

const {error} = await db.auth.signInWithPassword({

email:email.value,

password:password.value

});

if(error){

alert(error.message);

return;

}

alert("✅ Login Successful");

window.location.href="dashboard.html";

});
