import db from '../database/pgsql.js';

async function createShortUrl(url, shortUrl, userId) {
  return db.query(
    `INSERT INTO "urls" ("url", "shortUrl", "userId")
    VALUES ($1, $2, $3)`,
    [url, shortUrl, userId]
  );
}

const urlsRepository = { createShortUrl };

export default urlsRepository;
