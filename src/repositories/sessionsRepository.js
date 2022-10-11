import db from '../database/pgsql.js';

async function createSession(token, userId) {
  return db.query(
    `INSERT INTO "sessions" ("token", "userId")
    VALUES ($1, $2)`,
    [token, userId]
  );
}

async function deleteSessionByUserId(userId) {
  return db.query(`DELETE FROM "sessions" WHERE "userId" = $1`, [userId]);
}

async function getSessionByToken(token) {
  return db.query(`SELECT * FROM "sessions" WHERE "token" = $1`, [token]);
}

const sessionsRepository = { createSession, deleteSessionByUserId, getSessionByToken };

export default sessionsRepository;
