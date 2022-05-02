const guess = document.querySelector("#guessInputs");

const errorMessages = document.querySelectorAll("#errorMessage div");

const clearInputKeys = [8, 46];

let keyPressed = "";

document.querySelector("body").addEventListener("click", () => {
  setFocus();
});

guess.lastElementChild.firstElementChild.focus();

const previousGuesses = document.querySelector("#guesses");

const potentialGuesses = document.getElementById("potentialGuesses");

guess.addEventListener("keydown", (ev) => {
  let keyPressed = ev.keyCode;
  let previousInputValue = ev.target.value;
  let previousInputBox = ev.target.previousElementSibling;
  if (!/[a-zA-Z]/.test(ev.key) || keyPressed === 9) {
    ev.preventDefault();
  } else if (
    clearInputKeys.includes(keyPressed) &&
    !ev.target.value &&
    previousInputBox
  ) {
    previousInputBox.disabled = false;
    previousInputBox.value = "";
    previousInputBox.className = "";
    previousInputBox.focus();
  } else if (keyPressed === 13) {
    if (
      errorMessages[0].style.display === "block" ||
      errorMessages[1].style.display === "block"
    ) {
      ev.preventDefault();
      return;
    }
    const inputList = [...document.querySelectorAll("input")];
    let inputWord = "";
    inputList.forEach((input, index) => {
      inputWord += inputList[index].value.toLowerCase();
    });
    if (inputWord.length !== 5 || !wordList.includes(inputWord)) {
      guess.lastElementChild.className = "invalidInput";
      if (inputWord.length !== 5) {
        errorMessages[0].style.display = "block";
      } else {
        errorMessages[1].style.display = "block";
      }
      setTimeout(() => {
        guess.lastElementChild.className = "";
        errorMessages[0].style.display = "none";
        errorMessages[1].style.display = "none";
      }, 1250);
    } else {
      enterGuess(inputList);
      clearInputs(inputList);
      setFocus();
    }
  }
});

guess.addEventListener("input", (ev) => {
  const input = ev.target;

  if (!input.value) {
    input.className = "";
  } else {
    input.className = "entered";

    const nextInput = input.nextElementSibling;
    if (nextInput) {
      input.disabled = true;
      nextInput.focus();
    }
  }
});

previousGuesses.addEventListener("click", (ev) => {
  if (ev.target.tagName === "H2" && ev.target.innerHTML) {
    const guessWords = [...document.querySelectorAll(".guess")];
    const letter = ev.target.innerHTML;
    const target = ev.target;
    let letterNumber;
    const guessWord = [...target.parentElement.children];
    for (let i = 0; i < guessWord.length; i++) {
      if (target === guessWord[i]) {
        letterNumber = i;
      }
    }
    if (
      ev.target.className === "excluded" ||
      ev.target.className === "newExcluded"
    ) {
      ev.target.className = "included";
      removeExcluded(letter);
      addIncluded(letter);
      addWrongPlacement(letter, letterNumber);
    } else if (ev.target.className === "included") {
      ev.target.className = "correct";
      removeWrongPlacement(letter, letterNumber);
      addCorrectPlacement(letter, letterNumber);
    } else if (ev.target.className === "correct") {
      ev.target.className = "excluded";
      removeCorrectPlacement(letter, letterNumber);
      removeIncluded(letter);
      addExcluded(letter);
    }
    clearPotentialWords();
    populatePotentialWords();
  }
});

const enterGuess = (guessWordArray) => {
  const guesses = [...document.querySelectorAll(".guess")];
  if (guessCounter < 6) {
    guessWordArray.forEach((input, index) => {
      const guessLetter = [...guesses[guessCounter].children][index];
      let inputLetter = "";
      if (guessWordArray[index].value) {
        inputLetter = guessWordArray[index].value.toLowerCase();
      } else {
        inputLetter = guessWordArray[index];
      }
      guessLetter.innerHTML = inputLetter;
      setTimeout(() => {
        if (correctLetterPlacement[index] === inputLetter) {
          guessLetter.className = "newCorrect";
        } else {
          if (
            !excludedLetters.includes(inputLetter) &&
            !includedLetters.includes(inputLetter)
          ) {
            excludedLetters.push(inputLetter);
          }
          guessLetter.className = "newExcluded";
        }
      }, 100 * Math.pow(index, 1.5));
    });
    setTimeout(() => {
      clearPotentialWords();
      populatePotentialWords();
    }, 100 * Math.pow(4, 1.5));
    guessCounter++;
  }
};

const setFocus = () => {
  const inputList = [...document.querySelectorAll("input")];
  for (let i = 0; i < inputList.length; i++) {
    if (!inputList[i].value) {
      inputList[i].focus();
      return;
    }
  }
  inputList[4].focus();
};

const clearInputs = (guessWordArray) => {
  guessWordArray.forEach((input, index) => {
    guessWordArray[index].value = "";
    if (guessCounter === 6) {
      guessWordArray[index].disabled = true;
      guessWordArray[index].className = "noMoreGuesses";
    } else {
      guessWordArray[index].disabled = false;
      guessWordArray[index].className = "";
      guess.lastElementChild.firstElementChild.focus();
    }
  });
};

potentialGuesses.addEventListener("click", (ev) => {
  console.log(ev.target);
  if (ev.target.tagName === "P") {
    enterGuess(ev.target.innerHTML.split(""));
  }
});
