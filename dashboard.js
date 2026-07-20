// =====================================
// ProjectPilot AI
// dashboard.js
// =====================================

// Welcome User
const userName = localStorage.getItem("userName") || "Developer";

const welcome = document.querySelector(".topbar h2");

if (welcome) {
    welcome.innerHTML = `👋 Welcome Back, ${userName}`;
}

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

    logoutBtn.addEventListener("click", (e) => {

        e.preventDefault();

        if (confirm("Do you want to logout?")) {

            localStorage.clear();

            window.location.href = "login.html";

        }

    });

}

// =====================================
// Animate Cards
// =====================================

const cards = document.querySelectorAll(
".action-card,.project-card,.stat-card,.tech-card,.tip-card"
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

// =============================
// Dashboard.js
// =============================

const supabase = window.db;

const projectHistory = document.getElementById("projectHistory");

// Load Projects
async function loadProjects() {

    const {
        data: { user }
    } = await supabase.auth.getUser();

    if (!user) {

        window.location.href = "login.html";
        return;

    }

    const { data, error } = await supabase

        .from("projects")

        .select("*")

        .eq("user_id", user.id)

        .order("created_at", { ascending: false });

    if (error) {

        console.log(error);
        return;

    }

    if (!data || data.length === 0) {

        projectHistory.innerHTML = `
        <div class="project-card">
            <h3>No Projects Yet</h3>
            <p>Generate your first project.</p>
        </div>
        `;
        return;

    }

    projectHistory.innerHTML = "";

    data.forEach(project => {

        projectHistory.innerHTML += `
        <div class="project-card">

            <h3>${project.project_name}</h3>

            <p>${project.project_type}</p>

            <span>
                ${new Date(project.created_at).toLocaleDateString()}
            </span>

            <br><br>

            <button class="card-btn"
                onclick="openProject('${project.id}')">

                Open

            </button>

            <button class="card-btn"
                onclick="deleteProject('${project.id}')">

                Delete

            </button>

        </div>
        `;

    });

}

// Open Project
window.openProject = async function(id) {

    localStorage.setItem("project_id", id);

    window.location.href = "newproject.html";

};

// Delete Project
window.deleteProject = async function(id) {

    if (!confirm("Delete this project?")) return;

    await supabase

        .from("projects")

        .delete()

        .eq("id", id);

    loadProjects();

};

// Start
loadProjects();

// =====================================
// Current Date
// =====================================

console.log("Dashboard Loaded Successfully 🚀");
