const { Types } = require('mongoose');
const Game = require('./model');
const userService = require('../users/service');
const User = require('../users/model');

function promiseAll(arrToPromise, promisify) {
  let promises = [];
  for (let i = 0; i < arrToPromise.length; i++) {
    promises.push(promisify(arrToPromise[i]));
  }
  return Promise.all(promises);
}

exports.get_player_id = async (player) => {
  const exist = await User.findOne(player);
  let id;

  if (!exist) {
    const user = await userService.save_user(player).catch(console.error);
    id = user.id;
  } else id = exist._id.toString();

  return id;
};

exports.get_players_ids_from_team = async (team) => {
  const results = await promiseAll(team.players, this.get_player_id);
  return results;
};

exports.map_user_ids_to_game = async (game) => {
  const {
    team,
    status: { scoreDiff, winners },
  } = game;

  let mappedGame = {
    team: {
      A: { score: team.A.score, players: [] },
      B: { score: team.B.score, players: [] },
    },
    status: { scoreDiff, winners },
  };

  mappedGame.team.A.players = await this.get_players_ids_from_team(team.A);
  mappedGame.team.B.players = await this.get_players_ids_from_team(team.B);
  mappedGame.status.winners = await this.get_players_ids_from_team({
    players: winners,
  });

  return mappedGame;
};

/**
 *
 * @param {Object} userData Takes an object representing user data
 * @returns An object with the new user's main data created on Database
 */
exports.save_game = async (gameData) => {
  if (typeof gameData !== 'object' || Object.keys(gameData).length === 0) {
    return null;
  }

  try {
    const game = await this.map_user_ids_to_game(gameData);

    await promiseAll(game.status.winners, userService.add_win_to_existing_user);

    const itsNotValid = await Game.validate(game);

    if (itsNotValid) throw new Error('Game object schema is not valid');

    const mongoGame = new Game(game);
    await mongoGame.save();
    await mongoGame.populate();

    const { _id, teams, status } = mongoGame.toObject();

    return { id: _id, teams, status };
  } catch (err) {
    throw new Error(`Error Saving User Into Database:\n${err}`);
  }
};

exports.get_game = async (gameId) => {
  try {
    const mongoGame = await Game.findById(gameId)
      .populate('team.A.players')
      .populate('team.B.players')
      .populate('status.winners')
      .exec();

    if (!mongoGame) return null;

    return mongoGame.toObject();
  } catch (err) {
    throw new Error(`Error Getting Game From Database:\n${err}`);
  }
};

exports.get_games = async () => {
  try {
    let mongoGames = await Game.find({})
      .populate('team.A.players')
      .populate('team.B.players')
      .populate('status.winners')
      .exec();

    const gamesObj = mongoGames.map((mongoGame) => mongoGame.toObject());

    return gamesObj;
  } catch (err) {
    throw new Error(`Error Getting Game From Database:\n${err}`);
  }
};
