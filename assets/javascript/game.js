$("#blink, #blink2").blink();
var wins = 0;
var losses = 0;
var potentialWords = [
  "aphex twin",
  "arvo part",
  "bassekou kouyate",
  "curtis mayfield",
  "destoyer",
  "hans zimmer",
  "harry nilsson",
  "johann sebastian bach",
  "kronos quartet",
  "kurt vile",
  "midlake",
  "nils frahm",
  "philip glass",
  "pink floyd",
  "spoon",
  "sufjan stevens",
  "the beatles",
  "the doors",
  "timber timbre",
  "townes van zandt",
  "uncle acid and the deadbeats"
];
var imageLinks = [
  "assets/images/aphextwin.jpg",
  "assets/images/arvo.jpg",
  "assets/images/bassekou.jpg",
  "assets/images/curtismayfield.jpg",
  "assets/images/destroyer.jpg",
  "assets/images/HansZimmer.jpg",
  "assets/images/harrynilsson.jpg",
  "assets/images/johannbach.jpg",
  "assets/images/KronosQuartet.jpg",
  "assets/images/kurtvile.jpg",
  "assets/images/midlake.jpg",
  "assets/images/nilsfrahm.jpg",
  "assets/images/philglass.jpg",
  "assets/images/pinkfloyd.jpg",
  "assets/images/spoon.jpg",
  "assets/images/sufjan.jpg",
  "assets/images/thebeatles.jpg",
  "assets/images/thedoors.jpg",
  "assets/images/timber.jpg",
  "assets/images/townesvanzandt.jpg",
  "assets/images/uncleacid.jpg"
];
var backgroundGifs = [
  "assets/gifs/1.gif",
  "assets/gifs/2.gif",
  "assets/gifs/3.gif",
  "assets/gifs/4.gif",
  "assets/gifs/5.gif"
];
var songs = [
  "assets/music/AphexTwin.mp3",
  "assets/music/ArvoPart.mp3",
  "assets/music/BassekouKouyate.mp3",
  "assets/music/CurtisMayfield.mp3",
  "assets/music/Destroyer.mp3",
  "assets/music/HanzZimmer.mp3",
  "assets/music/HarryNilsson.mp3",
  "assets/music/johannsebastianbach.mp3",
  "assets/music/kronosquartetlachrymaeantiquae.mp3",
  "assets/music/KurtVile.mp3",
  "assets/music/midlakechildrenofthegrounds.mp3",
  "assets/music/NilsFrahm.mp3",
  "assets/music/PhilipGlass.mp3",
  "assets/music/PinkFloyd.mp3",
  "assets/music/spoon.mp3",
  "assets/music/SufjanStevens.mp3",
  "assets/music/TheBeatles.mp3",
  "assets/music/theDoors.mp3",
  "assets/music/TimberTimbre.mp3",
  "assets/music/TownesVanZandt.mp3",
  "assets/music/uncleacid.mp3"
];

