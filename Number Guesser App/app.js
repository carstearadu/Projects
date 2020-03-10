//Game values

let min = 1, 
    max = 10,
    winningNum = getRandomNum(min, max),
    guessesLeft = 3;

//UI Elements

const game = document.querySelector('#game'),
      minNum = document.querySelector('.min-num'),
      maxNum = document.querySelector('.max-num'),
      guessBtn = document.querySelector('#guess-btn'),
      guessInput = document.querySelector('#guess-input'),
      message = document.querySelector('.message');

//Assign UI Min and Max

minNum.textContent = min;
maxNum.textContent = max;

//Play again event listener
game.addEventListener('mousedown', function(e){
    if(e.target.className === 'play-again'){
        window.location.reload(); 
    }
})

//Listen for guess

guessBtn.addEventListener('click', function(){
    let guess = parseInt(guessInput.value);

    //Validate input

    if(isNaN(guess) || guess < min || guess > max){
        setMessage(`Please enter a number between ${min} and ${max}.`, 'red');
    }

    //Check if won
    if(guess === winningNum){
        //Game over - won

        // //Disable input
        // guessInput.disabled = true;
        // //Change border color to green.
        // guessInput.style.borderColor = 'green';
        // //Set message - user won
        // setMessage(`${winningNum} is correct! YOU WIN!`, 'green');

        gameOver(true, `${winningNum} is correct, YOU WON!`); 

    } else {
        //Wrong number
        guessesLeft -= 1;
        if(guessesLeft === 0){
            // //Game over - lost
            // guessInput.disabled = true;
            // guessInput.style.borderColor = 'red';
            // setMessage(`Game over, you lost. The correct number was ${winningNum}`, 'red');

            gameOver(false, `Game over, you lost. The correct number was ${winningNum}`);

        } else {
            //Game continues - answer wrong
            guessInput.style.borderColor = 'red';
            guessInput.value = '';
            //Tell user it's the wrong number
            setMessage(`${guess} is not correct. ${guessesLeft} guesses left`, 'red');
        }
    }
});

//Game over
function gameOver(won, msg){
    let color;
    won === true ? color = 'green' : color = 'red';

    //Disable input
    guessInput.disabled = true;
    //Change border color
    guessInput.style.borderColor = color;
    //Set text color
    message.style.color = color;
    //Set Message
    setMessage(msg);

    //Play Again?
    guessBtn.value = 'Play Again';
    guessBtn.className += 'play-again';
}

//Get winning number - RANDOM

function getRandomNum(min, max){
    return Math.floor(Math.random()*(max-min+1)+min);
}

//Set message function

function setMessage(msg, color){
    message.style.color = color;
    message.textContent = msg;
}

