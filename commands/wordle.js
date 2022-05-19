const MessageEmbed = require("discord.js/src/structures/MessageEmbed")
const randomWords = require('random-words')
const {blueLetters} = require('./wordle_letter_emojis')
//add win streak 
//embed messages
//add dictionary to check if guesses are valid words

module.exports = {
    name: "wordle",
    permissions: [],
    devOnly: false,
    async execute(message, guess, wordleState) {
        let current_board = ""
        let counter = 0
        let winner = false
<<<<<<< HEAD:commands/wordle.js

        const wordleLetters = new MessageEmbed()
        .setTitle('Wordle')
        .setColor('#3DA5D9')
        .addField()

        //Checks if there is a current wordle game running - if there is no current game, a new 5 letter Wordle word will generate
=======
>>>>>>> parent of 6797a00 (Added comments to Wordle command):commands/info/wordle.js
        if (wordleState.currentGame === false) {
            letters = [blueLetters.a, 'b','c',]
            wordleState.wordleWord = randomWords({exactly: 1, maxLength: 5})[0]
            wordleState.currentGame = true
            wordleState.numGuess = 0
            while (wordleState.wordleWord.length != 5){
                wordleState.wordleWord = randomWords({exactly: 1, maxLength: 5})[0]
            }
        }
<<<<<<< HEAD:commands/wordle.js

        //track the Wordle word in the comsole
        console.log(wordleState.wordleWord)

        //Check if user's guess is a 5 letter word
=======
        console.log(wordleState.wordleWord)
        console.log(wordleState.numGuess)
>>>>>>> parent of 6797a00 (Added comments to Wordle command):commands/info/wordle.js
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
                if(colour === ':white_large_square'){
                    letters[guess.charAt(i) - 'a'] = colour
                }
                current_board += colour
            }
            wordleState.numGuess ++
            message.reply(current_board + "   **" + guess + "**")
<<<<<<< HEAD:commands/wordle.js
    
=======
>>>>>>> parent of 6797a00 (Added comments to Wordle command):commands/info/wordle.js
            if(counter === 5){
                //building embedded message for when user wins
                const winnerMessage = new MessageEmbed()
                .setTitle('Wordle')
                .setColor('#3DA5D9')
                .addField('Game Over!', 'Congratulations, you guessed the word in ' + wordleState.numGuess + ' guesses!', true)

                message.channel.send({ embeds: [winnerMessage]})
                winner = true
                wordleState.currentGame = false
            }
            else if(wordleState.numGuess === 6) {
                //building embedded message for when user loses
                const loserMessage = new MessageEmbed()
                .setTitle('Wordle')
                .setColor('#3DA5D9')
                .addField('Game Over!', 'You lose, the word was **' + wordleState.wordleWord + '**', true)

                message.channel.send({ embeds: [loserMessage]})
                wordleState.currentGame = false
                wordleState.numGuess = 0
                winner = false
            }
        }
        else {
            message.reply("Please enter a 5-letter word.")
        }
    }
}

