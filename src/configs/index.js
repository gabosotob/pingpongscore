require('dotenv').config();

if (!process.env.NODE_ENV) console.log('NODE_ENV not found!');
if (!process.env.PORT) console.log('PORT not found!') && process.exit(1);
if (!process.env.MONGO_USER) {
  console.log('MONGO_USER not found!') && process.exit(1);
}
if (!process.env.MONGO_PASSWORD) {
  console.log('MONGO_PASSWORD not found!') && process.exit(1);
}
if (!process.env.MONGO_CLUSTER_NAME) {
  console.log('MONGO_CLUSTER_NAME not found!') && process.exit(1);
}
if (!process.env.MONGO_DATABASE_NAME) {
  console.log('MONGO_DATABASE_NAME not found!') && process.exit(1);
}
if (!process.env.MONGO_TESTING_DATABASE_NAME) {
  console.log('MONGO_TESTING_DATABASE_NAME not found!');
}

module.exports = {
  nodeEnvironment: process.env.NODE_ENV,
  port: process.env.PORT,
  database: {
    mongo: {
      user: process.env.MONGO_USER,
      password: process.env.MONGO_PASSWORD,
      cluster: process.env.MONGO_CLUSTER_NAME,
      dbName: process.env.MONGO_DATABASE_NAME,
      testDbName: process.env.MONGO_TESTING_DATABASE_NAME,
    },
  },
};
