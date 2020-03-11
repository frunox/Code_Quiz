_Submitted by John Cannon (March 10, 2020)_

# 04 Web APIs: Code Quiz

This project creates a coding assessment, a combination of multiple-choice questions and interactive challenges. It includes a timed code quiz with multiple-choice questions. This app will run in the browser and feature dynamically updated HTML and CSS powered by JavaScript code. It will also feature a clean and polished user interface and be responsive, ensuring that it adapts to multiple screen sizes.

## User Story

```
AS A coding bootcamp student
I WANT to take a timed quiz on JavaScript fundamentals that stores high scores
SO THAT I can gauge my progress compared to my peers
```

## Acceptance Criteria

```
GIVEN I am taking a code quiz:

WHEN I click the start button, THEN a timer starts and I am presented with a question

WHEN I answer a question, THEN I am presented with another question

WHEN I answer a question incorrectly, THEN time is subtracted from the clock

WHEN all questions are answered or the timer reaches 0, THEN the game is over

WHEN the game is over, THEN I can save my initials and score
```



### Notes
* The acceptance criteria were met.
* However, I wasn't able to properly display the current high score, nor could I get a header over the list of previous scores for the player.
* This means my DOM manipulation skills are still weak.
* The high score is undefined when I hit the 'View High Scores' button before all the questions are answered.  I don't understand why since the button calls the function that determines the high score.
* I added a pause after answering each question so the player can see if the selected answer is correct or not.
 