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

    return { id: _id, name, wins };
  } catch (err) {
    throw new Error(`Error Saving User Into Database:\n${err}`);
  }
};

exports.get_user = async userId => {
  try {
    const mongoUser = await User.findById(userId);
    if (!mongoUser) return null;

    const { _id, name, wins } = mongoUser.toObject();

    return { id: _id, name, wins };
  } catch (err) {
    throw new Error(`Error Getting User From Database:\n${err}`);
  }
};

exports.get_users = async () => {
  try {
    const users = await User.find({}).select(['id', 'name', 'wins']);

    return users;
  } catch (err) {
    throw new Error(`Error Getting User From Database:\n${err}`);
  }
};

exports.add_win_to_existing_user = async id => {
  const winnerUser = await User.findById(id);
  const filter = { _id: id };
  const toQuery = { $set: { wins: winnerUser.wins + 1 } };

  await User.updateOne(filter, toQuery);
  const updatedUser = await User.findById(id);
  const { _id, name, wins } = updatedUser.toObject();

  return { id: _id, name, wins };
};
