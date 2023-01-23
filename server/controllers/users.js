var models = require('../models');

module.exports = {
  get: function (req, res) {
    res.writeHead(200);
    models.users.getAll().then((users) => res.end(JSON.stringify(users)));
  },
  post: function (req, res) {
    res.writeHead(201);
    models.users.create(req.body).then(() => { res.end('RECIEVED'); });
  }
};

// data = '';
// request.on('data', function(chunk) {
//   data += chunk.toString();
// });
// request.on('end', function() {
//   response.writeHead(201, {'Content-Type': 'application/json'});
//   response.end('RECdata);
// })