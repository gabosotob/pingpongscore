const mongoose = require('./mongoose');
const expressLoader = require('./express');

exports.init = async ({ expressApp }) => {
  try {
    console.log('Connecting MongoDB..');
    await mongoose.load();
    console.log('MongoDB Connected\n');

    console.log('Setting Up Express..');
    await expressLoader(expressApp);
    console.log('Express Setted Up\n');
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
