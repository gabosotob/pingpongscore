const mongoDb = require('mongoose');
const { database } = require('../configs/index');

mongoDb.set('strictQuery', false);

const { mongo } = database;
const {
  user, password, cluster, dbName, testDbName,
} = mongo;

exports.load = async ({ testing } = {}) => {
  // It's writen this way for sectionizing the URL and for better vertical readibility.
  // The impact of the extra processing will be minimal when starting up the app.
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
