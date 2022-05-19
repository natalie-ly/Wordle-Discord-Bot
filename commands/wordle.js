const MessageEmbed = require("discord.js/src/structures/MessageEmbed")
const randomWords = require('random-words')
const { blueLetters } = require('../wordle_letter_emojis')
//add leaderboard
//add dictionary to check if guesses are valid words

module.exports = {
    name: "wordle",
    permissions: [],
    devOnly: false,
    async execute(message, guess, wordleState) {
        let current_board = ""
        let counter = 0

        //Checks if there is a current wordle game running - if there is no current game, a new 5 letter Wordle word will generate
        if (wordleState.currentGame === false) {
            for(let j = 0; j < 26; j++) {
                wordleState.letters[j] = blueLetters[String.fromCharCode('a'.charCodeAt(0)+j)]
            }
            wordleState.wordleWord = randomWords({exactly: 1, maxLength: 5})[0]
            wordleState.currentGame = true
            wordleState.numGuess = 0
            while (wordleState.wordleWord.length != 5){
                wordleState.wordleWord = randomWords({exactly: 1, maxLength: 5})[0]
            }
        }

        //Tracks the Wordle word in the comsole
        console.log(wordleState.wordleWord)

        currentGame = true

        //Checks whether each letter in the user's guess is: at the right position, at the wrong position, or not in the wordle Word at all
        if(guess.length === 5) {
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
                if(colour === ':white_large_square: ') {
                    wordleState.letters[guess.charCodeAt(i)-'a'.charCodeAt(0)] = ':white_large_square:'
                }
                current_board += colour
            }
            
            wordleState.numGuess ++

            //Outputs embedded message that contains display to track used letters that are incorrect
            const wordleGuess = new MessageEmbed()
            .setTitle('Wordle Guess ' + wordleState.numGuess + '/6')
            .setColor('#3DA5D9')
            .addField('Guess', current_board + "   \n**" + guess.toUpperCase() + "**", false)
            .addField('Letters', wordleState.letters.join(' '), false)
            message.channel.send({ embeds: [wordleGuess] })

            /*If counter reaches 5 (meaning all letters in user's guess are correct and in the right position), ouputs 
            winner embedded message - win streak increases by 1*/
            if(counter === 5){
                wordleState.winStreak++
                //building embedded message for when user wins
                const winnerMessage = new MessageEmbed()
                .setTitle('Wordle')
                .setColor('#61D095')
                .addField('Game Over!', 'Congratulations, you guessed the word in ' + wordleState.numGuess + ' guesses!', true)
                .addField('Win Streak', 'Your win streak is now: **' + wordleState.winStreak + '**')
                .setThumbnail('https://cdn.discordapp.com/attachments/975918748781387776/976921346976120892/unknown.png')


                message.channel.send({ embeds: [winnerMessage]})
                wordleState.currentGame = false
            }
            //Ouputs loser embedded message, win streak ends
            else if(wordleState.numGuess === 6) {
                const loserMessage = new MessageEmbed()
                .setTitle('Wordle')
                .setColor('#9F2042')
                .addField('Game Over!', 'You lose, the word was **' + wordleState.wordleWord + '**', true)
                .addField('Win Streak', 'Your win streak ended at: **' + wordleState.winStreak + '**')
                .setThumbnail('https://static.wikia.nocookie.net/0e9418e5-bf6c-4353-8702-5b7ec0b56a52/scale-to-width/755')

                message.channel.send({ embeds: [loserMessage]})
                wordleState.currentGame = false
                wordleState.numGuess = 0
                wordleState.winStreak = 0
            }
        }
        else {
            message.reply("Please enter a 5-letter word.")
        }
    }
}

