// const urlParams = new URLSearchParams(window.location.search);
// const surveyId = urlParams.get("id");

// console.log("Survey ID:", surveyId);  // Debugging: Check if surveyId is correct

// if (surveyId) {
//     fetchSurveyResponses(surveyId);
// } else {
//     console.error("Survey ID not found in URL");
// }

// function fetchSurveyResponses(surveyId) {
//     fetch(`http://localhost:8080/api/survey-responses/survey/${surveyId}`, {
//         method: "GET",
//         headers: { "Content-Type": "application/json" }
//     })
//     .then(response => {
//         if (!response.ok) {
//             throw new Error('HTTP error! Status: ' + response.status);
//         }
//         return response.json();
//     })
//     .then(data => {
//         console.log("Fetched responses:", data); // Debugging
//         displaySurveyResponses(data);
//     })
//     .catch(error => {
//         console.error('Error fetching survey responses:', error);
//     });
// }

// function displaySurveyResponses(responses) {
//     const responseList = document.getElementById("response-list");
//     responseList.innerHTML = ""; // Clear existing list before appending new ones

//     responses.forEach(response => {
//         const firstQuestion = response.responses?.find(q => q.name);  // Find first valid question
//         const name = firstQuestion ? firstQuestion.name : "Anonymous"; // Fallback if no name
//         const responseId = response.id; // Ensure correct ID is used

//         if (!responseId) {
//             console.warn("Skipping response with missing ID:", response);
//             return;
//         }

//         const listItem = document.createElement("li");
//         const responseLink = document.createElement("a");
//         responseLink.href = `response-details-new.html?id=${responseId}`; // Redirect to response details
//         responseLink.textContent = `Response from ${name}`;
//         listItem.appendChild(responseLink);
//         responseList.appendChild(listItem);
//     });
// }


function fetchSurveyResponse() {
  const urlParams = new URLSearchParams(window.location.search);
  const surveyId = urlParams.get("id");

  if (!surveyId) {
      alert("Survey ID not found!");
      return;
  }

  fetch(`http://localhost:8080/api/survey-responses/${surveyId}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" }
    })
    
  .then(response => {
      if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
  })
  .then(data => {
    console.log("Fetched Data:", data);
      const responseContainer = document.getElementById("response-details");
      responseContainer.innerHTML = ""; 

      if (data.responses.length === 0) {
          responseContainer.innerHTML = "<p>No responses available for this survey.</p>";
          return;
      }

      data.responses.forEach(item => {
        console.log("Response Item:", item); 
          const card = document.createElement("div");
          card.className = "response-card";

          // Ensure you're referencing the correct field for the question text
          let questionText = item.question || item.placeholder || item.name || "Unknown Question"; // Replace with correct field
          let answerContent = Array.isArray(item.answer) ? item.answer.join(", ") : item.answer;

          card.innerHTML = `
              <h3>${questionText}</h3>
              <p><strong>Answer:</strong> ${answerContent}</p>
              <p><strong>Required:</strong> ${item.required ? "Yes" : "No"}</p>
          `;

          responseContainer.appendChild(card);
      });
  })
  .catch(error => console.error("Error fetching survey details:", error));
}

document.addEventListener("DOMContentLoaded", fetchSurveyResponse);
