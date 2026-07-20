// =====================================
// ProjectPilot AI
// dashboard.js
// =====================================
alert("Dashboard JS Loaded");





// Welcome User
const userName = localStorage.getItem("userName") || "Developer";

const welcome = document.querySelector(".topbar h2");

if (welcome) {
    welcome.innerHTML = `👋 Welcome Back, ${userName}`;
}

// =====================================
// Supabase
// =====================================

alert("1");

const supabase = window.db;

alert("2");

    
    

// =====================================
// New Project Button
// =====================================

const newProjectBtn = document.querySelector(".new-project-btn");

if (newProjectBtn) {
    newProjectBtn.addEventListener("click", () => {
        window.location.href = "newproject.html";
    });
}

// =====================================
// Hero Button
// =====================================

const startBtn = document.querySelector(".start-btn");

if (startBtn) {
    startBtn.addEventListener("click", () => {
        window.location.href = "newproject.html";
    });
}

// =====================================
// Quick Action Buttons
// =====================================

document.querySelectorAll(".card-btn").forEach(btn => {

    btn.addEventListener("click", () => {

        const title = btn.parentElement.querySelector("h3").innerText;

        alert(title + " is coming soon 🚀");

    });

});

// =====================================
// Logout
// =====================================

const logoutBtn = document.querySelector('a[href="login.html"]');

if (logoutBtn) {

    logoutBtn.addEventListener("click", async (e) => {

        e.preventDefault();

        if (confirm("Do you want to logout?")) {

            await supabase.auth.signOut();

            localStorage.clear();

            window.location.href = "login.html";

        }

    });

}

// =====================================
// Animate Cards
// =====================================

const cards = document.querySelectorAll(
".action-card,.project-card,.stat-card,.tech-card,.tip-card,.profile-card,.activity-card"
);

cards.forEach((card, index) => {

    card.style.opacity = "0";

    card.style.transform = "translateY(20px)";

    setTimeout(() => {

        card.style.transition = ".5s ease";

        card.style.opacity = "1";

        card.style.transform = "translateY(0)";

    }, index * 120);

});

// =====================================
// Project History
// =====================================



// =====================================
// Dashboard Loaded
// =====================================

console.log("✅ Dashboard Loaded Successfully");


