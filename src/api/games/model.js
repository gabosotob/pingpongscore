const mongoose = require('mongoose');

const { Schema } = mongoose;

class Game {
  _gameDefinition = {
    users: Array,
    wins: Array,
  };

  _gameSchema = new Schema(this.gameDefinition);

  constructor() {
    this.Model = mongoose.model('game', this.gameSchema);
  }

  get name() {
    return this.Model;
  }
}

module.exports = Game;
