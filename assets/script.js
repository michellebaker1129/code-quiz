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
    },
    decrementTimer: function (delta) {
        this.state.timer -= delta
    },
    // create a method that counts down the timer using a setInterval call
    countDown: function () {
        // setInterval that runs 1000ms
        const interval = setInterval(
            // run a function every second
            () => {
                console.log(this.state.timer)
                if (this.state.timer > 0) {
                    // decrement this.timer until 0
                    this.decrementTimer(1)
                } else {
                    // clear the interval
                    // TODO if timer is 0 then end the round
                    return clearInterval(interval)
                }
            },
            1000
        )
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
    // add method to show next question
    showNextQuestion: function () {
        // reset timer to 10
        this.state.timer = 10;

        // increase currentQuestion property
        this.state.currentQuestion += 1;

        // TODO if there are no more questions, show end screen
        if (this.state.currentQuestion > this.state.questions.length - 1 ) {
            
        }

        // create variable and store the results of calling renderQuestion method
        const nextQuestion = this.renderQuestion(this.state.currentQuestion);

        // update dom with markup from renderQuestion method
        document.querySelector("#quiz").innerHTML = nextQuestion;
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
            this.state.score += this.state.timer

            // TODO: show next question if there are more questions
            this.showNextQuestion() 
        }
    },
    renderQuestion: function (questionNumber) {
        return `<div class="question">
            <h2>${this.state.questions[questionNumber].question}</h2>
            <ul>
                <li>
                    <button onclick="${() => this.answerQuestion(
                        this.state.questions[questionNumber], 
                        this.state.questions[questionNumber].answers[0]
                    )}">
                        ${this.state.questions[questionNumber].answers[0]}
                    </button>
                </li>
                <li>
                    <button onclick="${() => this.answerQuestion(
                        this.state.questions[questionNumber], 
                        this.state.questions[questionNumber].answers[1]
                    )}">
                        ${this.state.questions[questionNumber].answers[1]}
                    </button>
                </li>
                <li>
                    <button onclick="${() => this.answerQuestion(
                        this.state.questions[questionNumber], 
                        this.state.questions[questionNumber].answers[2]
                    )}">
                        ${this.state.questions[questionNumber].answers[2]}
                    </button>
                </li>
                <li>
                    <button onclick="${() => this.answerQuestion(
                        this.state.questions[questionNumber], 
                        this.state.questions[questionNumber].answers[3]
                    )}">
                        ${this.state.questions[questionNumber].answers[3]}
                    </button>
                </li>
            </ul>
        </div>
        `;
    }
}




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
