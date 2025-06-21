const userScoreline = document.querySelector(".userScore");
const computerScoreline = document.querySelector(".computerScore");
const userhand = document.querySelector(".userhand");
const computerhand = document.querySelector(".computerhand");
const message = document.querySelector(".message");
const icones = document.querySelectorAll(".icon");
const handsContainer = document.querySelector(".playground");
const reset = document.querySelector(".reset");

let userScore = 0;
let computerScore = 0;

//Generate Computer Choice
const genComputerChoice = () => {
    const options = ["rock", "paper", "scissor"];
    const randIdx = Math.floor(Math.random() * options.length);
    return options[randIdx];
};

//Winning Condition
const winConditions = {
    rock: "scissor",
    paper: "rock",
    scissor: "paper",
};

//Get User Choices
icones.forEach((icon) => {
    icon.addEventListener("click", () => {
        const userChoice = icon.getAttribute("id");
        playGame(userChoice);
    });
});

let isPlaying = false;

const handIcons = {
    rock: "fa-hand-rock",
    paper: "fa-hand-paper",
    scissor: "fa-hand-peace"
};

const playGame = (userChoice) => {
    if (isPlaying) return;
    isPlaying = true;

    const computerChoice = genComputerChoice();

    updateHandIcon(userhand, handIcons["rock"]);
    updateHandIcon(computerhand, handIcons["rock"]);

    userhand.classList.add("shake-user");
    computerhand.classList.add("shake-comp");

    setTimeout(() => {

        userhand.classList.remove("shake");
        computerhand.classList.remove("shake");

        //Show actual choice icons
        updateHandIcon(userhand, handIcons[userChoice]);
        updateHandIcon(computerhand, handIcons[computerChoice]);

        //Show result
        if (userChoice === computerChoice) {
            gameDraw(userChoice);
        } else {
            const userWin = winConditions[userChoice] === computerChoice;
            showWinner(userWin, userChoice, computerChoice);
        }

        isPlaying = false;
    }, 600);
};

//Update icones
const updateHandIcon = (element, newIconClass) => {
    element.className = `fas ${newIconClass}`;
};

//Winner
const showWinner = (userWin, userChoice, computerChoice) => {
    if (userWin) {
        userScore++;
        userScoreline.innerText = userScore;
        userhand.style.color = "green";
        computerhand.style.color = "red";
        userhand.style.transform = "rotate(90deg)";
        computerhand.style.transform = "rotate(-90deg)";
        message.innerText = `You win :) Your ${userChoice} beats ${computerChoice}.`;
        createConfetti();
    } else {
        computerScore++;
        computerScoreline.innerText = computerScore;
        userhand.style.color = "red";
        computerhand.style.color = "green";
        userhand.style.transform = "rotate(90deg)";
        computerhand.style.transform = "rotate(-90deg)";
        message.innerText = `You lost :( ${computerChoice} beats your ${userChoice}.`;
    }
};

const gameDraw = (userChoice) => {
    message.innerText = `Game was a draw. Both chose ${userChoice}.`;
    userhand.style.color = "gray";
    computerhand.style.color = "gray";
    userhand.style.transform = "rotate(90deg)";
    computerhand.style.transform = "rotate(-90deg)";
};

const resetBtn = () => {
    userScore = 0;
    computerScore = 0;
    userScoreline.innerText = userScore;
    computerScoreline.innerText = computerScore;
    updateHandIcon(userhand, handIcons["rock"]);
    updateHandIcon(computerhand, handIcons["rock"]);
    userhand.style.color = "gray";
    computerhand.style.color = "gray";
    message.innerText = "Let's Play...!!"

};
reset.addEventListener("click", resetBtn);

//Winnig Animation
function createConfetti() {
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = `${Math.random() * 100}%`;
        confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
        confetti.style.animationDuration = `${Math.random() * 2 + 1}s`;
        handsContainer.appendChild(confetti);

        setTimeout(() => {
            confetti.remove();
        }, 2000);
    }
}