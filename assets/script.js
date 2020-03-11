// CALCULATED HIGHEST SCORE - STILL NEED TO DISPLAY
// declare variables for existing HTML elements
var ol = document.querySelector('ol');
var li = document.querySelector('li');
var h1 = document.querySelector("h1");
var p = document.querySelector('p');
var startBtn = document.querySelector('#start');
var hr = document.querySelector('hr');
var h2 = document.querySelector('h2');
var startMessage = document.querySelector('.startMessage');
var comeback = document.querySelector('#comeBack');
var scoreButtons = document.querySelector('.scores');
var form = document.querySelector('.form');
var submitBtn = document.querySelector('.submit');

// var label = document.querySelector('label');
var input = document.querySelector('.done');
// var boxName = document.getElementById('boxName');
var item = document.getElementsByClassName('listItem');
var questionsIndex = 0;
var answersIndex = 0;
var userPoints = 0;
var id;
var scores = [];
var index;
var currentPlayerIndex = [];
    // start and stop values for the timer
var clock = 55;

// read in scores from local storage and initialize array scores
createArray();

// set up arrays with the questions and potential answers to each question
var questions = ['Commonly used data types DO NOT include:', 'The condition in an if/else statement is enclosed within ________.', 'Arrays in JavaScript can be used to store ________.', 'String values must be enclosed within _______ when being assigned to variables.', 'A very useful too used during development and debugging for printing content to the debugger is:']
var answers = [
    ['strings', 'booleans', 'alerts', 'numbers'],
    ['commas', 'curly brackets', 'parentheses', 'square brackets'],
    ['numbers and strings', 'other arrays', 'booleans', 'all of the above'],
    ['commas', 'curly brackets', 'quotes', 'parentheses'],
    ['Javascript', 'terminal/bash', 'for loops', 'console.log']
    ];
var correctAnswersId = [2, 2, 3, 2, 3]

// FUNCTIONS
// read local storage to string element, convert to array
function createArray() {
    var list = localStorage.getItem('Scores');
    // if local storage is empty, it returns an empty string, so reset array to empty.
    if(list === null){
        scores = [];
    } else {
        // list is a string - splice it into an array
        scores = list.split(',');
    }
    return;
}

// start the timer
function startTimer() {
    // initiate timer    
    var countDown = setInterval(function() {
        // if all questions are answered with time remaining, stop the timer
        if(clock === -1) {
            document.getElementById('timer').innerHTML = "Timer";
            clearInterval(countDown);
            return;
        }
        if(clock > 0) {
            clock += -1;
            document.getElementById('timer').innerHTML = "Time Remaining:  " + clock;
        } else {
            // stop clock
            clearInterval(countDown);
            gameOver();
        }
    }, 1000);
   
}
    
// stop the game if the timer runs out    
function gameOver() {
    document.querySelector('.header').style.display = "none";
    hr.style.display = 'none';
    comeback.style.display = 'none';
    removeLi();
    h1.style.display = "block";
    h1.innerHTML = "Game Over!  The timer ran out."
    h2.innerHTML = "Please try again later after you've had some coffee."
}


// check if answer is correct or not
function checkAnswer(id) {
    // display the hr
    hr.style.display = 'block';
    comeback.style.display = 'block';
    // check for correct answer
    if(id == correctAnswersId[questionsIndex]) {
        comeback.innerHTML = "Correct!";
        userPoints += 10;
    } else {
        comeback.innerHTML = "Wrong";
        userPoints += -2;
        clock += -5;
    }
    // access the next question
    questionsIndex++;
    // have a short pause before calling displayQuestion();
    pause();
}

// display the questions and possible answers
function displayQuestion() {
    // start the timer
    startTimer();
    // clear any previous answers
    removeLi();
    // hide the h1 and p tags, start button
    h1.style.display = 'none';
    p.style.display = 'none'
    startBtn.style.display ="none";
    // hide the hr and comeback
    hr.style.display = 'none';
    comeback.style.display = 'none';
    // put the question into the h2 tag
    h2.innerHTML = questions[questionsIndex];
    // loop to create list of answers for each question, go to allDone() when all questions are answered
    for(var i = 0; i < 4; i++) {
        // console.log("i: " + i + "  questionsIndex: " + questionsIndex);
        if(questionsIndex === answers.length){
            removeLi();
            clock = -1;
            document.getElementById('timer').innerHTML = "Timer";
            allDone();
        } else {
            // create list items for answers
            var li = document.createElement("li");
            li.setAttribute("id", i);
            li.setAttribute("class", "listItem");
            li.setAttribute("onClick", 'checkAnswer(this.id)');
            li.innerHTML = answers[questionsIndex][i];
            ol.append(li);
        }
    }
}    

