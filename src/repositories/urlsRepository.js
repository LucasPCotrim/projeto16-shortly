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

async function getUrlByShortUrl(shortUrl) {
  return db.query(`SELECT * FROM "urls" WHERE "shortUrl" = $1`, [shortUrl]);
}

async function incrementUrlVisitCount(id) {
  return db.query(
    `UPDATE "urls"
    SET "visitCount" = "visitCount" + 1
    WHERE id = $1`,
    [id]
  );
}

const urlsRepository = { createShortUrl, getUrlById, getUrlByShortUrl, incrementUrlVisitCount };

export default urlsRepository;
