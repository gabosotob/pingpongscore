const mongoDb = require('mongoose');
const { database } = require('../configs/index');

mongoDb.set('strictQuery', false);

const { mongo } = database;
const { user, password, cluster } = mongo;

const mongoUrl = [
  'mongodb+srv://',
  `${user}:${password}@${cluster}.vxhi1ob.mongodb.net/`,
  '?retryWrites=true&w=majority',
].join('');

exports.load = async () => {
  const mongoConn = await mongoDb.connect(mongoUrl, { useNewUrlParser: true });
  const { connection } = mongoConn;
  connection.on(
    'error',
    console.error.bind(console, 'MongoDB connection error:'),
  );

  return connection;
};
