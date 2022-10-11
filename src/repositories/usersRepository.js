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

const usersRepository = { getUserById, getUserByEmail, createUser };

export default usersRepository;
