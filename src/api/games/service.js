const Game = require('./model');
const userService = require('../users/service');
const User = require('../users/model');

/**
 *
 * @param {Object} userData Takes an object representing user data
 * @returns An object with the new user's main data created on Database
 */
exports.save_game = async gameData => {
  gameData = {
    teams: [
      {
        side: 'A',
        score: 5,
        players: [{ name: 'Drobar' }],
      },
      {
        side: 'B',
        score: 2,
        players: [{ name: 'Mattias' }],
      },
    ],
    status: {
      scoreDiff: 3,
      winner: 'Drobar',
    },
  };

  const { teams } = sample;

  const users = await userService.get_users();

  teams.forEach(team => {
    team.players.forEach(async player => {
      const playerName = player.name;
      const query = { name: player.name };
      const exist = await User.findOne(query);

      if (!exist) {
        const userObj = await userService.save_user(player.name);
        player = userObj._id;
      } else {
        player = exist._id;
      }

      gameData.status.winner === playerName
        && (gameData.status.winner = player);
    });
  });

  try {
    const isNotValid = await Game.validate(gameData);

    if (isNotValid) throw new Error('Game object schema is not valid');

    const mongoGame = await Game.create(gameData);
    await mongoGame.populate();

    const { _id, teams, status } = mongoGame.toObject();

    return { _id, teams, status };
  } catch (err) {
    throw new Error(`Error Saving User Into Database:\n${err}`);
  }
};

// exports.get_game = async userId => {
//   try {
//     const mongoUser = await Game.findById(userId);
//     if (!mongoUser) return null;

//     const { _id, name, wins } = mongoUser.toObject();

//     return { _id, name, wins };
//   } catch (err) {
//     throw new Error(`Error Getting User From Database:\n${err}`);
//   }
// };

// exports.get_games = async () => {
//   try {
//     const users = await Game.find({});

//     return users;
//   } catch (err) {
//     throw new Error(`Error Getting User From Database:\n${err}`);
//   }
// };
