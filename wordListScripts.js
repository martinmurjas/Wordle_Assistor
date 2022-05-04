//Global Variable Declarations
const includedLetters = [];
const excludedLetters = [];
const wrongLetterPlacement = [[], [], [], [], []];
const correctLetterPlacement = ["", "", "", "", ""];
let guessCounter = 0;

const filterWordList = () => {
  return wordList
    .filter((word) => includes(word))
    .filter((word) => excludes(word))
    .filter((word) => wrongPlacement(word))
    .filter((word) => correctPlacement(word));
};

const includes = (word) => {
  for (let i = 0; i < includedLetters.length; i++) {
    if (!word.includes(includedLetters[i])) {
      return false;
    }
  }
  return true;
};

const excludes = (word) => {
  for (let i = 0; i < excludedLetters.length; i++) {
    if (word.includes(excludedLetters[i])) {
      return false;
    }
  }
  return true;
};

const wrongPlacement = (word) => {
  for (let i = 0; i < wrongLetterPlacement.length; i++) {
    for (let j = 0; j < wrongLetterPlacement[i].length; j++) {
      if (word[i] === wrongLetterPlacement[i][j]) {
        return false;
      }
    }
  }
  return true;
};

const correctPlacement = (word) => {
  for (let i = 0; i < correctLetterPlacement.length; i++) {
    if (correctLetterPlacement[i] && word[i] !== correctLetterPlacement[i]) {
      return false;
    }
  }
  return true;
};

const populatePotentialWords = () => {
  const potentialGuesses = document.getElementById("potentialGuesses");
  const filteredWordList = filterWordList();
  filteredWordList.forEach((word) => {
    const wordTag = document.createElement("p");
    const wordText = document.createTextNode(word);
    wordTag.appendChild(wordText);
    potentialGuesses.appendChild(wordTag);
  });
};

const clearPotentialWords = () => {
  const potentialGuesses = document.getElementById("potentialGuesses");
  while (potentialGuesses.firstChild) {
    potentialGuesses.removeChild(potentialGuesses.firstChild);
  }
};

//populatePotentialWords();

const removeExcluded = (letter) => {
  if (excludedLetters.includes(letter)) {
    excludedLetters.splice(excludedLetters.indexOf(letter), 1);
  }
};

const addIncluded = (letter) => {
  if (!includedLetters.includes(letter)) {
    includedLetters.push(letter);
  }
};

const addWrongPlacement = (letter, letterNumber) => {
  if (!wrongLetterPlacement[letterNumber].includes(letter)) {
    wrongLetterPlacement[letterNumber].push(letter);
  }
};

const removeWrongPlacement = (letter, letterNumber) => {
  if (wrongLetterPlacement[letterNumber].includes(letter)) {
    wrongLetterPlacement[letterNumber].splice(
      wrongLetterPlacement[letterNumber].indexOf(letter),
      1
    );
  }
};

const addCorrectPlacement = (letter, letterNumber) => {
  if (correctLetterPlacement[letterNumber] !== letter) {
    correctLetterPlacement[letterNumber] = letter;
  }
};

const removeCorrectPlacement = (letter, letterNumber) => {
  if (correctLetterPlacement[letterNumber] === letter) {
    correctLetterPlacement[letterNumber] = "";
  }
};

const removeIncluded = (letter) => {
  if (includedLetters.includes(letter)) {
    includedLetters.splice(includedLetters.indexOf(letter), 1);
  }
};

const addExcluded = (letter) => {
  if (!excludedLetters.includes(letter)) {
    excludedLetters.push(letter);
  }
};
