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
    if(list === ""){
        scores = [];
    } else {
        // list is a string - splice it into an array
        scores = list.split(',');
    }
    console.log(scores);
    return;
}

// check if answer is correct or not
function checkAnswer(id) {
    // display the hr
    hr.style.display = 'block';
    // check for correct answer
    if(id == correctAnswersId[questionsIndex]) {
        comeback.innerHTML = "Correct!";
        userPoints += 5;
    } else {
        comeback.innerHTML = "Wrong";
    }
    // access the next question
    questionsIndex++;
    // have a short pause before calling displayQuestion();
    pause();
}

// display the questions and possible answers
function displayQuestion() {
    // clear any previous answers
    removeLi();
    // hide the h1 and p tags
    h1.style.display = 'none';
    p.style.display = 'none'
    // hide start button
    startBtn.style.display ="none";
    // put the question into the p tag
    h2.innerHTML = questions[questionsIndex];
    // loop to create list of answers for each question, go to allDone() when all questions are answered
    for(var i = 0; i < 4; i++) {
        // console.log("i: " + i + "  questionsIndex: " + questionsIndex);
        if(questionsIndex === answers.length){
            console.log("go to allDone()");
            removeLi();
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
    // insert message for this page
    h2.innerHTML = "All done!";
    // show score
    comeback.innerHTML = "Your final score is:  " + userPoints;
    // display input box for initials
    input.style.display = 'block';
}

// show high scores
function highScores() {
    // remove li tags
    removeLi();
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
    // TODO:  find highest score and display initials and score
    // highestScore();
    console.log(index);
    //  show buttons
    scoreButtons.style.display = 'inline-block';
}

// sort through array of scores and find the highest value
function highestScore() {
    console.log("scores  " + scores[1]);
    var best = 0;
    for(var i = 1; i < scores.length; i += 2) {
        var current = scores[i];
        console.log("current  " + current); 
        if(current > best){
             best = current;
             index = i;
        }
    }
    console.log(index);
    // return index;
}

// reset question counter and points, prepare display, go back to first question
function reset() {
    // reset points
    userPoints = 0;
    // go back to the first question
    questionsIndex = 0;
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
    var pause = setTimeout('displayQuestion()', 500);
}

// EVENT LISTENERS

submitBtn.addEventListener("click", function (){
    event.preventDefault();
    // capture initials
    var initials = document.querySelector(".box").value;
    console.log("initials:  " + initials + "  points " + userPoints);
    // push the pair to the array
    scores.push(initials, userPoints);
    highestScore();
    console.log(scores);
    // set local storage
    // TODO: check if entry is valid
    // if(todos[todos.length - 1] === ""){
    //     todos.pop();
    //     alert("Please enter a new task");
    // }

    // update local storage
    localStorage.setItem("Scores", scores);
    // // clear the text in the input box
    // document.getElementById('todo-form').reset();
    // // clear the list
    // while(todoList.firstChild) {
    //     todoList.removeChild(todoList.firstChild);
    // }
    highScores();
    
})