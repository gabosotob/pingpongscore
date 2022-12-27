const mongoose = require('mongoose');

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const gameSchema = new Schema({
  teams: {
    type: [
      {
        side: { type: String, required: true },
        score: { type: Number, required: true },
        players: { type: [{ type: ObjectId, ref: 'user' }] },
      },
    ],
    minLength: 2,
    maxLength: 2,
  },
  status: {
    scoreDiff: Number,
    winner: ObjectId,
  },
});

const Game = mongoose.model('game', gameSchema);

module.exports = Game;
