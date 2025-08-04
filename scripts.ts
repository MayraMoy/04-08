let randomNumber: number = Math.floor(Math.random() * 100) + 1; // Genera un número aleatorio entre 1 y 100

// Obtiene los elementos del DOM necesarios para el juego
const guesses = document.querySelector(".guesses") as HTMLElement;      // Muestra los intentos anteriores
const lastResult = document.querySelector(".lastResult") as HTMLElement; // Muestra el resultado del último intento
const lowOrHi = document.querySelector(".lowOrHi") as HTMLElement;      // Muestra si el número es más bajo o más alto

const guessSubmit = document.querySelector(".guessSubmit") as HTMLButtonElement; // Botón para enviar el intento
let guessCount: number = 1; // Contador de intentos
let resetButton: HTMLButtonElement; // Botón para reiniciar el juego
const guessField = document.querySelector(".guessField") as HTMLInputElement; // Campo de entrada del usuario

// Función principal que verifica el intento del usuario
function checkGuess(): void {
    const userGuess: number = Number(guessField.value); // Convierte el valor ingresado a número

    // Si es el primer intento, muestra el texto inicial
    if (guessCount === 1) {
        guesses.textContent = "Intentos anteriores: ";
    }
    // Muestra el intento actual
    guesses.textContent += userGuess + " ";

    // Si el usuario adivinó el número
    if (userGuess === randomNumber) {
        lastResult.textContent = "¡Felicidades! ¡Lo adivinaste!";
        lastResult.style.backgroundColor = "green";
        lowOrHi.textContent = "";
        setGameOver(); // Finaliza el juego
    } else if (guessCount === 10) { // Si llegó al décimo intento sin adivinar
        lastResult.textContent = "¡¡¡Fin del juego!!!";
        setGameOver(); // Finaliza el juego
    } else { // Si el intento es incorrecto
        lastResult.textContent = "¡Incorrecto!";
        lastResult.style.backgroundColor = "red";
        // Indica si el número es muy bajo o muy alto
        if (userGuess < randomNumber) {
            lowOrHi.textContent = "¡El número es muy bajo!";
        } else if (userGuess > randomNumber) {
            lowOrHi.textContent = "¡El número es muy grande!";
        }
    }

    guessCount++; // Incrementa el contador de intentos
    guessField.value = ""; // Limpia el campo de entrada
    guessField.focus(); // Da foco al campo de entrada
}

// Asocia la función checkGuess al botón de enviar intento
guessSubmit.addEventListener("click", checkGuess);

// Función que finaliza el juego y muestra el botón de reinicio
function setGameOver(): void {
    guessField.disabled = true; // Deshabilita el campo de entrada
    guessSubmit.disabled = true; // Deshabilita el botón de enviar
    resetButton = document.createElement("button"); // Crea el botón de reinicio
    resetButton.textContent = "Iniciar nuevo juego";
    document.body.append(resetButton); // Agrega el botón al documento
    resetButton.addEventListener("click", resetGame); // Asocia el evento para reiniciar el juego
}

// Función que reinicia el juego
function resetGame(): void {
    guessCount = 1; // Reinicia el contador de intentos

    // Limpia los textos de los resultados anteriores
    const resetParas = document.querySelectorAll(".resultParas p");
    resetParas.forEach((para) => {
        (para as HTMLElement).textContent = "";
    });

    // Elimina el botón de reinicio
    resetButton.parentNode?.removeChild(resetButton);

    // Habilita los campos y botones
    guessField.disabled = false;
    guessSubmit.disabled = false;
    guessField.value = "";
    guessField.focus();

    lastResult.style.backgroundColor = "white"; // Restaura el color de fondo

    // Genera un nuevo número aleatorio
    randomNumber = Math.floor(Math.random() * 100) + 1;
}

// Limpia los textos de los resultados al iniciar el juego
const resetParas = document.querySelectorAll(".resultParas p");
resetParas.forEach((para) => {
    (para as HTMLElement).textContent = "";
});

guessField.focus();


