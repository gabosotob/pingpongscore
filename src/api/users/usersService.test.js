const UserService = require('./service');
const mongoLoader = require('../../loaders/mongoose');

describe('User service', () => {
  beforeAll(async () => {
    await mongoLoader.load({ testing: true });
  });

  afterAll(async () => {
    await mongoLoader.close();
  });

  it('should create a new user', async () => {
    // Setup
    const saveUser = UserService.save_user;
    const deleteUser = UserService.delete_user;
    const input = { name: 'John', wins: 0 };
    const expected = '_id';

    // Evaluate
    const result = await saveUser(input);

    // Verify
    expect(result).toHaveProperty(expected);

    // Teardowns
    await deleteUser(input.name);
  });
});
