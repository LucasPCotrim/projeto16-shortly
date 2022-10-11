import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';
import sessionsRepository from '../repositories/sessionsRepository.js';
import usersRepository from '../repositories/usersRepository.js';

// Error Messages
const ERROR_MESSAGES = {
  serverError: 'Server Error: Connection to database failed',
  conflict: 'Error: Email not available!',
  invalidUserOrPassword: 'Error: Invalid user or password!',
};
const SUCCESS_MESSAGES = { registeredUser: 'User successfully registered!' };

// ------------- Controller Functions -------------

// registerUser
// --------------
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

// login
// ------
async function login(req, res) {
  // Obtain login info from req.body
  const { email, password } = req.body;

  try {
    // Check if user exists in database
    const { rows: users } = await usersRepository.getUserByEmail(email);
    const user = users[0];
    if (!user) return res.status(401).send({ message: ERROR_MESSAGES.invalidUserOrPassword });

    // Check password
    if (!bcrypt.compareSync(password, user.password)) {
      return res.status(401).send({ message: ERROR_MESSAGES.invalidUserOrPassword });
    }

    // Delete previous user session
    await sessionsRepository.deleteSessionByUserId(user.id);

    // Create user session
    const token = uuid();
    await sessionsRepository.createSession(token, user.id);
    return res.status(200).send({ token });
  } catch (error) {
    // Server Error
    console.log(error);
    return res.status(500).send({ message: ERROR_MESSAGES.serverError });
  }
}

export { registerUser, login };
