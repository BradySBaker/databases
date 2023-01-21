var db = require('../db');

module.exports = {
  getAll: function () {
    return new Promise((resolve, reject) => {
      db.query(
        'SELECT messages.text, users.username, rooms.roomname FROM messages INNER JOIN rooms ON messages.id_rooms = rooms.id INNER JOIN users ON messages.id_users = users.id', (err, results, fields) => {
          if (err) {
            reject(err);
          }
          resolve(results);
        });
    });
  }, // a function which produces all the messages
  create: function (data) {
    console.log('DATA', data);
    db.query(
      'SELECT roomname FROM rooms WHERE roomname = ?', [data.roomname], (err, results, fields) => {
        if (results.length === 0) {
          db.execute('INSERT INTO rooms (roomname) VALUES (?)', [data.roomname]);
        }
      }
    );
    return new Promise((resolve, reject) => {
      db.query(
        'SELECT id FROM users WHERE username = ?', [data.username], (err, results, fields) => {
          if (results.length === 0) {
            db.execute('INSERT INTO users (username) VALUES (?)');
            console.log('no username found!');
          }
          var userId = results[0].id;
          db.query(
            'SELECT id from rooms WHERE roomname = ?', [data.roomname], (err, results, fields) => {
              if (results.length === 0) {
                console.log('no roomname found!');
                reject();
              } else {
                db.execute(
                  'INSERT INTO messages (text, id_users, id_rooms) VALUES (?, ?, ?)', [data.message, userId, results[0].id], () => {
                    resolve();
                  }
                );
              }
            });
        });
    });
    // db.execute(
    //   'INSERT INTO messages (text) VALUES (?, ?, ?)', [data.message, data.roomname]
    // );
  } // a function which can be used to insert a message into the database
};
