const GameService = require('./service');
const mongoLoader = require('../../loaders/mongoose');
const GameModel = require('./model');

describe('Testing User Service', () => {
  beforeAll(async () => {
    await mongoLoader.load({ testing: true });
  });

  afterAll(async () => {
    await mongoLoader.close();
  });

  const saveGame = GameService.save_game;
  // const getGame = GameService.get_user;
  // const getGames = GameService.get_users;

  describe('Creating Games', () => {
    it('should create a new game record', async () => {
      const input = {
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
      const expected = ['_id'];

      const result = await saveGame(input);

      expect(result).toHaveProperty(expected);

      await GameModel.deleteOne({ name: input.name });
    });

    it('should throw an error if object is not provided', async () => {
      const input = {};

      await expect(saveGame(input)).rejects.toThrow();
    });
  });

  // describe('Getting Users', () => {
  //   it('should get all users', async () => {
  //     const result = await getGames();

  //     expect(Array.isArray(result)).toBe(true);
  //   });
  //   it('should get a user providing ID', async () => {
  //     const userId = '63aa539507505b6fbc194ccb';
  //     const expected = 'Farlon';

  //     const result = await getGame(userId);

  //     expect(result.name).toBe(expected);
  //   });

  //   it('should return null if ID is not found in database', async () => {
  //     const toFind = '63aa539507505b6fbc194ccc';
  //     const expected = null;

  //     const result = await getGame(toFind);

  //     expect(result).toBe(expected);
  //   });

  //   it('should throw error if an invalid ID is provided', async () => {
  //     const toFind = '';

  //     await expect(getGame(toFind)).rejects.toThrow();
  //   });
  // });
});
