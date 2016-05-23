var restify = require('restify');
var builder = require('botbuilder');
var _ = require('lodash');

// Define list of Hodor-isms
var responses = ['Hodor', 'Hodor Hodor', 'Hooodor', "Ho-Dor", 'Hodor!', '....Hodor?'];

// Create bot and add dialogs
var bot = new builder.BotConnectorBot({ appId: 'YourAppId', appSecret: 'YourAppSecret' });
bot.add('/', function (session) {

    // Send a random response
    session.send(_.sample(responses));

});

// Setup Restify Server
var server = restify.createServer();
server.post('/api/messages', bot.verifyBotFramework(), bot.listen());
server.listen(process.env.port || 3978, function () {
    console.log('%s listening to %s', server.name, server.url);
});