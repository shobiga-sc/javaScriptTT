// Function to fetch survey response details
function fetchSurveyResponse() {
    // Get survey ID from the URL query parameters
    const urlParams = new URLSearchParams(window.location.search);
    const surveyId = urlParams.get('id');

    if (!surveyId) {
        alert("Survey ID not found!");
        return;
    }

    fetch(`http://localhost:8080/api/survey-responses/${surveyId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        const responseContainer = document.getElementById("response-details");
        responseContainer.innerHTML = ""; // Clear previous content

        data.responses.forEach(item => {
            const card = document.createElement("div");
            card.className = "response-card";

            let answerContent = "";
            if (Array.isArray(item.answer)) {
                answerContent = item.answer.join(", ");
            } else {
                answerContent = item.answer;
            }

            card.innerHTML = `
                <h3>${item.placeholder}</h3>
                <p><strong>Answer:</strong> ${answerContent}</p>
                <p><strong>Required:</strong> ${item.required ? "Yes" : "No"}</p>
            `;

            responseContainer.appendChild(card);
        });
    })
    .catch(error => console.error("Error fetching survey details:", error));
}

// Load survey responses when the page loads
document.addEventListener("DOMContentLoaded", fetchSurveyResponse);
