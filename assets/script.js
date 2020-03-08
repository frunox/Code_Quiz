// declare variables for existing HTML elements
var ol = document.querySelector('ol');
var li = document.querySelector('li');
var h1 = document.querySelector("h1");
var p = document.querySelector('p');
var button = document.querySelector('button');
var hr = document.querySelector('hr');
var h2 = document.querySelector('h2');
var comeback = document.querySelector('#comeBack');
var questionsIndex = 0;
var answersIndex = 0;
var userPoints = 0;


// set up arrays with the questions and potential answers to each question
var questions = ['Commonly used data types DO NOT include:', 'The condition in an if/else statement is enclosed within ________.', 'Arrays in JavaScript can be used to store ________.', 'String values must be enclosed within _______ when being assigned to variables.', 'A very useful too used during development and debugging for printing content to the debugger is:']
var answers = ['strings', 'booleans', 'alerts', 'numbers', 'commas', 'curly brackets', 'parentheses', 'square brackets', 'numbers and strings', 'other arrays', 'booleans', 'all of the above', 'commas', 'curly brackets', 'quotes', 'parentheses','Javascript', 'terminal/bash', 'for loops', 'console.log'];
var correctAnswersId = [2, 2, 3, 2, 3]

function displayQuestion() {
    // clear any previous answers
    while(ol.firstChild) {
        ol.removeChild(ol.firstChild);
    }
    // hide the h1
    h1.style.display = 'none';
    // hide button
    button.style.display ="none";
    // replace text with a question;
    p.innerHTML = questions[questionsIndex];
    for(var i = 0; i < 4; i++) {
        // create list items for answers
        var li = document.createElement("li");
        li.setAttribute("id", i);
        li.setAttribute("onClick", 'checkAnswer(this.id)');
        li.innerHTML = answers[i + answersIndex];
        ol.append(li);
        // console.log("i+answersIndex:  " + (i + answersIndex));
        // console.log('answersIndex: ' + answersIndex);
    }
}    
    
 
function checkAnswer(id) {
    console.log("in checkAnswer  id = " + id);
    // display the hr
    hr.style.display = 'block';
    // check for correct answer
    console.log('qIndex: ' + questionsIndex + '  answer index: ' + correctAnswersId[answersIndex]);
    if(id == correctAnswersId[questionsIndex]) {
        comeback.innerHTML = "Correct!";
        userPoints += 5;
    } else {
        comeback.innerHTML = "Wrong";
        // take 10 seconds off the timer
    }
    questionsIndex++;
    answersIndex += 4;
    if(answersIndex >= answers.length) {
        console.log('go to allDone()');
        // clear answers list
        while(ol.firstChild) {
            ol.removeChild(ol.firstChild); 
            console.log('in remove li loop');
        }
        allDone();
    }
    displayQuestion();
}

function allDone() {
    
    // hide the <p>
    p.style.display = 'none';
    hr.style.display = 'none';
    comeback.innerHTML = '';
    // add text to the h2
    h2.innerHTML = "All done!";
    console.log('in allDone()');
    
}