$(document).on("click", ".blinkcontainer", () => {
  $(".blinkcontainer").remove();
  $("#guessBanner").html("");
  $("#lettersG").html("");
  $("#lettersR").html("");
  $("#guessedLetters").html("");
  var remainingGuesses = 8;
  var lettersGuessed = [];
  var answerArray = [];
  var computerWord = potentialWords[Math.floor(Math.random() * potentialWords.length)];
  var lettersRemaining = computerWord.length - (computerWord.split(" ").length - 1); //will subtract any spaces from lettersRemaining
  var c = potentialWords.indexOf(computerWord); //index referencing index of computerWord to be used for selecting matched photos/songs from arrays
  var imageIndex = imageLinks[c]; //variable for loadPicture() pull from image array with same index as computerWord
  var loadSongs = songs[c]; //variable for loadSong() to pull from songs array with same index as computerWord

  function loadPicture() {
    //function to load image URLs from imageLinks array when game ends
    $("#bgImage").css({ "background-image": "url(" + imageIndex + ")" });
  }

  function loadSong() {
    var audioElement = document.createElement("audio");
    audioElement.setAttribute("id", "music");
    audioElement.setAttribute("src", loadSongs);
    document.body.appendChild(audioElement);
    audioElement.play();
  }

  function loadGif() {
    //randomly selects background image from array when game is initialized
    var backgroundImage = backgroundGifs[Math.floor(Math.random() * backgroundGifs.length)];
    $("#bgImage").css({ "background-image": "url(" + backgroundImage + ")" });
  }

  function endGame() {
    $("#guessBanner").html("");
    $("#lettersG").html("");
    $("#lettersR").html("");
    $("#guessedLetters").html("");
    $("<div>")
      .attr("class", "blinkcontainer")
      .html("<p id='blink'>Click<a class='keys'> Here </a> To Begin</p>")
      .prependTo("#game");
    $("#blink").blink();
  }

  var html =
    "<p id='guessBanner'>GUESS A LETTER</p>" + //basic HTML for game load screen
    "<p id= 'win' >WINS: " +
    wins +
    "</p>" +
    "<p id= 'lose' >LOSSES: " +
    losses +
    "</p>";
  document.querySelector("#game").innerHTML = html; //loading basic HTML screen
  loadGif();
  for (var h = 0; h < computerWord.length; h++) {
    if (computerWord.charAt(h) == " ") {
      //load placeholder underscores into array
      answerArray.push(" ");
    } else {
      answerArray.push("_");
    }
  }
  var a = answerArray.join("&nbsp;");
  $("#answer").html(a); //  display placeholder via HTML

  document.onkeypress = function(event) {
    //capture keypress
    var x = event.which;
    var userGuess = "";

    if (x >= 65 && x <= 90) {
      var userGuess = String.fromCharCode(x).toLowerCase();
    } else if (x >= 97 && x <= 122) {
      var userGuess = String.fromCharCode(x);
    } else if (x == 32) {
      return false;
    } else {
      alert("Please enter an alphabetical letter");
    }

    if (lettersGuessed.indexOf(userGuess) !== -1 || answerArray.indexOf(userGuess) !== -1) {
      alert("You have already guessed this letter.  Guess again");
    } else if (lettersRemaining != 0 && remainingGuesses != 0) {
      var j = computerWord.indexOf(userGuess);
      if (j === -1) {
        lettersGuessed.push(userGuess);
        remainingGuesses--;
      } else {
        //       ALTERNATE METHOD, ACCOUNTING FOR MULTIPLE LETTERS AT DIFF INDEXES																	//     var blanks = computerWord.split("").map(function (){return "_"})
        for (var k = 0; k < computerWord.length; k++) {
          //	   var index = computerWord.indexOf(userGuess)
          if (userGuess === computerWord[k]) {
            //	   while (index > -1){
            answerArray[k] = userGuess; //			blanks[index] = userGuess;
            lettersRemaining--; //			var index = computerWord.indexOf(userGuess, index + 1); }
          }
        }
      }

      $("#lettersG").html("<p>Guesses Remaining: " + remainingGuesses + " </p>");
      $("#lettersR").html("<p>Number of unguessed letters: " + lettersRemaining + "</p>");
      $("#guessedLetters").html("<p>Incorrect letters guessed: " + lettersGuessed + "</p>");
      document.getElementById("answer").innerHTML = answerArray.join("&nbsp;");

      if (lettersRemaining === 0) {
        $("#music").remove(); //removes the current <audio> element thereby stopping any currently playing song
        loadPicture();
        loadSong();
        wins++;
        $("#win").html("Wins: " + wins);
        $("#answer").html("You have won the game");
        endGame();
      }
      if (remainingGuesses === 0) {
        loadPicture();
        losses++;
        $("#lose").html("Losses: " + losses);
        $("#answer").html("You have lost the game");
        endGame();
      }
    }
  };
});
