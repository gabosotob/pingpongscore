const mongoose = require('mongoose');

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const gameSchema = new Schema({
  team: {
    A: {
      score: { type: Number, required: true },
      players: {
        type: [{ type: ObjectId, ref: 'user' }],
        minLength: 1,
        maxLength: 2,
      },
    },
    B: {
      score: { type: Number, required: true },
      players: {
        type: [{ type: ObjectId, ref: 'user' }],
        minLength: 1,
        maxLength: 2,
      },
    },
  },
  status: {
    scoreDiff: Number,
    winners: [{ type: ObjectId, ref: 'user' }],
  },
});

const Game = mongoose.model('game', gameSchema);

module.exports = Game;
