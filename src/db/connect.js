const dotenv = require('dotenv');
dotenv.config();
//const MongoClient = require('mongodb').MongoClient;
const { MongoClient } = require('mongodb');

let _db;
const uri = `mongodb+srv://${process.env.usuario}:${process.env.contrasena}@cluster0.w4yyxxg.mongodb.net/test`;

const initDb = (callback) => {
  if (_db) {
    console.log('Db is already initialized!');
    return callback(null, _db);
  }
  MongoClient.connect(uri)
    .then((client) => {
      _db = client;
      callback(null, _db);
    })
    .catch((err) => {
      callback(err);
    });
};

const getDb = () => {
  if (!_db) {
    throw Error('Db not initialized');
  }
  return _db;
};

module.exports = {
  initDb,
  getDb
};
