function viewSurveyResponses() {
  fetch("http://localhost:8080/api/survey-responses/form-names", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      const container = document.getElementById("response-container");
      container.innerHTML = ""; // Clear any existing content

      data.forEach((response) => {
        const card = document.createElement("div");
        card.className = "card";

        card.innerHTML = `<h3>${response.name}</h3>`;

        card.onclick = () => {
          alert(`Viewing responses for: ${response.name}`);
          window.location.href = `response-details.html?id=${response.id}`;
        };

        container.appendChild(card);
      });
    })
    .catch((error) => console.error("Error fetching survey responses:", error));
}

// Call the function to load survey responses on page load
viewSurveyResponses();
