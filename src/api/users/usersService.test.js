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
});
