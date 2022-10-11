import { nanoid } from 'nanoid';
import urlsRepository from './../repositories/urlsRepository.js';

const NANO_ID_NUM_CHARS = 8;

// Error Messages
const ERROR_MESSAGES = {
  serverError: 'Server Error: Connection to database failed',
};

async function shortenUrl(req, res) {
  // Obtain user from res.locals
  const { user } = res.locals;

  // Obtain url from req.body
  const { url } = req.body;

  // Shorten url
  const shortUrl = nanoid(NANO_ID_NUM_CHARS);

  try {
    // Insert shortUrl into database
    await urlsRepository.createShortUrl(url, shortUrl, user.id);

    // Return shortUrl to user
    return res.status(201).send({ shortUrl });
  } catch (error) {
    // Server Error
    console.log(error);
    return res.status(500).send({ message: ERROR_MESSAGES.serverError });
  }
}

export { shortenUrl };
