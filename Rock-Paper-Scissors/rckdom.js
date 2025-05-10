let score=JSON.parse(localStorage.getItem('score')) || {
    wins:0,
    loses:0,
    ties:0
};

scoreCard();

document.querySelector('.js-reset-button')
    .addEventListener('click', () => {
        resetDecision();
    });

document.querySelector('.js-rock')
    .addEventListener('click', () => {
        finalGame('rock');
    });

document.querySelector('.js-paper')
    .addEventListener('click', () => {
        finalGame('paper');
    });

document.querySelector('.js-scissors')
    .addEventListener('click', () => {
        finalGame('scissors');
    });

document.querySelector('.js-autoPlay-button')
    .addEventListener('click',  () => {
        autoPlay();
    });

document.body.addEventListener('keydown', (event) => {
    if (event.key === 'r') {
        finalGame('rock');
    } else if (event.key === 'p') {
        finalGame('paper');
    } else if (event.key === 's') {
        finalGame('scissors');
    } else if (event.key === 'a') {
        autoPlay();
    } else if (event.key === 'Backspace') {
        resetDecision();
    }
});

const autoPlayElement = document.querySelector('.js-autoPlay-button');

let isAutoPlaying = false;
let intervalId;

function autoPlay() {
    if (!isAutoPlaying) {
        intervalId = setInterval(() => {
            const playerMove = pickComputerMove();
            finalGame(playerMove);
        }, 1000);
        autoPlayElement.innerHTML = 'Stop Playing';
        isAutoPlaying = true;
    } else {
        clearInterval(intervalId);
        isAutoPlaying = false;
        autoPlayElement.innerHTML = 'Auto Play';
    }
}

function reset() {

    score.wins = 0;
    score.loses = 0;
    score.ties = 0;
    
    localStorage.removeItem('score');

    result='';

    document.querySelector('.js-score')
        .innerHTML= `Wins: ${score.wins}, Loses: ${score.loses}, Ties:${score.ties}`;
    
}

function resetDecision() {
    const quesElement = document.querySelector('.js-ques');

    quesElement.innerHTML = `Are you sure you want to reset the score? <button class="js-yes-button">Yes</button> <button class="js-no-button">No</button>`;

    document.querySelector('.js-yes-button')
        .addEventListener('click', () => {
            reset();
            quesElement.innerHTML = '';
        });

    document.querySelector('.js-no-button')
        .addEventListener('click', () => {
            quesElement.innerHTML = '';
        });
}

function scoreCard(result) {
    if (result === 'You win') {
        score.wins += 1;
    } else if (result === 'You lose') {
        score.loses += 1;
    } if (result === 'Tie') {
        score.ties += 1;
    }    
}

function pickComputerMove() {
    let computerMove='';

    const randomNumber=Math.random();

    if (randomNumber>=0 && randomNumber<1/3) {                       
        computerMove='rock';
    } else if (randomNumber>=1/3 && randomNumber<2/3) {
        computerMove='paper';
    } else if (randomNumber>=2/3 && randomNumber<1) {
        computerMove='scissors';
    }

    return computerMove;
}


function finalGame(playerMove) {
    
    const computerMove = pickComputerMove();
    let result='';

    if (playerMove === 'rock') {

        if (computerMove==='rock') {
            result='Tie';
        } else if (computerMove==='paper') {
            result='You lose';
        } else if (computerMove==='scissors') {
            result='You win';
        }   
    } else if (playerMove === 'paper') {
        
        if (computerMove==='rock') {
            result='You win';
        } else if (computerMove==='paper') {
            result='Tie';
        } else if (computerMove==='scissors') {
            result='You lose';
        }   
    } else if (playerMove === 'scissors') {
               
        if (computerMove==='rock') {
            result='You lose';
        } else if (computerMove==='paper') {
            result='You win';
        } else if (computerMove==='scissors') {
            result='Tie';
        }          
    }

    document.querySelector('.js-result')
        .innerHTML=`Result: ${result} `;

    localStorage.setItem('score', JSON.stringify(score));

    scoreCard(result);

    document.querySelector('.js-score')
        .innerHTML= `Wins: ${score.wins}, Loses: ${score.loses}, Ties:${score.ties}`;

    document.querySelector('.js-moves')
        .innerHTML = `You <img src="images/${playerMove}-emoji.png" alt="" class="move-icon">  <img src="images/${computerMove}-emoji.png" alt="" class="move-icon"> Computer`;
}
