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

exports.get_user = async userId => {
  try {
    const mongoUser = await User.findById(userId);
    if (!mongoUser) return null;

    const { _id, name, wins } = mongoUser.toObject();

    return { _id, name, wins };
  } catch (err) {
    throw new Error(`Error Getting User From Database:\n${err}`);
  }
};

exports.get_users = async () => {
  try {
    const users = await User.find({});
    console.log('🚀 ~ file: service.js:35 ~ exports.get_users= ~ users', users);

    return users;
  } catch (err) {
    throw new Error(`Error Getting User From Database:\n${err}`);
  }
};
