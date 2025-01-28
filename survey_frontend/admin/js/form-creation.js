let questions = [];

function addQuestion() {
    const question = {
        type: "RadioButton",
        placeholder: "",
        required: false,
        additionalProperties: {
            options: [] // For storing options if applicable
        }
    };
    questions.push(question);
    renderQuestions();
}

function renderQuestions() {
    const form = document.getElementById("questionForm");
    form.innerHTML = ""; // Clear the form before rendering
    questions.forEach((question, index) => {
        const div = document.createElement("div");
        div.classList.add("question-container");
        div.innerHTML = `
            <h3>Question ${index + 1}</h3>
             <div class="placeholder-field">
                <label>Question:</label>
                <input type="text" placeholder="Enter the Question" value="${question.placeholder}" oninput="updatePlaceholder(${index}, this.value)">
            </div>
            <div class="question-field">
                <label>Answer Type</label>
                <select onchange="updateType(${index}, this.value)">
               
                 
                    <option value="RadioButton" ${question.type === "RadioButton" ? "selected" : ""}>Radio Button</option>
                    <option value="MultipleChoice" ${question.type === "MultipleChoice" ? "selected" : ""}>Multiple Choice</option>
                    <option value="DropDown" ${question.type === "DropDown" ? "selected" : ""}>Drop Down</option>
                    <option value="Paragraph" ${question.type === "Paragraph" ? "selected" : ""}>Paragraph</option>
                    <option value="FileUpload" ${question.type === "FileUpload" ? "selected" : ""}>File Upload</option>
                    <option value="DateAndTime" ${question.type === "DateAndTime" ? "selected" : ""}>Date and Time</option>
                    <option value="CheckBox" ${question.type === "CheckBox" ? "selected" : ""}>Checkbox</option>
                    <option value="Email" ${question.type === "Email" ? "selected" : ""}>Email</option>
                </select>
            </div>
          
           
            
            ${renderOptionsField(index, question)}
              <div class="question-required">
                <label>Required:</label>
                <input type="radio" name="required-${index}" value="true" ${question.required ? "checked" : ""} onchange="updateRequired(${index}, true)"> Yes
                <input type="radio" name="required-${index}" value="false" ${!question.required ? "checked" : ""} onchange="updateRequired(${index}, false)"> No
            </div>
        `;
        form.appendChild(div);
    });
}

function renderOptionsField(index, question) {
    if (["MultipleChoice", "RadioButton", "DropDown", "CheckBox"].includes(question.type)) {
        const options = question.additionalProperties.options || [];
        return `
            <div class="options-field">
                <label>Options:</label>
                <div id="options-container-${index}">
                    ${options.map((option, optIndex) => `
                        <div class="option-item">
                            <input type="text" value="${option}" oninput="updateOption(${index}, ${optIndex}, this.value)">
                            <button type="button" onclick="removeOption(${index}, ${optIndex})">Remove</button>
                        </div>
                    `).join('')}
                </div>
                <button type="button" onclick="addOption(${index})">Add Option</button>
            </div>
        `;
    }
    return "";
}

function updateType(index, value) {
    questions[index].type = value;
    if (["MultipleChoice", "RadioButton", "DropDown", "CheckBox"].includes(value)) {
        questions[index].additionalProperties.options = [];
    } else {
        delete questions[index].additionalProperties.options;
    }
    renderQuestions();
}

function updateRequired(index, value) {
    questions[index].required = value;
}

function updatePlaceholder(index, value) {
    questions[index].placeholder = value;
}

function addOption(index) {
    questions[index].additionalProperties.options.push("");
    renderQuestions();
}

function updateOption(questionIndex, optionIndex, value) {
    questions[questionIndex].additionalProperties.options[optionIndex] = value;
}

function removeOption(questionIndex, optionIndex) {
    questions[questionIndex].additionalProperties.options.splice(optionIndex, 1);
    renderQuestions();
}

function saveSurvey() {
    const surveyName = document.getElementById("surveyName").value;
    const surveyDescription = document.getElementById("surveyDescription").value;
    const survey = { name: surveyName, description: surveyDescription, questions };

    fetch("http://localhost:8080/api/surveys", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(survey)
    })
        .then(response => response.json())
        .then(data => alert("Survey saved successfully!"))
        .catch(error => console.error("Error:", error));
}
