import bcrypt from 'bcrypt';
import db from '../database/pgsql.js';

async function getUserById(id) {
  return db.query(`SELECT * FROM users WHERE id = $1`, [id]);
}

async function getUserByEmail(email) {
  return db.query(`SELECT * FROM users WHERE email = $1`, [email]);
}

async function createUser(name, email, basePassword) {
  const saltRounds = 10;
  const passwordHash = bcrypt.hashSync(basePassword, saltRounds);
  return db.query(
    `INSERT INTO users (name, email, password)
    VALUES ($1, $2, $3)`,
    [name, email, passwordHash]
  );
}

async function getUserInfoById(id) {
  return db.query(
    `SELECT
      "users".id AS "userId",
      "users".name AS "userName",
      (SELECT SUM("urls"."visitCount") FROM "urls" WHERE "urls"."userId" = $1) AS "visitCount",
      "urls".id AS "urlId",
      json_build_object('id', "urls".id, 'shortUrl', urls."shortUrl", 'url', urls.url, 'visitCount', urls."visitCount") AS "urlInfo"
    FROM
      "users"
      JOIN "urls" ON "users".id = "urls"."userId"
    WHERE "users".id = $1
    GROUP BY "users".id, "urls".id
    ORDER BY "urls".id;
  `,
    [id]
  );
}

async function getUsersRanking() {
  return db.query(
    `SELECT
      usr.id, usr.name,
      COUNT(u.id) AS "linksCount",
      COALESCE(SUM(u."visitCount"),0) AS "visitCount"
    FROM
      users usr
      LEFT JOIN urls u ON usr.id = u."userId"
    GROUP BY usr.id
    ORDER BY
      "visitCount" DESC,
      "linksCount" DESC
    LIMIT 10
  `
  );
}

const usersRepository = {
  getUserById,
  getUserByEmail,
  createUser,
  getUserInfoById,
  getUsersRanking,
};

export default usersRepository;
