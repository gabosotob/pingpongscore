const { Types } = require('mongoose');
const Game = require('./model');
const userService = require('../users/service');
const User = require('../users/model');

exports.get_player_id = async player => {
  const exist = await User.findOne(player);
  let id;

  if (!exist) {
    const user = await userService.save_user(player).catch(console.error);
    id = user.id;
  } else id = exist.id;

  return id;
};

exports.get_players_ids_from_team = team => {
  const promises = [];

  for (let i = 0; i < team.players.length; i++) {
    promises.push(this.get_player_id(team.players[i]));
  }

  return Promise.all(promises);
};

exports.map_user_ids_from_game = async game => {
  const {
    team,
    status: { scoreDiff, winner },
  } = game;

  const mappedGame = {
    team: {
      A: { score: team.A.score, playersIds: [] },
      B: { score: team.A.score, playersIds: [] },
    },
    status: { scoreDiff },
  };

  mappedGame.team.A.playersIds = await (
    await this.get_players_ids_from_team(team.A)
  ).map(Types.ObjectId);
  mappedGame.team.B.playersIds = await (
    await this.get_players_ids_from_team(team.B)
  ).map(Types.ObjectId);

  mappedGame.status.winnerId = Types.ObjectId(await this.get_player_id(winner));

  return mappedGame;
};

/**
 *
 * @param {Object} userData Takes an object representing user data
 * @returns An object with the new user's main data created on Database
 */
exports.save_game = async gameData => {
  if (typeof gameData !== 'object' || Object.keys(gameData).length === 0) {
    return null;
  }

  try {
    const game = await this.map_user_ids_from_game(gameData);

    await userService.add_win_to_existing_user(game.status.winnerId);

    const itsNotValid = await Game.validate(game);

    if (itsNotValid) throw new Error('Game object schema is not valid');

    const mongoGame = await Game.create(gameData);
    await mongoGame.populate();

    const { _id, teams, status } = mongoGame.toObject();

    return { id: _id, teams, status };
  } catch (err) {
    throw new Error(`Error Saving User Into Database:\n${err}`);
  }
};

exports.get_game = async gameId => {
  try {
    const mongoGame = await Game.findById(gameId);
    if (!mongoGame) return null;

    await mongoGame.populate('user');
    return mongoGame.toObject();
  } catch (err) {
    throw new Error(`Error Getting Game From Database:\n${err}`);
  }
};

exports.get_games = async () => {
  try {
    let mongoGames = await Game.find({});

    const promises = [];

    for (let i = 0; i < mongoGames.length; i++) {
      promises.push(mongoGames[i].populate('user'));
    }

    mongoGames = await Promise.all(promises);
    const gamesObj = mongoGames.map(mongoGame => mongoGame.toObject());

    return gamesObj;
  } catch (err) {
    throw new Error(`Error Getting Game From Database:\n${err}`);
  }
};
