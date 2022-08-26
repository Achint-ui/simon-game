var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];


var level = 0;

if(level===0){
  $(document).keypress(function(event){
    start = true;
    level = level + 1;
    nextSequence(level);
  });

  
}



function nextSequence(level){
  
  $("h1").text("Level " + level);
  
  var random = Math.floor(Math.random()*4);
  console.log(random);

  var randomChosenColour = buttonColours[random];
gamePattern.push(randomChosenColour);

$("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

  var audio = new Audio("sounds/" + randomChosenColour + ".mp3");
  audio.play();
}


  


  //detecting button click from user
  $(".btn").on("click", function(){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
  }) ; 

//check answer
function checkAnswer(currentLevel){
  
   if(userClickedPattern[currentLevel]===gamePattern[currentLevel]){
     
     if(userClickedPattern.length===gamePattern.length){
        setTimeout(function(){
          userClickedPattern = [];
          level = level + 1;
          nextSequence(level);
        }, 1000);
     }
   } else {
      $("h1").text("Oops!! Press Any Key To Try Again");
      $("body").addClass("game-over");
      setTimeout(function(){
        $("body").removeClass("game-over");
      }, 200);
      startOver();
   }
}

//restart game
function startOver(){
        level = 0;
        gamePattern = [];
        userClickedPattern = [];
}

//playing sound
function playSound(name){
      var audio = new Audio("sounds/" + name + ".mp3");
      audio.play();
}

//animation for button clicks
function animatePress(currentColour){
    $("#" + currentColour).addClass("pressed");
    setTimeout(function(){
      $("#" + currentColour).removeClass("pressed");
    })
}