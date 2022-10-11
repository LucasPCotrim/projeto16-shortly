CREATE TABLE "users" (
  "id" SERIAL PRIMARY KEY,
  "name" TEXT NOT NULL,
  "email" TEXT NOT NULL UNIQUE,
  "password" TEXT NOT NULL,
  "createdAt" TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE "sessions" (
  "id" SERIAL PRIMARY KEY,
  "token" TEXT NOT NULL UNIQUE,
  "userId" INTEGER NOT NULL UNIQUE REFERENCES "users"("id"),
  "createdAt" TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE "urls" (
  "id" SERIAL PRIMARY KEY,
  "url" TEXT NOT NULL,
  "shortUrl" TEXT NOT NULL UNIQUE,
  "visitCount" INTEGER NOT NULL DEFAULT 0 CHECK("visitCount" >= 0),
  "userId" INTEGER REFERENCES "users"("id"),
  "createdAt" TIMESTAMP NOT NULL DEFAULT NOW()
);
