const User = require('./model');

exports.save_user = async userData => {
  try {
    const user = await User.create(userData);

    return user;
  } catch (err) {
    throw new Error(err);
  }
};

exports.delete_user = async userName => {
  try {
    const user = await User.remove({ name: userName });

    return user;
  } catch (err) {
    throw new Error(err);
  }
};
