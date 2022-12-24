const mongoose = require('mongoose');

const gameDefinition = {
  users: Array,
  wins: Array,
};

const { Schema } = mongoose;
const gameSchema = new Schema(gameDefinition);

class Game {
  constructor() {
    this.model = mongoose.model('game', gameSchema);
  }

  get name() {
    return this.model;
  }
}

module.exports = Game;
