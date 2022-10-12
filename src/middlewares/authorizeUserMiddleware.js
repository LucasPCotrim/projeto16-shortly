import sessionsRepository from '../repositories/sessionsRepository.js';
import usersRepository from '../repositories/usersRepository.js';

// Error Messages
const ERROR_MESSAGES = {
  serverError: 'Server Error: Connection to database failed',
  noToken: 'Error: Invalid token!',
  sessionNotFound: 'Error: Session expired!',
  userNotFound: 'Error: User not found!',
};

export default async function validateUserToken(req, res, next) {
  // Obtain token from req.headers
  const authorization = req.headers.authorization;
  const token = authorization?.replace('Bearer ', '');
  // Check if token was sent
  if (!token) return res.status(401).send({ message: ERROR_MESSAGES.noToken });

  try {
    // Check if matching session exists
    const { rows: sessions } = await sessionsRepository.getSessionByToken(token);
    const session = sessions[0];
    if (!session) return res.status(401).send({ message: ERROR_MESSAGES.sessionNotFound });

    // Check if session's user is in the database
    const { rows: users } = await usersRepository.getUserById(session.userId);
    const user = users[0];
    if (!user) return res.status(404).send({ message: ERROR_MESSAGES.userNotFound });

    // Store user in res.locals
    res.locals.user = user;
    next();
  } catch (error) {
    // Server Error
    console.log(error);
    return res.status(500).send({ message: ERROR_MESSAGES.serverError });
  }
}
