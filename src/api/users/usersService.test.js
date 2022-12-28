const UserService = require('./service');
const mongoLoader = require('../../loaders/mongoose');
const UserModel = require('./model');

describe('Testing User Service', () => {
  beforeAll(async () => {
    await mongoLoader.load({ testing: true });
  });

  afterAll(async () => {
    await mongoLoader.close();
  });

  const saveUser = UserService.save_user;
  const getUser = UserService.get_user;
  const getUsers = UserService.get_users;

  describe('Creating Users', () => {
    test('should create a new user', async () => {
      // TODO Generate a function for random name generator based on time
      const input = { name: 'Veronica' };
      const expected = ['id'];

      const result = await saveUser(input);

      expect(result).toHaveProperty(expected);

      await UserModel.deleteOne({ name: input.name });
    });

    test('should throw an error if name is not provided', async () => {
      const input = {};

      await expect(saveUser(input)).rejects.toThrow();
    });

    test("should throw an error if new user has duplicate 'name' key in DB", async () => {
      // TODO Generate a function for random name generator based on time
      const input1 = { name: 'John' };
      const input2 = { name: 'John' };

      await saveUser(input1);

      await expect(saveUser(input2)).rejects.toThrow();

      await UserModel.deleteOne({ name: input1.name });
    });
  });

  describe('Modifying users', () => {
    test('add_win_to_existing_user should return the user with an extra win', async () => {
      const id = '63abb12c136fb1ddc32cbb0a';
      const user = await UserModel.findById(id);

      const { wins } = await UserService.add_win_to_existing_user(id);

      expect(wins).toBe(user.wins + 1);

      const filter = { _id: id };
      const toQuery = { $set: { wins: wins - 1 } };

      await UserModel.updateOne(filter, toQuery);
    });
  });

  describe('Getting Users', () => {
    test('should get all users', async () => {
      const result = await getUsers();

      expect(Array.isArray(result)).toBe(true);
    });

    test('should get a user providing ID', async () => {
      const userId = '63aa539507505b6fbc194ccb';
      const expected = 'Farlon';

      const result = await getUser(userId);

      expect(result.name).toBe(expected);
    });

    test('should return null if ID is not found in database', async () => {
      const toFind = '63aa539507505b6fbc194ccc';
      const expected = null;

      const result = await getUser(toFind);

      expect(result).toBe(expected);
    });

    test('should throw error if an invalid ID is provided', async () => {
      const toFind = '';

      await expect(getUser(toFind)).rejects.toThrow();
    });
  });
});
