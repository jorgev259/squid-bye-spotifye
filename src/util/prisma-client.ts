import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "../../prisma/generated/client";
import { DB_HOST, DB_NAME, DB_PWD, DB_USER } from "astro:env/server";

const adapter = new PrismaMariaDb({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PWD,
  database: DB_NAME,
  connectionLimit: 5,
});
const prismaClient = new PrismaClient({ adapter });

export default prismaClient;
