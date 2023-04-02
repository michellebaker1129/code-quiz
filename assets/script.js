const questionsObject = {
    // add property to keep track of currently shown question
    currentQuestion: 0,
    questions: [
        {
            id: 0,
            question: "Which of the following is NOT a JavaScript keyword?",
            answers: ["var", "let", "const", "give"],
            correctAnswer: "give",
        },  {
            id: 1,
            question: "Which is the highest heading element?",
            answers: ["h1", "h2", "h3", "h4"],
            correctAnswer: "h1",   
        }, {
            id: 2,
            question: "Which is the lowest heading element?",
            answers: ["h1", "h2", "h3", "h4"],
            correctAnswer: "h4",
        }
    ],
    answerQuestion: function (question, answerGiven) {
        // compare answerGiven to question.correctAnswer
        // return true or false
    },
    // add method to show next question
    showNextQuestion: function () {},

}

const questionMarkup = `<div class="question">
    <h2>${obj.questions[0].question}</h2>
    <ul>
        <li>
            <button>
                ${questions[0].answers[0]}
            </button>
        </li>
        <li>${questions[0].answers[1]}</li>
        <li>${questions[0].answers[2]}</li>
        <li>${questions[0].answers[3]}</li>
    </ul>
</div>
`;

// Select start button
// Add event listener to start button
// Hide intro section
// Reveal quiz section 
// Load first question
// Check answer for correct
// If correct, increase score
// Else decrease timer (there is a whole side thing here, a timer needs to exist to begin with)
// Repeat until out of questoins
// Hide quiz section 
// Reveal end section 
// Get user's initials
// Save user's initials and score to local storage

// What is required for each step above?
// Am I going to do this once or more than once?
//  If more than once, loop or create a function to call in several places
