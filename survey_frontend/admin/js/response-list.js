const urlParams = new URLSearchParams(window.location.search);
const surveyId = urlParams.get("id");
let surveyData = {};
let acceptedCount = 0;
let rejectedCount = 0;

if (surveyId) {
  fetch(`http://localhost:8080/api/surveys/${surveyId}`)
    .then(response => response.json())
    .then(data => {
      surveyData = data;
      document.getElementById("survey-title").textContent = `Survey Name: ${surveyData.name}`;
      fetchSurveyResponses(surveyId);
    })
    .catch(error => console.error("Error fetching survey data:", error));
} else {
  console.error("Survey ID not found in URL");
}

function fetchSurveyResponses(surveyId) {
  fetch(`http://localhost:8080/api/survey-responses/survey/${surveyId}`)
    .then(response => response.json())
    .then(data => displaySurveyResponses(data))
    .catch(error => console.error("Error fetching survey responses:", error));
}

function displaySurveyResponses(responses) {
  const responseContainer = document.getElementById("response-container");
  document.getElementById("total-responses").textContent = responses.length;
  responseContainer.innerHTML = "";

  responses.forEach((response, index) => {
    const responseId = response.id || response._id;
    if (!responseId) return;

    const status = localStorage.getItem(`response-status-${responseId}`) || "No Action";

    const card = document.createElement("div");
    card.className = "response-card";

    card.innerHTML = `
      <h3><a href="response-detail.html?id=${responseId}&surveyId=${surveyId}">Response ${index + 1}</a></h3>
      <p><strong>Status:</strong> <span class="status-label">${status}</span></p>
    `;

    responseContainer.appendChild(card);
  });

  updateCounters();
}

function updateCounters() {
  const responses = document.querySelectorAll(".status-label");
  acceptedCount = [...responses].filter(label => label.textContent === "Accepted").length;
  rejectedCount = [...responses].filter(label => label.textContent === "Rejected").length;

  document.getElementById("accepted-responses").textContent = acceptedCount;
  document.getElementById("rejected-responses").textContent = rejectedCount;
}
