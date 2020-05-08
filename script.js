var correct = false;
var quizzing = false;
var score = 0;
var timeLeft = 0;
var questionIndex;
var quizInterval;
var answerInterval;
var initials;
var questionQueue = ["Commonly used data types do NOT include:", 
"The condition in an if/else statement is embedded within __________.", 
"Arrays in JavaScript can be used to store __________.", 
"String values must be enclosed within ________ when being assigned to variables.", 
"A very useful tool used during development and debugging for printing content to the debugger is:"];

function showAnswer(choice) {
    timeLeft = 1;

    if ( (questionIndex === 0 && choice === 3)
    || (questionIndex === 1 && choice === 2)
    || (questionIndex === 2 && choice === 4)
    || (questionIndex === 3 && choice === 3)
    || (questionIndex === 4 && choice === 4) )
    {
        correct = true;
    }
    else
        score -= 10;

    // Only set the timeLeft if it's undefined
    if (answerInterval === undefined)
    {
        //Define the interval, then immediately call it
        answerInterval = setInterval(showOrHide, 1000);
        showOrHide();
    }

    correct = false;
    nextQuestion();
}

function showOrHide() {
    var answerEl = document.getElementById("answer");

    if (timeLeft === 1)
    {
        if (correct)
            answerEl.innerHTML = "<hr>" + "Correct!";
        else
            answerEl.innerHTML = "<hr>" + "Wrong!";
    }

    if (timeLeft === 0) 
    {
        answerEl.innerHTML = "";
        clearInterval(answerInterval);
        answerInterval = undefined;
    }
    else
        timeLeft--;
}

function startQuiz() {

    if (quizInterval === undefined)
    {
        // Make this "76" because it immediately drops by 1 jumping into the interval function.
        score = 76;
        quizzing = true;

        quizInterval = setInterval(function() {
            score--;
            document.getElementById("score").textContent = "Time: " + score;

            if (score === 0) 
            {
                clearInterval(quizInterval);
                showResults();    
            }
    
        }, 1000);
    }

    nextQuestion();
}

function nextQuestion() {

    var btnGroupEl = document.getElementById("btnGroup");

    if (questionIndex === undefined)
    {
        
        var buttonEl = document.getElementById("button");

        //Clear everything out and start from nothing
        questionIndex = 0;
        document.getElementById("intro").textContent = "";
        document.getElementById("answer").textContent = "";
        btnGroupEl.removeChild(buttonEl);

        // Create 4 new option buttons
        var option1El = document.createElement("button");
        option1El.setAttribute("type", "button");
        option1El.setAttribute("class", "btn btn-primary btn-sm");
        option1El.setAttribute("id", "option1");
        option1El.addEventListener("click", () => showAnswer(1));
        btnGroupEl.appendChild(option1El);
        var option2El = document.createElement("button");
        option2El.setAttribute("type", "button");
        option2El.setAttribute("class", "btn btn-primary btn-sm");
        option2El.setAttribute("id", "option2");
        option2El.addEventListener("click", () => showAnswer(2));
        btnGroupEl.appendChild(option2El);
        var option3El = document.createElement("button");
        option3El.setAttribute("type", "button");
        option3El.setAttribute("class", "btn btn-primary btn-sm");
        option3El.setAttribute("id", "option3");
        option3El.addEventListener("click", () => showAnswer(3));
        btnGroupEl.appendChild(option3El);
        var option4El = document.createElement("button");
        option4El.setAttribute("type", "button");
        option4El.setAttribute("class", "btn btn-primary btn-sm");
        option4El.setAttribute("id", "option4");
        option4El.addEventListener("click", () => showAnswer(4));
        btnGroupEl.appendChild(option4El);
    }
    else
        questionIndex++;

    if (questionQueue[questionIndex] === undefined)
    {
        showResults();
        return;
    }

    // Setup the new question
    document.getElementById("question").textContent = questionQueue[questionIndex];

    // Setup the new options
    if (questionIndex === 0)
    {
        document.getElementById("option1").textContent = "1. strings";
        document.getElementById("option2").textContent = "2. booleans";
        document.getElementById("option3").textContent = "3. alerts";
        document.getElementById("option4").textContent = "4. numbers";
    }

    if (questionIndex === 1)
    {
        document.getElementById("option1").textContent = "1. quotes";
        document.getElementById("option2").textContent = "2. curly brackets";
        document.getElementById("option3").textContent = "3. parentheses";
        document.getElementById("option4").textContent = "4. square brackets";
    }

    if (questionIndex === 2)
    {
        document.getElementById("option1").textContent = "1. numbers and strings";
        document.getElementById("option2").textContent = "2. other arrays";
        document.getElementById("option3").textContent = "3. booleans";
        document.getElementById("option4").textContent = "4. all of the above";
    }

    if (questionIndex === 3)
    {
        document.getElementById("option1").textContent = "1. commas";
        document.getElementById("option2").textContent = "2. curly brackets";
        document.getElementById("option3").textContent = "3. quotes";
        document.getElementById("option4").textContent = "4. parentheses";
    }
    if (questionIndex === 4)
    {
        document.getElementById("option1").textContent = "1. JavaScript";
        document.getElementById("option2").textContent = "2. terminal / bash";
        document.getElementById("option3").textContent = "3. for loops";
        document.getElementById("option4").textContent = "4. console.log";
    }
}

