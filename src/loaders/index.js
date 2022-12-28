const mongoose = require('./mongoose');
const expressLoader = require('./express');

exports.init = async ({ expressApp }) => {
  try {
    await mongoose.load();
    await expressLoader(expressApp);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

// Defining Cleaner
async function exitHandler() {
  await mongoose.close();
  process.exit(0);
}

// Exiting Events
process.on('exit', exitHandler.bind(null, { cleanup: true }));
process.on('SIGINT', exitHandler.bind(null, { exit: true }));
