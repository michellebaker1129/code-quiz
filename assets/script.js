const questionsObject = {
    // add property to keep track of currently shown question
    state: {
        score: 0,
        timer: 10,
        currentQuestion: 0,
        questions: [
            {
                question: "Which of the following is NOT a JavaScript keyword?",
                answers: ["var", "let", "const", "give"],
                correctAnswer: "give",
            },  {
                question: "Which is the highest heading element?",
                answers: ["h1", "h2", "h3", "h4"],
                correctAnswer: "h1",   
            }, {
                question: "Which is the lowest heading element?",
                answers: ["h1", "h2", "h3", "h4"],
                correctAnswer: "h4",
            }
        ],
        highScores: []
    },
    decrementTimer: function (delta) {
        this.state.timer -= delta
    },
    // create a method that counts down the timer using a setInterval call
    countDown: function () {
        const timerElement = document.querySelector('#timer');

        // setInterval that runs 1000ms
        this.interval = setInterval(
            // run a function every second
            () => {
                // update the page with current timer
                timerElement.innerHTML = this.state.timer;

                if (this.state.timer > 0) {
                    // decrement this.timer until 0
                    this.decrementTimer(1)
                } else {
                    // clear the interval
                    // if timer is 0 then end the round
                    this.state.timer = 10;
                    this.showNextQuestion()
                }
            },
            1000
        )
    },
    stopTimer: function () {
        clearInterval(this.interval)
    },
    // create a function that sends a notification to the user
    // type = "success" | "failure" | "info"
    sendNotification: function ({ message, type = "success" }) {
        // get #notification element and store in const
        const notificationElement = document.querySelector("#notification");

        // replace innerHTML of #notification with message prop
        const notificationMarkup = `
            <p class="${type}">${message}</p>
        `;
        notificationElement.innerHTML = notificationMarkup

        // use setTimeout to erase notification after some amount of time
        setTimeout(
            () => {
                notificationElement.innerHTML = ""
            },
            3000
        );
    },
    // create a method that shows/hides sections of the app
    // sectionId: "intro" | "quiz" | "results" | "end"
    changeAppPage: function (sectionId) {
        const appSections = document.querySelectorAll(".app-section")
        const sectionToShow = document.getElementById(sectionId)
        
        // Looping over the .app-section elements and hiding all of them
        appSections.forEach(
            (appSection) => {
                appSection.classList.add("hide")
            }
        )

        // Remove "hide" class from sectionToShow
        sectionToShow.classList.remove("hide")
    },
    // add method to show next question
    showNextQuestion: function () {
        // reset timer to 10
        this.state.timer = 10;

        // increase currentQuestion property
        this.state.currentQuestion += 1;

        // if there are no more questions, show score screen
        if (this.state.currentQuestion > this.state.questions.length - 1 ) {
            this.changeAppPage("results")

            // stop timer
            this.state.timer = 0;
            this.stopTimer();
        } else {
            // create variable and store the results of calling renderQuestion method
            const nextQuestion = this.renderQuestion(this.state.currentQuestion);

            // update dom with markup from renderQuestion method
            document.querySelector("#quiz").innerHTML = nextQuestion;
        }
    },
    answerQuestion: function (question, answerGiven) {
        // compare answerGiven to question.correctAnswer to see if they got the answer right or wrong
        const isCorrect = question.correctAnswer === answerGiven;
        
        if (!isCorrect) {
            // if they got it wrong, decrease time
            // decrement the timer by 2 seconds
            this.decrementTimer(2)

            // tell the user they got it wrong
            this.sendNotification({ message: "oops! wrong answer", type: "failure" })
        } else {
            // if they got it right, increase score
            // access timer and add it to score
            this.state.score += this.state.timer + 1

            // update the page with latest score
            const scoreElement = document.querySelector('#currentScore')
            scoreElement.innerText = this.state.score;
            const finalScoreElement = document.querySelector('#finalScore')
            finalScoreElement.innerText = this.state.score;

            // show next question if there are more questions
            this.showNextQuestion()
        }
    },
    renderQuestion: function (questionNumber) {
        return `<div class="question">
            <h2>${this.state.questions[questionNumber].question}</h2>
            <ul>
                <li>
                    <button
                        class="answer-btn"
                        data-question-index="${questionNumber}"
                        data-answer-index="0"
                    >
                        ${this.state.questions[questionNumber].answers[0]}
                    </button>
                </li>
                <li>
                    <button
                        class="answer-btn"
                        data-question-index="${questionNumber}"
                        data-answer-index="1"
                    >
                        ${this.state.questions[questionNumber].answers[1]}
                    </button>
                </li>
                <li>
                    <button
                        class="answer-btn"
                        data-question-index="${questionNumber}"
                        data-answer-index="2"
                    >
                        ${this.state.questions[questionNumber].answers[2]}
                    </button>
                </li>
                <li>
                    <button
                        class="answer-btn"
                        data-question-index="${questionNumber}"
                        data-answer-index="3"
                    >
                        ${this.state.questions[questionNumber].answers[3]}
                    </button>
                </li>
            </ul>
        </div>
        `;
    },

    // create a method to render high scores on page
    renderHighScores: function (highScoresArr) {
        // get #highScores table and save into const
        const highScoreTable = document.querySelector("#highScores")

        // loop over highScoresArr
        highScoresArr.forEach((highScore) => {
            // highScore = {
            //     initials: "TB",
            //     score: 18,
            // }

            // <tr>
            //     <th>Name</th>
            //     <th>Score</th>
            // </tr>

            // use a string template literal to produce markup for each high score
            const template = `
                <td>${
                    highScore.initials
                }</td>
                <td>${
                    highScore.score
                }</td>
            `;

            const tableRow = document.createElement('tr')
            tableRow.innerHTML = template;

            // use appendChild to add the template to the end of the #highScores table
            highScoreTable.appendChild(tableRow);
        });
    },

    // create a method to handle input of initials on the results/score screen
    handleSubmitScore: function () {
        // create a const and store the #initialsInput input into it
        const initialsInput = document.querySelector("#initialsInput")

        // create a const and store the #initialsSubmitBtn button into it
        const initialsSubmitBtn = document.querySelector("#initialsSubmitBtn")

        // add an event listener to the submit button which will update localStorage with the user's score
        initialsSubmitBtn.addEventListener("click", () => {
            // event listener should get the value from input
            const input = initialsInput.value;

            // read localStorage to see if any scores are currently saved
            const highScoresFromLocalStorage = JSON.parse(localStorage.getItem('highScores'))
            let highScoresArr = [];

            console.log('highScoresFromLocalStorage', highScoresFromLocalStorage)

            // update scores
            const newScore = {
                initials: input,
                score: this.state.score
            }
            highScoresArr.push(newScore);

            if (highScoresFromLocalStorage !== null) {
                highScoresArr = highScoresArr.concat(highScoresFromLocalStorage)
            }

            // sort the scores to show highest first
            highScoresArr.sort((firstItem, secondItem) => {
                return secondItem.score - firstItem.score
            })

            // and save into localStorage
            localStorage.setItem("highScores", JSON.stringify(highScoresArr))

            // render high scores on end page
            this.renderHighScores(highScoresArr)

            // change page to the "end" screen
            this.changeAppPage("end")
        })
    },

    // create a method to render the quiz and begin
    render: function () {
        // get button of #startQuiz and save into const
        const startQuizButton = document.querySelector("#startQuiz");

        // call renderQuestion(0) and save results into a const
        const firstQuestion = this.renderQuestion(0);

        // get #quiz element and save into const
        const quizElement = document.querySelector("#quiz")

        const startOverQuizBtn = document.querySelector('#startOverQuiz');
        startOverQuizBtn.addEventListener('click', () => {
            location.reload();
        })

        // quiz element innerHTML = renderquestion const
        quizElement.innerHTML = firstQuestion;

        // add event listener to startQuizButton
        startQuizButton.addEventListener("click", () => {
            // event listener will call this.changeAppPage("quiz")
            this.changeAppPage("quiz");
            // start this.countDown()
            this.countDown()
        });

        // add event listener to quizElement
        quizElement.addEventListener('click', (event) => {
            if (event.target.classList.contains('answer-btn')) {
                const questionIndex = event.target.dataset.questionIndex;
                const answerIndex = event.target.dataset.answerIndex;

                this.answerQuestion(
                    this.state.questions[questionIndex], 
                    this.state.questions[questionIndex].answers[answerIndex]
                )
            }
        })

        this.handleSubmitScore()
    }
}

// Render the quiz
document.addEventListener('DOMContentLoaded', function() {
    questionsObject.render()
});


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
