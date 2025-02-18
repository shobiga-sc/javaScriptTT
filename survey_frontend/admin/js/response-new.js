const urlParams = new URLSearchParams(window.location.search);
const surveyId = urlParams.get("id");
let surveyData = {}; // Store survey details
let acceptedCount = 0;
let rejectedCount = 0;

if (surveyId) {
  fetch(`http://localhost:8080/api/surveys/${surveyId}`)
    .then((response) => response.json())
    .then((data) => {
      surveyData = data; // Store fetched survey data
      console.log("Survey Data:", surveyData);
      return fetchSurveyResponses(surveyId);
    })
    .catch((error) => console.error("Error fetching survey data:", error));
} else {
  console.error("Survey ID not found in URL");
}

function fetchSurveyResponses(surveyId) {
  return fetch(`http://localhost:8080/api/survey-responses/survey/${surveyId}`)
    .then(response => response.json())
    .then(data => displaySurveyResponses(data))
    .catch(error => console.error("Error fetching survey responses:", error));
}

function displaySurveyResponses(responses) {
  const responseContainer = document.getElementById("response-container");
  document.getElementById("total-responses").textContent = responses.length;
  document.getElementById("survey-title").textContent = `Survey Name: ${surveyData.name}`;
  responseContainer.innerHTML = ""; // Clear previous content

  acceptedCount = 0;
  rejectedCount = 0;

  responses.forEach((response, index) => {
    const responseId = response.id || response._id;
    if (!responseId) return;

    const currentStatus = response.status || "NO_ACTION"; // Default to "No Action"
    const card = document.createElement("div");
    card.className = "response-card";

    let ind = 0;
    // <p><strong>Response ID:</strong> ${responseId}</p>
    //   <p><strong>Survey ID:</strong> ${response.surveyId}</p>
    card.innerHTML = `
      <h3>Response ${index + 1}</h3>
      
      <p><strong>Questions: </strong>Answers</p>
      <ul>
        ${response.responses.map(q => {
          let placeholder = "Question";
          if (surveyData.questions && surveyData.questions[index]) {
            placeholder = surveyData.questions[ind++].placeholder || surveyData.questions[ind++].question;
          }
          return `<li><strong>${placeholder}:</strong> ${Array.isArray(q.answer) ? q.answer.join(", ") : q.answer}</li>`;
        }).join("")}
      </ul>
      <div class="toggle-container">
        <label class="toggle-switch">
          <input type="checkbox" class="toggle-input" data-id="${responseId}" onchange="toggleStatus(this)">
          <span class="toggle-slider"></span>
        </label>
        <span class="status-label">${currentStatus === "ACCEPTED" ? "Accepted" : currentStatus === "REJECTED" ? "Rejected" : "No Action"}</span>
      </div>
    `;

    if (currentStatus === "ACCEPTED") {
      card.style.borderColor = "green";
      card.querySelector(".toggle-input").checked = true;
      acceptedCount++;
    } else if (currentStatus === "REJECTED") {
      card.style.borderColor = "red";
      rejectedCount++;
    } else {
      card.style.borderColor = "gray";
    }

    responseContainer.appendChild(card);
  });

  updateCounters();
}

function toggleStatus(input) {
  const responseId = input.dataset.id;
  const statusLabel = input.parentElement.nextElementSibling;
  const card = input.closest(".response-card");

  let newStatus = "NO_ACTION"; // Default status is "No Action"

  // Handle status change based on the checkbox state
  if (input.checked) {
    newStatus = "ACCEPTED";
    statusLabel.textContent = "Accepted";
    card.style.borderColor = "green";
  } else if (!input.checked) {
    newStatus = "REJECTED";
    statusLabel.textContent = "Rejected";
    card.style.borderColor = "red";
  } else {
    statusLabel.textContent = "No Action";
    card.style.borderColor = "gray";
  }

  // Update the status in the database
  fetch(`http://localhost:8080/api/survey-responses/${responseId}/status?status=${newStatus}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
  })
    .then(response => {
      if (!response.ok) throw new Error("Failed to update status");
      return response.json();
    })
    .then(() => updateCounters()) // Fetch updated counts after status change
    .catch(error => console.error("Error updating response status:", error));
}


function updateResponseStatus(responseId, newStatus) {
  fetch(`http://localhost:8080/api/survey-responses/${responseId}/status?status=${newStatus}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" }
  })
  .catch(error => console.error("Error updating response status:", error));
}

function updateCounters() {
  fetch(`http://localhost:8080/api/survey-responses/${surveyId}/status-counts`, {
    method: "GET",
    headers: { "Content-Type": "application/json" }
  })
    .then(response => response.json())
    .then(data => {
      // Update the UI with the received counts
      document.getElementById("accepted-responses").textContent = data.ACCEPTED || 0;
      document.getElementById("rejected-responses").textContent = data.REJECTED || 0;
      document.getElementById("total-responses").textContent = (data.ACCEPTED || 0) + (data.REJECTED || 0) + (data.NO_ACTION || 0);
    })
    .catch(error => console.error("Error fetching response counts:", error));
}








// const urlParams = new URLSearchParams(window.location.search);
// const surveyId = urlParams.get("id");

// if (surveyId) {
//   fetchSurveyResponses(surveyId);
// } else {
//   console.error("Survey ID not found in URL");
// }

// function fetchSurveyResponses(surveyId) {
//   fetch(`http://localhost:8080/api/survey-responses/survey/${surveyId}`, {
//     method: "GET",
//     headers: { "Content-Type": "application/json" }
//   })
//   .then(response => {
//     if (!response.ok) {
//       throw new Error('HTTP error! Status: ' + response.status);
//     }
//     return response.json();
//   })
//   .then(data => {
//     displaySurveyResponses(data);
//   })
//   .catch(error => {
//     console.error('Error fetching survey responses:', error);
//   });
// }

// function displaySurveyResponses(responses) {
//   const responseList = document.getElementById("response-list");
//   if (!responses || responses.length === 0) {
//     responseList.innerHTML = "<p>No responses found for this survey.</p>";
//     return;
//   }

//   responses.forEach(response => {
//     const firstQuestion = response.responses?.find(q => q.name);
//     const name = firstQuestion ? firstQuestion.name : `Survey ID ${response.surveyId}`; // Fallback if name is missing
//     const responseId = response.id || response._id;

//     if (!responseId) {
//       console.warn("Skipping response with missing ID:", response);
//       return;
//     }

//     const listItem = document.createElement("li");
//     const responseLink = document.createElement("a");
//     responseLink.href = `response-details-new.html?id=${responseId}`;
//     responseLink.textContent = `Response from ${name}`;
//     listItem.appendChild(responseLink);
//     responseList.appendChild(listItem);
//   });
// }

// console.log("Survey ID:", surveyId);  // Check if surveyId is correct
