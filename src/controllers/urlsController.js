import { nanoid } from 'nanoid';
import urlsRepository from './../repositories/urlsRepository.js';

const NANO_ID_NUM_CHARS = 8;

// Error Messages
const ERROR_MESSAGES = {
  serverError: 'Server Error: Connection to database failed',
  urlNotFound: 'Error: URL not found!',
  unauthorized: 'Error: User is not authorized!',
};
const SUCCESS_MESSAGES = { deletedURL: 'URL deleted succesfully!' };

// shortenUrl
// -----------
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

// getUrl
// -------
async function getUrl(req, res) {
  // Obtain URL id from route parameters
  const { id } = req.params;

  try {
    // Get Url from database
    const checkUrl = await urlsRepository.getUrlById(id);
    if (checkUrl.rowCount === 0) {
      return res.status(404).send({ message: ERROR_MESSAGES.urlNotFound });
    }
    const url = checkUrl.rows[0];
    delete url.visitCount;
    delete url.userId;
    delete url.createdAt;

    // Return url to user
    res.status(200).send(url);
  } catch (error) {
    // Server Error
    console.log(error);
    return res.status(500).send({ message: ERROR_MESSAGES.serverError });
  }
}

// openUrl
// --------
async function openUrl(req, res) {
  // Obtain shortUrl from route parameters
  const { shortUrl } = req.params;

  try {
    // Get URL from database
    const checkUrl = await urlsRepository.getUrlByShortUrl(shortUrl);
    if (checkUrl.rowCount === 0) {
      return res.status(404).send({ message: ERROR_MESSAGES.urlNotFound });
    }
    const url = checkUrl.rows[0];

    // Increment URL visitCount
    await urlsRepository.incrementUrlVisitCount(url.id);

    // Redirect user to URL
    const urlString = url.url;
    return res.redirect(urlString);
  } catch (error) {
    // Server Error
    console.log(error);
    return res.status(500).send({ message: ERROR_MESSAGES.serverError });
  }
}

// deleteUrl
// ----------
async function deleteUrl(req, res) {
  // Obtain user from res.locals
  const { user } = res.locals;

  // Obtain id from route parameters
  const { id } = req.params;

  try {
    // Get URL from database
    const checkUrl = await urlsRepository.getUrlById(id);
    const url = checkUrl.rows[0];

    // Check if URL exists
    if (checkUrl.rowCount === 0) {
      return res.status(404).send({ message: ERROR_MESSAGES.urlNotFound });
    }

    // Check if URL belongs to user
    if (url.userId !== user.id) {
      return res.status(401).send({ message: ERROR_MESSAGES.unauthorized });
    }

    // Delete URL
    await urlsRepository.deleteUrlById(id);
    res.status(204).send({ message: SUCCESS_MESSAGES.deletedURL });
  } catch (error) {
    // Server Error
    console.log(error);
    return res.status(500).send({ message: ERROR_MESSAGES.serverError });
  }
}

export { shortenUrl, getUrl, openUrl, deleteUrl };
