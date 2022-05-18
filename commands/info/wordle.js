const randomWords = require('random-words')
//add win streak 

module.exports = {
    name: "wordle",
    category: "info",
    permissions: [],
    devOnly: false,
    async execute(message, guess, wordleState) {
        let current_board = ""
        let counter = 0
        let winner = false
        if (wordleState.currentGame === false) {
            wordleState.wordleWord = randomWords({exactly: 1, maxLength: 5})[0]
            wordleState.currentGame = true
            wordleState.numGuess = 0
            while (wordleState.wordleWord.length != 5){
                wordleState.wordleWord = randomWords({exactly: 1, maxLength: 5})[0]
            }
        }
        console.log(wordleState.wordleWord)
        console.log(wordleState.numGuess)
        currentGame = true
        if(guess.length === 5 && winner === false) {
            for(let i = 0; i < guess.length; i++) {
                let colour = ':white_large_square: '
                for(let k = 0; k < wordleState.wordleWord.length; k++) {
                    if(guess.charAt(i) === wordleState.wordleWord.charAt(k)) {
                        if(i === k) {
                            colour = ':green_square: '
                            counter++
                            break
                        }
                        else {
                            colour = ":yellow_square: "
                        }
                    }
                }
                current_board += colour
            }
            wordleState.numGuess ++
            message.reply(current_board + "   **" + guess + "**")
            if(counter === 5){
                message.reply("Congratulations, you guessed the word in " + wordleState.numGuess + " guesses!")
                winner = true
                wordleState.currentGame = false
            }
        }
        else {
            message.reply("Please enter a 5-letter word.")
        }
    }
}

