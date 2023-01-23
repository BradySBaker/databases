var db = require('../db');

module.exports = {
  getAll: function () {
    return new Promise((resolve, reject) => {
      db.query(
        'SELECT username FROM users', (err, results, fields) => {
          if (err) {
            reject(err);
          }
          console.log(results);
          resolve(results);
        });
    });
  },
  create: function (data) {
    return new Promise((resolve, reject) => {
      db.query(
        'SELECT id FROM users WHERE username = ?', [data.username], (err, results, fields) => {
          if (results.length === 0) {
            db.execute(
              'INSERT INTO users (username) VALUES (?)', [data.username], () => { resolve(); });
          } else {
            resolve();
          }
        });
    });
  }
};
