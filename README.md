# Wordle Assistor

Wordle Assistor is a web application designed to assist users with playing the popular word game "Wordle" from The New York Times. The application provides users with potential guesses for the game based on the clues given. 

## Features

- Provides possible solutions based on the user's input
- Simple and easy-to-use interface that matches the Wordle UI

## Technologies Used

- JavaScript
- HTML
- CSS

## Installation

1. Clone the repository: `git clone https://github.com/martinmurjas/wordle-assistor.git`
2. Open the `index.html` file in your web browser

## Usage

1. Enter your first guess into the top input field and press enter. The guess is then moved to your guess list below

![image](https://martinmurjas.github.io/wordle-assistor/images/enterGuess.gif)

2. Click the letters to toggle through the three colors which represent the letter status:
  - Grey: Letter is not included in the word
  - Yellow: Letter is included in the word but in the wrong place
  - Green: Letter is included in the word and in the correct place

![image](https://martinmurjas.github.io/wordle-assistor/images/toggle.gif)

3. All potential guesses which meet the letters criteria will be displayed. Select your next word either by typing it into the input or clicking on the word from the list

![image](https://martinmurjas.github.io/wordle-assistor/images/wordButton.gif)

4. Continue until you have solved the Wordle puzzle for the day.
