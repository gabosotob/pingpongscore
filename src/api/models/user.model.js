const mongoose = require('mongoose');

const userDefinition = {
  name: String,
  games: Array,
};

const { Schema } = mongoose;
const userSchema = new Schema(userDefinition);

class User {
  constructor(name, game) {
    this.model = mongoose.model('user', userSchema);
    this.name = name;
    this.game = game;
  }

  get name() {
    return this.name;
  }

  get game() {
    return this.game;
  }
}

module.exports = User;
