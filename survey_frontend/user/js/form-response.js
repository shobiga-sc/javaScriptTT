let surveyData = null;  // Declare a global variable to hold the survey data

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

      // Append the submit button at the end
      const submitButton = document.createElement("button");
      submitButton.type = "submit";
      submitButton.className = "submit-button";
      submitButton.textContent = "Submit";
      form.appendChild(submitButton);
    })
    .catch((error) => console.error("Error:", error));
}

// Ensure data is defined before submission
document.getElementById("survey-form").addEventListener("submit", function (e) {
  e.preventDefault();

  // Make sure the survey data is available
  if (!surveyData) {
    console.error("Survey data not loaded.");
    return;
  }

  const responses = [];
  const formElements = e.target.elements;

  surveyData.questions.forEach((question, index) => {
    
    const response = {
      questionId: `question-${index}`,
      questionType: "",
      placeholder: "",
      answer: "",
      required: false
    };

    response.placeholder = question.placeholder;
    response.required = question.required;
    response.questionType = question.questionType;

    const element = formElements[`question-${index}`] || formElements[`multipleChoice-${index}`] || formElements[`radio-${index}`] || formElements[`dropdown-${index}`] || formElements[`file-${index}`] || formElements[`datetime-${index}`] || formElements[`email-${index}`];
    
    if (element) {
      switch (question.type) {
        case "Paragraph":
          response.answer = element.value;
          break;
        case "MultipleChoice":
          response.answer = [];
          // Get all checkboxes for the current question
          const checkboxes = document.querySelectorAll(
            `input[name="multipleChoice-${index}"]:checked`
          );
          checkboxes.forEach((checkbox) => {
            response.answer.push(checkbox.value);
          });
          break;
        case "RadioButton":
          response.answer = formElements[`radio-${index}`]?.value || "";
          break;
        case "DropDown":
          response.answer = formElements[`dropdown-${index}`]?.value || "";
          break;
        case "FileUpload":
          response.answer = formElements[`file-${index}`]?.files[0]?.name || "";
          break;
        case "DateAndTime":
          response.answer = formElements[`datetime-${index}`]?.value || "";
          break;
        case "Email":
          response.answer = formElements[`email-${index}`]?.value || "";
          break;
      }

      responses.push(response);
    }
  });

  // Send responses to the backend
  const surveyResponse = {
    surveyId: surveyData.id, // Use the id of the survey from surveyData
    responses: responses,
  };

  fetch("http://localhost:8080/api/survey-responses", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(surveyResponse),
  })
    .then((response) => response.json())
    .then((data) => {
        alert("Survey response saved successfully!");
        window.location.href = "view-surveys.html";
    })
    .catch((error) => {
        console.error("Error submitting survey response:", error);
        alert("Error submitting survey response. Please try again.");
    });
});

getSurvey();
