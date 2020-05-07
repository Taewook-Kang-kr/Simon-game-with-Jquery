var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickPattern = [];
var level = 0;
var isGameStarted = false;

$(document).keypress(function() {
    if(!isGameStarted) {
        $("#level-title").text("Level" + level);
        nextSequence();
        isGameStarted = true;
    }
})

$(".btn").click(function() {
    var userChosenColour = $(this).attr("id");

    userClickPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickPattern.length-1);
});

function nextSequence() {

    userClickPattern = [];
    level++;

    $("#level-title").text("Level" + level);

    var randomNubmer = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNubmer];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");

    setTimeout(() => {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}

function checkAnswer(currentLevel) {
    if(gamePattern[currentLevel] === userClickPattern[currentLevel]) {

        console.log("success");

        if(userClickPattern.length === gamePattern.length) {
            setTimeout(() => {
               nextSequence(); 
            }, 1000);
        }
    } else {
        
        playSound("wrong");
        console.log("wrong");
        $("#body").addClass("game-over");

        setTimeout(() => {
            $("#body").removeClass("game-over");
        }, 200);

        $("h1").text("Game Over, Press Any Key to Restart");

        startOver();
    }
}

function startOver() {
    level = 0;
    gamePattern = [];
    isGameStarted = false;
}