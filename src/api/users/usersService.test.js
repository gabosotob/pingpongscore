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
    it('should create a new user', async () => {
      const input = { name: 'Sally' };
      const expected = ['_id'];

      const result = await saveUser(input);

      expect(result).toHaveProperty(expected);

      await UserModel.deleteOne({ name: input.name });
    });

    it('should throw an error if name is not provided', async () => {
      const input = {};

      await expect(saveUser(input)).rejects.toThrow();
    });

    it("should throw an error if new user has duplicate 'name' key in DB", async () => {
      const input1 = { name: 'Sally' };
      const input2 = { name: 'Sally' };

      await saveUser(input1);

      await expect(saveUser(input2)).rejects.toThrow();

      await UserModel.deleteOne({ name: input1.name });
    });
  });

  describe('Getting Users', () => {
    it('should get all users', async () => {
      const result = await getUsers();

      expect(Array.isArray(result)).toBe(true);
    });
    it('should get a user providing ID', async () => {
      const userId = '63aa539507505b6fbc194ccb';
      const expected = 'Farlon';

      const result = await getUser(userId);

      expect(result.name).toBe(expected);
    });

    it('should return null if ID is not found in database', async () => {
      const toFind = '63aa539507505b6fbc194ccc';
      const expected = null;

      const result = await getUser(toFind);

      expect(result).toBe(expected);
    });

    it('should throw error if an invalid ID is provided', async () => {
      const toFind = '';

      await expect(getUser(toFind)).rejects.toThrow();
    });
  });
});
