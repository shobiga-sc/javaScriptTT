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
        container.innerHTML = ""; // Clear any existing content
        data.forEach(survey => {
          const card = document.createElement("div");
          card.className = "card";
          card.innerHTML = `<h3>${survey.name}</h3>`;
          card.onclick = () => alert(`Selected Survey: ${survey.name}`);
          card.onclick = () => {
            window.location.href = `responses.html?id=${survey.id}`;
          };
          container.appendChild(card);
        });
      })
      .catch(error => console.error("Error:", error));
  }

// Call the function to load surveys on page load
viewSurveys();