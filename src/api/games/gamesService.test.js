const GameService = require('./service');
const mongoLoader = require('../../loaders/mongoose');
const GameModel = require('./model');

describe('Testing Games Service', () => {
  beforeAll(async () => {
    await mongoLoader.load({ testing: true });
  });

  afterAll(async () => {
    await mongoLoader.close();
  });

  const saveGame = GameService.save_game;
  const getGame = GameService.get_game;
  const getGames = GameService.get_games;

  describe('Creating Games', () => {
    test('get_player_id should return a string of an id', async () => {
      const input = { name: 'Sally' };

      const id = await GameService.get_player_id(input);

      expect(typeof id).toBe('string');
    });

    test('get_player_id should return a string of an id', async () => {
      const input = {
        score: 5,
        players: [{ name: 'Drobar' }],
      };

      const ids = await GameService.get_players_ids_from_team(input);

      expect(Array.isArray(ids)).toBeTruthy();
    });

    it('should create a new game record', async () => {
      const input = {
        team: {
          A: {
            score: 3,
            players: [{ name: 'Drasus' }],
          },
          B: {
            score: 4,
            players: [{ name: 'Mattias' }],
          },
        },
        status: {
          scoreDiff: 1,
          winners: [{ name: 'Mattias' }],
        },
      };

      const expected = ['id'];

      const result = await saveGame(input);

      expect(result).toHaveProperty(expected);

      await GameModel.deleteOne(result.id);
    });

    it('should throw an error if object is not provided', async () => {
      const input = {};

      await expect(saveGame(input)).resolves.toBe(null);
    });
  });

  describe('Getting Games', () => {
    it('should get all games', async () => {
      const result = await getGames();

      expect(Array.isArray(result)).toBe(true);
    });

    it('should get a game providing ID', async () => {
      const input = {
        team: {
          A: {
            score: 3,
            players: [{ name: 'Drasus' }],
          },
          B: {
            score: 4,
            players: [{ name: 'Mattias' }],
          },
        },
        status: {
          scoreDiff: 1,
          winners: [{ name: 'Mattias' }],
        },
      };
      const savedGame = await saveGame(input);
      const gameId = savedGame.id;

      const result = await getGame(gameId);

      expect(result).toBeTruthy();

      await GameModel.deleteOne(result.id);
    });

    it('should return null if ID is not found in database', async () => {
      const toFind = '63abcdef2d0109c53bff32cc';
      const expected = null;

      const result = await getGame(toFind);

      expect(result).toBe(expected);
    });

    it('should throw error if an invalid ID is provided', async () => {
      const toFind = '';

      await expect(getGame(toFind)).rejects.toThrow();
    });
  });
});