function showResults() {
    var btnGroupEl = document.getElementById("btnGroup");
    var option1El = document.getElementById("option1");
    var option2El = document.getElementById("option2");
    var option3El = document.getElementById("option3");
    var option4El = document.getElementById("option4");            

    clearInterval(quizInterval);
    document.getElementById("question").textContent = "All done!";
    document.getElementById("intro").textContent = "Your final score: " + score;

    //Remove the 4 option buttons
    btnGroupEl.removeChild(option1El);
    btnGroupEl.removeChild(option2El);
    btnGroupEl.removeChild(option3El);
    btnGroupEl.removeChild(option4El);

    var labelEl = document.createElement("label");
    labelEl.setAttribute("for", "initials");
    labelEl.setAttribute("id", "label");
    labelEl.textContent = "Enter initials: "; 
    btnGroupEl.appendChild(labelEl);

    var inputEl = document.createElement("input");
    inputEl.setAttribute("type", "text");
    inputEl.setAttribute("id", "initials");
    labelEl.appendChild(inputEl);

    var submitScoreEl = document.createElement("button");
    submitScoreEl.setAttribute("type", "button");
    submitScoreEl.setAttribute("class", "btn btn-primary btn-sm");
    submitScoreEl.setAttribute("id", "button");
    submitScoreEl.textContent = "Submit score";
    submitScoreEl.addEventListener("click", () => submitResults(inputEl.value));
    btnGroupEl.appendChild(submitScoreEl);
}

function submitResults(init) {
    // Done quizzing
    quizzing = false;
    initials = init;
    localStorage.setItem(initials, score);

    //Remove the input label
    var btnGroupEl = document.getElementById("btnGroup");
    var labelEl = document.getElementById("label");
    var inputEl = document.getElementById("initials");
    var submitScoreEl = document.getElementById("button");
    labelEl.removeChild(inputEl);
    btnGroupEl.removeChild(labelEl);
    btnGroupEl.removeChild(submitScoreEl);

    showScore();
}

function showScore() {
    // Prevent users from leaving the quiz if they are currently testing
    if (quizzing)
    {
        document.getElementById("answer").innerHTML = "<hr>Finish your quiz first!";
        return;
    }

    document.getElementById("question").textContent = "High Scores";
    
    if (localStorage.getItem(initials) != null)
        document.getElementById("intro").textContent = initials + " - " + localStorage.getItem(initials);

    // Create two buttons: 1 to go back to the intro, and one to clear high scores
    var btnGroupEl = document.getElementById("btnGroup");

    var backButtonEl = document.createElement("button");
    backButtonEl.setAttribute("type", "button");
    backButtonEl.setAttribute("class", "btn btn-primary btn-sm");
    backButtonEl.setAttribute("id", "back");
    backButtonEl.textContent = "Start Over";
    backButtonEl.addEventListener("click", () => showIntro(true));
    btnGroupEl.appendChild(backButtonEl);

    var clearScoresEl = document.createElement("button");
    clearScoresEl.setAttribute("type", "button");
    clearScoresEl.setAttribute("class", "btn btn-primary btn-sm");
    clearScoresEl.setAttribute("id", "clear");
    clearScoresEl.textContent = "Clear Scores";
    clearScoresEl.addEventListener("click", () => clearScores());
    btnGroupEl.appendChild(clearScoresEl);

}

function clearScores() {
    localStorage.clear();
    document.getElementById("intro").textContent = "";
}

function showIntro(restart) {

    document.getElementById("question").textContent = "Coding Quiz Challenge";
    document.getElementById("intro").textContent = "Try to answer the following code-related questions within the time limit. Keep in mind that incorrect answers will penalize your score/time by 10 seconds!";

    if (restart)
    {
        var btnGroupEl = document.getElementById("btnGroup");
        var backButtonEl = document.getElementById("back");
        var clearScoresEl = document.getElementById("clear");

        btnGroupEl.removeChild(clearScoresEl);
        btnGroupEl.removeChild(backButtonEl);
    }
    
    // Create the start quiz button
    var btnGroupEl = document.getElementById("btnGroup");
    var startQuizEl = document.createElement("button");
    startQuizEl.setAttribute("type", "button");
    startQuizEl.setAttribute("class", "btn btn-primary btn-sm");
    startQuizEl.setAttribute("id", "button");
    btnGroupEl.appendChild(startQuizEl);
    document.getElementById("button").textContent = "Start Quiz"; 

}

// First, show intro.
showIntro(false);

// Button clicked to begin quiz. Start the timeLeft and get the next question.
document.getElementById("button").addEventListener("click", startQuiz);

document.getElementById("highscores").addEventListener("click", showScore);