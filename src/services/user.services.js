const { userRepositories } = require("../repositories");

async function getUserById(id) {
  const user = await userRepositories.getUserById(id);

  if (!user) {
    throw new Error("Not Found");
  }

  return user;
}

module.exports = {
  getUserById,
};
