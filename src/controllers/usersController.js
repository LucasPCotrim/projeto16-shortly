import urlsRepository from '../repositories/urlsRepository.js';
import usersRepository from '../repositories/usersRepository.js';

// Error Messages
const ERROR_MESSAGES = {
  serverError: 'Server Error: Connection to database failed',
  unauthorized: 'Error: User is not authorized!',
};

async function getUserInfo(req, res) {
  // Obtain user from res.locals
  const { user } = res.locals;

  try {
    // Get user info
    const checkUserInfo = await usersRepository.getUserInfoById(user.id);
    const userVisitCount = checkUserInfo.rows.reduce((acc, cur) => acc + cur.urlInfo.visitCount, 0);
    const userUrls = checkUserInfo.rows.map((row) => row.urlInfo);

    // Send user info
    res.status(200).send({
      id: user.id,
      name: user.name,
      visitCount: userVisitCount,
      shortenedUrls: userUrls,
    });
  } catch (error) {
    // Server Error
    console.log(error);
    return res.status(500).send({ message: ERROR_MESSAGES.serverError });
  }
}

export { getUserInfo };
