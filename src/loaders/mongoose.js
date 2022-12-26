const mongoDb = require('mongoose');
const { database } = require('../configs/index');

mongoDb.set('strictQuery', false);

const { mongo } = database;
const {
  user, password, cluster, dbName, testDbName,
} = mongo;

exports.load = async ({ testing }) => {
  const mongoUrl = [
    'mongodb+srv://',
    `${user}:${password}@${cluster}.vxhi1ob.mongodb.net/`,
    `${testing ? testDbName : dbName}`,
    '?retryWrites=true&w=majority',
  ].join('');

  const mongoConn = await mongoDb.connect(mongoUrl, { useNewUrlParser: true });
  const { connection } = mongoConn;
  connection.on(
    'error',
    console.error.bind(console, 'MongoDB connection error:'),
  );

  return connection;
};

exports.close = async () => {
  await mongoDb.disconnect();
};
