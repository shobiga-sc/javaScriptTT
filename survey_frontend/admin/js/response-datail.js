const urlParams = new URLSearchParams(window.location.search);
const responseId = urlParams.get("responseId");
const surveyId = urlParams.get("surveyId");

if (!responseId || !surveyId) {
    console.error("Missing responseId or surveyId in URL");
} else {
    fetchResponseDetails(responseId, surveyId);
}

let surveyData = {};
let responseData = {};

function fetchResponseDetails(responseId, surveyId) {
    fetch(`http://localhost:8080/api/surveys/${surveyId}`)
        .then(response => response.json())
        .then(data => {
            surveyData = data;
            document.getElementById("survey-title").textContent = `Survey Name: ${surveyData.name}`;
            return fetch(`http://localhost:8080/api/survey-responses/${responseId}`);
        })
        .then(response => response.json())
        .then(data => {
            responseData = data;
            displayResponseDetails(responseData);
        })
        .catch(error => console.error("Error fetching response details:", error));
}

function displayResponseDetails(response) {
    const responseDetails = document.getElementById("response-details");
    responseDetails.innerHTML = `
        <p><strong>Response ID:</strong> ${response.id || response._id}</p>
        <p><strong>Survey ID:</strong> ${response.surveyId}</p>
        <p><strong>Answers:</strong></p>
        <ul>
            ${response.responses.map(q => {
                return `<li><strong>${q.question}:</strong> ${Array.isArray(q.answer) ? q.answer.join(", ") : q.answer}</li>`;
            }).join("")}
        </ul>
    `;
}

document.getElementById("approve-btn").addEventListener("click", () => updateResponseStatus("Accepted"));
document.getElementById("reject-btn").addEventListener("click", () => updateResponseStatus("Rejected"));

function updateResponseStatus(status) {
    fetch(`http://localhost:8080/api/survey-responses/${responseId}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status })
    })
    .then(response => {
        if (!response.ok) throw new Error("Failed to update response status");
        return response.json();
    })
    .then(() => {
        alert(`Response marked as ${status}`);
        window.location.href = `response-new.html?id=${surveyId}`;
    })
    .catch(error => console.error("Error updating response status:", error));
}
