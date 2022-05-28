const MessageEmbed = require("discord.js/src/structures/MessageEmbed")
const randomWords = require('random-words')
const { blueLetters, emptyWordleState } = require('../wordle_game_constants')

//add leaderboard
//add dictionary to check if guesses are valid words

module.exports = {
    name: "wordle",
    permissions: [],
    devOnly: false,
    async execute(message, guess, wordlePlayers) {
        let current_board = ""
        let counter = 0

        if (!(message.author.username in wordlePlayers)){
            wordlePlayers[message.author.username] = JSON.parse(JSON.stringify(emptyWordleState))
            wordlePlayers[message.author.username].letters.length = 26
        }

        let activePlayer = wordlePlayers[message.author.username]

        //Checks if there is a current wordle game running - if there is no current game, a new 5 letter Wordle word will generate
        if (activePlayer.currentGame === false) {
            for(let j = 0; j < 26; j++) {
                activePlayer.letters[j] = blueLetters[String.fromCharCode('a'.charCodeAt(0)+j)]
            }
            activePlayer.wordleWord = randomWords({exactly: 1, maxLength: 5})[0]
            activePlayer.currentGame = true
            activePlayer.numGuess = 0
            while (activePlayer.wordleWord.length != 5){
                activePlayer.wordleWord = randomWords({exactly: 1, maxLength: 5})[0]
            }
        }

        //Tracks the Wordle word in the comsole
        console.log(activePlayer.wordleWord)

        currentGame = true

        //Checks whether each letter in the user's guess is: at the right position, at the wrong position, or not in the wordle Word at all
        if(guess.length === 5) {
            for(let i = 0; i < guess.length; i++) {
                let colour = ':white_large_square: '
                for(let k = 0; k < activePlayer.wordleWord.length; k++) {
                    if(guess.charAt(i) === activePlayer.wordleWord.charAt(k)) {
                        if(i === k) {
                            colour = ':green_square: '
                            counter++
                            break
                        }
                        else if(!(activePlayer.wordleWord.charAt(k) === guess.charAt(k))){
                            colour = ":yellow_square: "
                        }
                    }
                }
                if(colour === ':white_large_square: ') {
                    activePlayer.letters[guess.charCodeAt(i)-'a'.charCodeAt(0)] = ':white_large_square:'
                }
                current_board += colour
            }
            
            activePlayer.numGuess ++

            //Outputs embedded message that contains display to track used letters that are incorrect
            const wordleGuess = new MessageEmbed()
            .setTitle('Wordle Guess ' + activePlayer.numGuess + '/6')
            .setColor('#3DA5D9')
            .addField('Guess', current_board + "   \n**" + guess.toUpperCase() + "**", false)
            .addField('Letters', activePlayer.letters.join(' '), false)
            message.channel.send({ embeds: [wordleGuess] })

            /*If counter reaches 5 (meaning all letters in user's guess are correct and in the right position), ouputs 
            winner embedded message - win streak increases by 1*/
            if(counter === 5){
                activePlayer.winStreak++
                //building embedded message for when user wins
                const winnerMessage = new MessageEmbed()
                .setTitle('Wordle')
                .setColor('#61D095')
                .addField('Game Over!', 'Congratulations, you guessed the word in ' + activePlayer.numGuess + ' guesses!', true)
                .addField('Win Streak', 'Your win streak is now: **' + activePlayer.winStreak + '**')
                .setThumbnail('https://cdn.discordapp.com/attachments/975918748781387776/976921346976120892/unknown.png')


                message.channel.send({ embeds: [winnerMessage]})
                activePlayer.currentGame = false
            }
            //Ouputs loser embedded message, win streak ends
            else if(activePlayer.numGuess === 6) {
                const loserMessage = new MessageEmbed()
                .setTitle('Wordle')
                .setColor('#9F2042')
                .addField('Game Over!', 'You lose, the word was **' + activePlayer.wordleWord + '**', true)
                .addField('Win Streak', 'Your win streak ended at: **' + activePlayer.winStreak + '**')
                .setThumbnail('https://static.wikia.nocookie.net/0e9418e5-bf6c-4353-8702-5b7ec0b56a52/scale-to-width/755')

                // if(activePlayer.numGuess > activePlayer.leaderboardScore){
                //     //find a way to get user id to set to number one place on leaderboard
                //     activePlayer.leaderboardUser = member.id
                //     const leaderboard = new MessageEmbed()
                //     .setTitle('LEADERBOARD')
                //     .addField(':first_place: ' + activePlayer.numGuess + ' guesses', message.member, true )
                //     activePlayer.leaderboardScore = activePlayer.numGuess
                // }

                message.channel.send({ embeds: [loserMessage]})
                // message.channel.send({ embed: [leaderboard]})

                activePlayer.currentGame = false
                activePlayer.numGuess = 0
                activePlayer.winStreak = 0
            }
        }
        else {
            message.reply("Please enter a 5-letter word.")
        }
    }
}

