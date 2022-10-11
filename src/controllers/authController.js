import sessionsRepository from '../repositories/sessionsRepository.js';
import usersRepository from '../repositories/usersRepository.js';

// Error Messages
const ERROR_MESSAGES = {
  serverError: 'Error when registering user!',
  conflict: 'Error: Email not available!',
};
const SUCCESS_MESSAGES = { registeredUser: 'User successfully registered!' };

// ------------- Controller Functions -------------

// registerUser
//--------------
async function registerUser(req, res) {
  // Obtain user from req.body
  const user = req.body;

  try {
    // Check if user email already exists in database
    const existingUsers = await usersRepository.getUserByEmail(user.email);
    if (existingUsers.rowCount > 0) {
      return res.status(409).send({ message: ERROR_MESSAGES.conflict });
    }

    // Create user in database
    const { name, email, password } = user;
    await usersRepository.createUser(name, email, password);

    res.status(201).send({ message: SUCCESS_MESSAGES.registeredUser });
  } catch (error) {
    // Server Error
    console.log(error);
    return res.status(500).send({ message: ERROR_MESSAGES.serverError });
  }
}

export { registerUser };
