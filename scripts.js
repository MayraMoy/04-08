// Genera un número aleatorio entre 1 y 100
var randomNumber = Math.floor(Math.random() * 100) + 1;

// Obtiene los elementos del DOM necesarios para el juego
var guesses = document.querySelector(".guesses");
var lastResult = document.querySelector(".lastResult");
var lowOrHi = document.querySelector(".lowOrHi");
var guessSubmit = document.querySelector(".guessSubmit");
var guessCount = 1; // Contador de intentos
var resetButton; // Botón para reiniciar el juego
var guessField = document.querySelector(".guessField"); // Campo de entrada del usuario

// Función principal que verifica el intento del usuario
function checkGuess() {
    var userGuess = Number(guessField.value); // Convierte el valor ingresado a número

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
    }
    // Si llegó al décimo intento sin adivinar
    else if (guessCount === 10) {
        lastResult.textContent = "¡¡¡Fin del juego!!!";
        setGameOver(); // Finaliza el juego
    }
    // Si el intento es incorrecto
    else {
        lastResult.textContent = "¡Incorrecto!";
        lastResult.style.backgroundColor = "red";
        // Indica si el número es muy bajo o muy alto
        if (userGuess < randomNumber) {
            lowOrHi.textContent = "¡El número es muy bajo!";
        }
        else if (userGuess > randomNumber) {
            lowOrHi.textContent = "¡El número es muy grande!";
        }
    }
    // Incrementa el contador de intentos y limpia el campo
    guessCount++;
    guessField.value = "";
    guessField.focus();
}

// Asocia la función checkGuess al botón de enviar intento
guessSubmit.addEventListener("click", checkGuess);

// Función que finaliza el juego y muestra el botón de reinicio
function setGameOver() {
    guessField.disabled = true;
    guessSubmit.disabled = true;
    resetButton = document.createElement("button");
    resetButton.textContent = "Iniciar nuevo juego";
    document.body.append(resetButton);
    resetButton.addEventListener("click", resetGame);
}

// Función que reinicia el juego
function resetGame() {
    var _a;
    guessCount = 1;
    // Limpia los textos de los resultados anteriores
    var resetParas = document.querySelectorAll(".resultParas p");
    resetParas.forEach(function (para) {
        para.textContent = "";
    });
    // Elimina el botón de reinicio
    (_a = resetButton.parentNode) === null || _a === void 0 ? void 0 : _a.removeChild(resetButton);
    // Habilita los campos y botones
    guessField.disabled = false;
    guessSubmit.disabled = false;
    guessField.value = "";
    guessField.focus();
    lastResult.style.backgroundColor = "white";
    // Genera un nuevo número aleatorio
    randomNumber = Math.floor(Math.random() * 100) + 1;
}

// Limpia los textos de los resultados al iniciar el juego
var resetParas = document.querySelectorAll(".resultParas p");
resetParas.forEach(function (para) {
    para.textContent = "";
});

// Da foco al campo de entrada al iniciar el juego
guessField.focus();
