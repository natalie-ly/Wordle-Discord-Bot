const gis = require('g-i-s')
module.exports = {
    name: "search",
    category: "info",
    //array of permissions contain permissions that member is required to have to execute this command
    permissions: [],
    devOnly: false,
    async execute(message, search) {

        gis(search, function logResults(error, results) {
          if (error) {
            console.log(error)
            message.reply('Something went wrong')
          }
          else {
            message.reply(results[Math.floor(Math.random()*results.length)].url)
          }
        })
    }
}