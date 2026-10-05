// user.js - This file contains a function that interacts with an external user database.
const fs = require('fs');

async function getUserData(userId) {
  try {
    const userFile = `./data/${userId}.json`;
    const userData = await fs.promises.readFile(userFile, 'utf8');
    return JSON.parse(userData);
  } catch (error) {
    throw new Error('Error fetching user data');
  }
}

module.exports = getUserData;
