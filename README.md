# code-quiz

AS A coding boot camp student
I WANT to take a timed quiz on JavaScript fundamentals that stores high scores
SO THAT I can gauge my progress compared to my peers

GIVEN I am taking a code quiz
WHEN I click the start button
THEN a timer starts and I am presented with a question
WHEN I answer a question
THEN I am presented with another question
WHEN I answer a question incorrectly
THEN time is subtracted from the clock
WHEN all questions are answered or the timer reaches 0
THEN the game is over
WHEN the game is over
THEN I can save my initials and score

## Todo

- Create a object to handle high scores
  - Read from localStorage on page load to see if any existing scores
  - update localStorage with current user score
  - Prompt the user to enter initials and store into localStorage
- Create a object that updates the DOM with which stage of the quiz we're on (intro, quiz, end)
- Create a object that handles quiz questions
  - Replace the prev question markup with current question markup
  - Handle answers with correct or incorrect/notify the user
  - Handle updating score
  - Handle timer
  - Build out the markup for individual questions

string literal (vs template literal) 
string interpolation
TODO 
