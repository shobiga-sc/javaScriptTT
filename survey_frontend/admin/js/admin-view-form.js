
function getSurvey() {
  const params = new URLSearchParams(window.location.search);
  const surveyId = params.get("id");

  fetch(`http://localhost:8080/api/surveys/${surveyId}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  })
    .then((response) => response.json())
    .then((data) => {
      surveyData = data;  // Store the survey data globally

      document.getElementById("survey-title").textContent = data.name;
      const form = document.getElementById("survey-form");
      form.innerHTML = ""; // Clear form

      data.questions.forEach((question, index) => {
        const field = document.createElement("div");
        field.className = "form-field";

        // Check if the field is required
        const isRequired = question.required ? "required" : "";

        switch (question.type) {
          case "Paragraph":
            field.innerHTML = `
                  <label>${question.placeholder}</label>
                  <textarea name="question-${index}" ${isRequired}></textarea>`;
            break;
          case "MultipleChoice":
            field.innerHTML = `
                    <label>${question.placeholder}</label>
                    ${question.additionalProperties.options
                      .map(
                        (option, i) =>
                          `<label><input type="checkbox" name="multipleChoice-${index}" value="${option}" ${isRequired}> ${option}</label>`
                      )
                      .join("")}`;
            break;
          case "RadioButton":
            field.innerHTML = `
                        <label>${question.placeholder}</label>
                        ${question.additionalProperties.options
                          .map(
                            (option, i) =>
                              `<label><input type="radio" name="radio-${index}" value="${option}" ${isRequired}> ${option}</label>`
                          )
                          .join("")}`;
            break;
          case "DropDown":
            field.innerHTML = `
                            <label>${question.placeholder}</label>
                            <select name="dropdown-${index}" ${isRequired}>
                              <option value="">Select...</option>
                              ${question.additionalProperties.options
                                .map((option) => `<option value="${option}">${option}</option>`)
                                .join("")}
                            </select>`;
            break;
          case "FileUpload":
            field.innerHTML = `
                  <label>${question.placeholder}</label>
                  <input type="file" name="file-${index}" ${isRequired}/>`;
            break;
          case "DateAndTime":
            field.innerHTML = `
                  <label>${question.placeholder}</label>
                  <input type="datetime-local" name="datetime-${index}" ${isRequired}/>`;
            break;
          case "Email":
            field.innerHTML = `
                  <label>${question.placeholder}</label>
                  <input type="email" name="email-${index}" placeholder="example@domain.com" ${isRequired}/>`;
            break;
        }

        form.appendChild(field);
      });
    })
    .catch((error) => console.error("Error:", error));
}

getSurvey();