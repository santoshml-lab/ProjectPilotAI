// =====================================
// ProjectPilot AI
// newproject.js
// =====================================

const form = document.getElementById("projectForm");
const output = document.getElementById("output");

const API_URL = "https://projectpilotlession.onrender.com/generate-project";

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

    } catch (err) {

        output.innerHTML = "❌ Failed to connect to ProjectPilot AI API.";

        console.error(err);

    }

});
