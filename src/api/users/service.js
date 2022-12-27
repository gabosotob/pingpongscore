const User = require('./model');

/**
 *
 * @param {Object} userData Takes an object representing user data
 * @returns An object with the new user's main data created on Database
 */
exports.save_user = async userData => {
  try {
    const mongoUser = await User.create(userData);
    const { _id, name, wins } = mongoUser.toObject();

    return { _id, name, wins };
  } catch (err) {
    throw new Error(`Error Saving User Into Database:\n${err}`);
  }
};

exports.get_user = async userName => {
  try {
    const mongoUser = await User.findOne({ name: userName }).exec();
    if (!mongoUser) return null;

    const { _id, name, wins } = mongoUser.toObject();

    return { _id, name, wins };
  } catch (err) {
    throw new Error(`Error Getting User From Database:\n${err}`);
  }
};