// show final score and enter initials to save score
function allDone() {
    // remove unnecessary tags
    p.style.display = 'none';
    hr.style.display = 'none';
    form.style.display = 'block';
    comeback.style.display = 'block';
    // insert message for this page
    h2.innerHTML = "All done!";
    // show score
    comeback.innerHTML = "Your final score is:  " + userPoints;
    // display input box for initials
    input.style.display = 'block';
}

// find all scores for the player and show them
function findPlayerScores() {
    currentPlayerIndex = [];
    var player = scores[scores.length - 2];
    console.log("player:  " + player);
    for(var i = 0; i < scores.length; i += 2) {
        var previousPlayer = scores[i];
        if(player === previousPlayer){
             currentPlayerIndex.push(i);
        }
    }
    console.log("CPIndex: " + currentPlayerIndex);
    return currentPlayerIndex;
}

// show high scores
function highScores() {
    // stop the timer
    clock = -1;
    // remove li tags
    removeLi();
    p.style.display = 'block';
    p.innerHTML = "something";
    // if(currentPlayerIndex.length > 0) {
        console.log("highest score index:  " + index);
        var highScore = document.createElement('h2');
        highScore.setAttribute("class", "highScore");
        highScore.innerHTML = "The Current High Score Is: " + scores[index];
        document.querySelector('body').appendChild(highScore);
    // }
    // render a heading for your 'Previous Scores'
    // if(currentPlayerIndex.length > 0) {
    //     h2.style.display = 'block';
    //     h2.innerHTML = "Your Previous Scores";
    // }
    
    // render previous scores for current player
    h2.style.display = 'block';
    h2.innerHTML = "Previous Scores for " + scores[currentPlayerIndex[0]];
    for(var i = 0; i < currentPlayerIndex.length - 1; i++) {
        var inits = scores[currentPlayerIndex[i]];
        var prevScore = scores[currentPlayerIndex[i] + 1];
        var li = document.createElement("li");
        li.setAttribute("class", "previousScores");
        li.innerHTML = "Player:  " + inits + "   " + "Previous Score:  " + prevScore;
        ol.append(li);
    }
    // remove unnecessary tags
    h2.style.display = 'none';
    hr.style.display = 'none';
    comeback.style.display = 'none';
    p.style.display = 'none';
    startBtn.style.display = 'none'
    form.style.display = 'none'
    // show title for this page
    h1.style.display = 'block';
    h1.innerHTML = "High Scores";
    // TODO:  display initials and score
    highestScore();
    
    //  show buttons
    scoreButtons.style.display = 'inline-block';
}

// sort through array of scores and find the highest value
function highestScore() {
    var best = 0;
    for(var i = 1; i < scores.length; i += 2) {
        var current = scores[i];
        if(current > best){
             best = current;
             index = i;
        }
    }
    // console.log(index);
    return index;
}

// reset question counter and points, prepare display, go back to first question
function reset() {
    // reset points
    userPoints = 0;
    // go back to the first question
    questionsIndex = 0;
    // reset timer
    clock = 55;
    // display the h2 element to show the question
    h2.style.display = "block";
    // don't show the buttons
    scoreButtons.style.display = 'none';
    form.style.display = 'none';
    // go back to first question
    displayQuestion();
}

function clearScores() {
    console.log("in clearScores()");
    localStorage.clear();
    return;
}

// remove the li tags that show the answers for the previous(or last) question
function removeLi() {
    while(ol.firstChild) {
        ol.removeChild(ol.firstChild);
    }
    return;
}

function pause() {
    scoreButtons.style.display = 'none';
    h2.style.display = 'block';
    comeback.style.display = 'block';
    var pause = setTimeout('displayQuestion()', 750);
}

// EVENT LISTENERS

submitBtn.addEventListener("click", function (){
    event.preventDefault();
    // capture initials
    var initials = document.querySelector(".box").value;
    // push the pair to the array
    scores.push(initials, userPoints);
    // find any previous scores for current player
    findPlayerScores();
    // show highest score and previous scores for current player
    highestScore();
    // add to local storage
    localStorage.setItem("Scores", scores);
   
    highScores();
});