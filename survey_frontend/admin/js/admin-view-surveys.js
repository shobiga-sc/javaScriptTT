// function viewSurveys() {
//     fetch("http://localhost:8080/api/surveys/surveyList", {
//         method: "GET",
//         headers: {
//             "Content-Type": "application/json"
//         }
//     })
//         .then(response => response.json())
//         .catch(error => console.error("Error:", error));
// }
function navigateTo(page) {
  window.location.href = page;
}

function viewSurveys() {
  fetch("http://localhost:8080/api/surveys/surveyList", {
      method: "GET",
      headers: {
          "Content-Type": "application/json"
      }
  })
  .then(response => response.json())
  .then(data => {
      const container = document.getElementById("survey-container");
      container.innerHTML = ""; 
      data.forEach(survey => {
          const card = document.createElement("div");
          card.className = "card";
          // Add name and description to the card
          card.innerHTML = `
              <h3  class="survey-name">${survey.name}</h3>
              <p   class="survey-description">${survey.description}</p>
          `;
          card.onclick = () => {
              window.location.href = `admin-view-form.html?id=${survey.id}`;
          };
          container.appendChild(card);
      });
  })
  .catch(error => console.error("Error:", error));
}

// Call the function to load surveys on page load
viewSurveys();
