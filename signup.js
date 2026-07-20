// =====================================
// ProjectPilot AI
// signup.js
// =====================================

const form = document.getElementById("signupForm");

const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");

const togglePassword = document.getElementById("togglePassword");

// ==========================
// Show / Hide Password
// ==========================

togglePassword.addEventListener("click", () => {

    if (passwordInput.type === "password") {

        passwordInput.type = "text";
        togglePassword.innerHTML = "🙈";

    } else {

        passwordInput.type = "password";
        togglePassword.innerHTML = "👁";

    }

});

// ==========================
// Signup
// ==========================

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    if (passwordInput.value !== confirmPassword.value) {

        alert("❌ Passwords do not match.");
        return;

    }

    const { error } = await db.auth.signUp({

        email: emailInput.value,

        password: passwordInput.value,

        options: {

            data: {

                full_name: nameInput.value

            }

        }

    });

    if (error) {

        alert(error.message);
        return;

    }

    alert("✅ Account created successfully!\nPlease check your email if verification is enabled.");

    window.location.href = "login.html";

});
