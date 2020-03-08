// declare variables for existing HTML elements
var ol = document.querySelector('ol');
var h1 = document.querySelector("h1");
var p = document.querySelector('p');
var button = document.querySelector('button');

// set up array with potential answers to each question
var answers1 = ['strings', 'booleans', 'alerts', 'numbers'];
var answers2 = ['commas', 'curly brackets', 'parentheses', 'square brackets'];
var answers3 = ['numbers and strings', 'other arrays', 'booleans', 'all of the above'];
var answers4 = ['Javascript', 'terminal/bash', 'for loops', 'console.log'];

function firstQuestion() {
    // hide button
    button.style.display ="none";
    // replace h1
    h1.innerHTML = "First Question";
    // replace text;
    p.innerHTML = "Commonly used data types DO NOT include:";
    for(var i = 0; i < 4; i++) {
        // create list items for answers
        var li = document.createElement("li");
        li.setAttribute("id", i);
        li.setAttribute("onClick", 'checkAnswer(this.id)');
        li.innerHTML = answers1[i];
        ol.append(li);
        console.log(i);
    }
}    
 
function checkAnswer(id) {
        console.log("in checkAnswer  id = " + id);
}


    
    
    
    
