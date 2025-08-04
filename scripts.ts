let randomNumber: number = Math.floor(Math.random() * 100) + 1;

const guesses = document.querySelector(".guesses") as HTMLElement;
const lastResult = document.querySelector(".lastResult") as HTMLElement;
const lowOrHi = document.querySelector(".lowOrHi") as HTMLElement;

const guessSubmit = document.querySelector(".guessSubmit") as HTMLButtonElement;
let guessCount: number = 1;
let resetButton: HTMLButtonElement;
const guessField = document.querySelector(".guessField") as HTMLInputElement;

function checkGuess(): void {
    const userGuess: number = Number(guessField.value);
    if (guessCount === 1) {
        guesses.textContent = "Intentos anteriores: ";
    }
    guesses.textContent += userGuess + " ";

    if (userGuess === randomNumber) {
        lastResult.textContent = "¡Felicidades! ¡Lo adivinaste!";
        lastResult.style.backgroundColor = "green";
        lowOrHi.textContent = "";
        setGameOver();
    } else if (guessCount === 10) {
        lastResult.textContent = "¡¡¡Fin del juego!!!";
        setGameOver();
    } else {
        lastResult.textContent = "¡Incorrecto!";
        lastResult.style.backgroundColor = "red";
        if (userGuess < randomNumber) {
            lowOrHi.textContent = "¡El número es muy bajo!";
        } else if (userGuess > randomNumber) {
            lowOrHi.textContent = "¡El número es muy grande!";
        }
    }

    guessCount++;
    guessField.value = "";
    guessField.focus();
}

guessSubmit.addEventListener("click", checkGuess);

function setGameOver(): void {
    guessField.disabled = true;
    guessSubmit.disabled = true;
    resetButton = document.createElement("button");
    resetButton.textContent = "Iniciar nuevo juego";
    document.body.append(resetButton);
    resetButton.addEventListener("click", resetGame);
}

function resetGame(): void {
    guessCount = 1;

    const resetParas = document.querySelectorAll(".resultParas p");
    resetParas.forEach((para) => {
        (para as HTMLElement).textContent = "";
    });

    resetButton.parentNode?.removeChild(resetButton);

    guessField.disabled = false;
    guessSubmit.disabled = false;
    guessField.value = "";
    guessField.focus();

    lastResult.style.backgroundColor = "white";

    randomNumber = Math.floor(Math.random() * 100) + 1;
}

const resetParas = document.querySelectorAll(".resultParas p");
resetParas.forEach((para) => {
    (para as HTMLElement).textContent = "";
});

guessField.focus();


