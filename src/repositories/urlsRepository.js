import db from '../database/pgsql.js';

async function createShortUrl(url, shortUrl, userId) {
  return db.query(
    `INSERT INTO "urls" ("url", "shortUrl", "userId")
    VALUES ($1, $2, $3)`,
    [url, shortUrl, userId]
  );
}

async function getUrlById(id) {
  return db.query(`SELECT * FROM "urls" WHERE "id" = $1`, [id]);
}

const urlsRepository = { createShortUrl, getUrlById };

export default urlsRepository;
