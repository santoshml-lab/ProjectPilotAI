// =====================================
// ProjectPilot AI
// newproject.js
// =====================================

const form = document.getElementById("projectForm");
const output = document.getElementById("output");

const API_URL = "https://projectpilotlession.onrender.com/generate-project";
// ================================
// Save Project
// ================================

async function saveProject(project, aiResult) {

    const {
        data: { session }
    } = await db.auth.getSession();

    if (!session) return;

    const { error } = await db
        .from("projects")
        .insert({

            user_id: session.user.id,

            project_name: project.project_name,

            project_type: project.project_type,

            frontend: project.frontend,

            backend: project.backend,

            database_name: project.database,

            auth_type: project.auth,

            deployment: project.deployment,

            features: project.features,

            description: project.description,

            result: aiResult

        });

    if (error) {

        console.log("Save Error:", error);

    } else {

        console.log("✅ Project Saved");

    }

}

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    output.innerHTML = "🤖 AI is generating your project... Please wait...";

    const data = {

        project_name: document.getElementById("projectName").value,

        project_type: document.getElementById("projectType").value,

        frontend: document.getElementById("frontend").value,

        backend: document.getElementById("backend").value,

        database: document.getElementById("database").value,

        auth: document.getElementById("auth").value,

        deployment: document.getElementById("deployment").value,

        features: document.getElementById("features").value,

        description: document.getElementById("description").value

    };

    try {

        const response = await fetch(API_URL, {

            method: "POST",

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify(data)

        });

        const result = await response.json();

        if (!response.ok) {

            output.innerHTML = "❌ " + (result.detail || "Something went wrong.");

            return;

        }

        output.innerHTML = `
<pre>${result.result}</pre>
`;
        
// ================================
// Save Project History
// ================================

await saveProject(data, result.result);
        
    } catch (err) {

        output.innerHTML = "❌ Failed to connect to ProjectPilot AI API.";

        console.error(err);

    }

});
