require('dotenv').config();

module.exports = {
  port: process.env.PORT || (console.log('PORT not found!') && process.exit(1)),
  database: {
    mongo: {
      user:
        process.env.MONGO_USER
        || (console.log('MONGO_USER not found!') && process.exit(1)),
      password:
        process.env.MONGO_PASSWORD
        || (console.log('MONGO_PASSWORD not found!') && process.exit(1)),
      cluster:
        process.env.MONGO_CLUSTER_NAME
        || (console.log('MONGO_CLUSTER_NAME not found!') && process.exit(1)),
      dbName:
        process.env.MONGO_DATABASE_NAME
        || (console.log('MONGO_DATABASE_NAME not found!') && process.exit(1)),
      testDbName:
        process.env.MONGO_TESTING_DATABASE_NAME
        || console.log('MONGO_TESTING_DATABASE_NAME not found!'),
    },
  },
};
