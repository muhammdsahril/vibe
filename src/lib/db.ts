import { PrismaClient } from "@/generated/prisma";

// Creates a variable on the global object to hold the single Prisma client instance.
// This is done to ensure the instance is not re-created on every file reload in development.
const globalForPrisma = global as unknown as {
  prisma: PrismaClient;
};

// Gets the existing Prisma client instance from the global object if it exists.
// If it doesn't exist yet, a new instance is created.
const prisma = globalForPrisma.prisma || new PrismaClient();

// This is a safety measure for development. It re-assigns the instance to the
// global object. This prevents hot-reloading from creating a new connection
// every time you save a file, which can exhaust your database's connection pool.
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export default prisma;