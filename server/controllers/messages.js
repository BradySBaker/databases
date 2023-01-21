var models = require('../models');
module.exports = {
  get: function (req, res) {
    res.writeHead(200);
    models.messages.getAll().then((messages) => res.end(JSON.stringify(messages)));
  }, // a function which handles a get request for all messages
  post: function (req, res) {
    res.writeHead(201);
    models.messages.create(req.body).then(() => res.end('RECIEVED'));

    // setTimeout(() => { res.end('RECIEVED'); }, 100);
  } // a function which handles posting a message to the database
};
