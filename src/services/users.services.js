const { usersRepositories } = require("../repositories");

async function getUserById(id) {
  const user = await usersRepositories.getUserById(id);

  if (!user) {
    throw new Error(404);
  }

  return user;
}

module.exports = {
  getUserById,
};
